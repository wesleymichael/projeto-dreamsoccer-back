import { db } from "../database/database.connection.js";

export async function checkout(req, res) {
    const acesso = res.locals.session;

    try { 
        const cart = await db.collection("cart").find({ idUsuario: acesso.idUsuario }).toArray();

        const items = cart.map(item => ({
            itemId: item._id,
            amount: item.amount,
            color: item.color,
            number: item.number,
        }));
        
        const checkout = {
            idUsuario: acesso.idUsuario,
            items,
            address: req.body,
        }
        await db.collection("checkout").insertOne(checkout);
        res.status(201).send("Compra finalizada");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getCheckout(req, res){
    try{
        const checkout = await db.collection("checkout").find().toArray();
        res.send(checkout)
    } catch( error ){
        res.status(500).send(error.message);
    }
}

export async function deleteCart (req, res){
    const acesso = res.locals.session
    try {
        const result = await db.collection("cart").deleteMany({ idUsuario: acesso.idUsuario })
        if (result.deletedCount === 0) return res.status(404).send("itens não encontrados!")
        res.status(202).send("Compra finalizada")
    } catch (err) {
        res.status(500).send(err.message)
    }
}
