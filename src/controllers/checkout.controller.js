import { db } from "../database/database.connection.js";

export async function checkout(req, res) {
    try { 
        await db.collection("checkout").insertOne({...req.body});
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
