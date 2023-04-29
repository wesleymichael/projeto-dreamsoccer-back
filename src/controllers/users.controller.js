import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signup(req, res) {

    const { name, email, password } = req.body

    try {
        const usuario = await db.collection("users").findOne({ email })

        if (usuario) return res.status(409).send("E-mail já cadastrado")

        const hash = bcrypt.hashSync(password, 10)

        await db.collection("users").insertOne({ name, email, password: hash })

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function singin(req, res) {

    const { email, password } = req.body

    try {
        const usuario = await db.collection("users").findOne({ email })
        if (!usuario) return res.status(401).send("E-mail não cadastrado")

        const senhaCorreta = bcrypt.compareSync(password, usuario.password)
        if (!senhaCorreta) return res.status(401).send("Senha incorreta")

        const token = uuid()
        await db.collection("session").insertOne({ token, idUsuario: usuario._id, name: usuario.name, email: usuario.email })
        res.send({ token, userName: usuario.name, userEmail: usuario.email })

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getUser(req, res) {

    const acesso = res.locals.session
    
    try {
        const usuario = await db.collection("session").findOne({ idUsuario: acesso.idUsuario })
        res.send(usuario)
    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function logout(req, res) {
   
    const token = res.locals.session.token
   
    try {
        await db.collection("session").deleteOne({ token })
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }

}