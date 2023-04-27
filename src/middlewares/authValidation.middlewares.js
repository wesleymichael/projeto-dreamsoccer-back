import { db } from "../database/database.connection.js"

export async function authValidation (req,res, next) {

    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    if(!token) return res.status(401).send("Token inexistente")

    try{
        const acesso = await db.collection("session").findOne({token})
        if(!acesso) return res.status(401).send("Acesso Inválido")

        res.locals.session = acesso

        next()

    } catch(err)
    {
        res.status(500).send(err.message)
    }
}