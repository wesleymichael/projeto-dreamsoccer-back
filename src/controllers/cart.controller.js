import { db } from "../database/database.connection.js";

export async function createCartList(req, res) {
    const { id } = req.params
    const { amount, color, number } = req.body
    const acesso = res.locals.session
    if(!id)return res.status(422).send("O id não foi enviado!")
    try{
        const player = await db.collection("players").findOne({_id: new ObjectId(id)})
        if(!player)return res.status(404).send("id não encontrado!")
        await db.collection("cart").insertOne({idUsuario:acesso.idUsuario, amount, color, number, name: player.name, img: player.img, price: player.price})
        res.status(201).send("Objeto criado!")
    } catch(err){
        res.status(500).send(err.message)
    }
}