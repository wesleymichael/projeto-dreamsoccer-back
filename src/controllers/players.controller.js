import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function createPlayer(req, res){
    try{
        await db.collection('players').insertOne({...req.body});
        res.sendStatus(201);
    } catch(error){
        res.status(500).send(error.message);
    }
}
