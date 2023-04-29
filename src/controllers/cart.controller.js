import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";

export async function createCartList(req, res) {
    const { id } = req.params
    const { amount, color, number } = req.body
    const acesso = res.locals.session
    if (!id) return res.status(422).send("O id não foi enviado!")
    try {
        const player = await db.collection("players").findOne({ _id: new ObjectId(id) })
        if (!player) return res.status(404).send("id não encontrado!")
        const body = { idUsuario: acesso.idUsuario, amount, color, number, name: player.name, img: player.img, price: player.price }
        await db.collection("cart").insertOne(body)
        res.status(201).send("Item adicionado ao carrinho!")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getCartList(req, res) {
    const acesso = res.locals.session
    try {
        const cart = await db.collection("cart").find({ idUsuario: acesso.idUsuario }).toArray()
        if (!cart) return res.send("Carrinho vazio!")
        res.send(cart)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
export async function updateCartList(req, res) {
    const acesso = res.locals.session
    const { id, amount } = req.body
    try {
        const result = await db.collection("cart")
            .updateOne({ idUsuario: acesso.idUsuario, _id: new ObjectId(id) }, { $set: { amount } })
        if (result.matchedCount === 0) return res.status(404).send("Item não encontrado!")

        console.log(result)
        res.status(202).send("Atualizado")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteCartList(req, res) {
    const acesso = res.locals.session
    const { id } = req.body
    if (!id || typeof id !== "string") return res.status(422).send("Id não enviado corretamente")
    try {
        const result = await db.collection("cart").deleteOne({ idUsuario: acesso.idUsuario, _id: new ObjectId(id) })
        if (result.deletedCount === 0) return res.status(404).send("item não encontrado!")
        res.status(202).send("Item deletdo")
    } catch (err) {
        res.status(500).send(err.message)
    }
}