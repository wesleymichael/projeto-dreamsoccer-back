import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function createPlayer(req, res) {
    try {
        await db.collection('players').insertOne({ ...req.body });
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getPlayers(req, res) {
    const page = res.locals.page;
    const { category, position, type, nationality } = res.locals.filter;
    const filter = {}
    if (position) {
        if (typeof position === "string") {
            filter.position = position
        }else{
            filter.position.$or = position
        }
    }

    if (category) {
        if (typeof category === "string") {
            filter.category = category
        }else{
            filter.category.$or = category
        }
    }

    if (type) {
        if (typeof type === "string") {
            filter.type = type
        }else{
            filter.type.$or = type
        }
    }

    if (nationality) {
        if (typeof nationality === "string") {
            filter.nationality = nationality
        }else{
            filter.nationality.$or = nationality
        }
    }
    console.log(filter)
    const player_per_page = 20;
    const numPlayersToShow = player_per_page * page;
    try {
        const players = await db.collection('players')
            .find(filter).toArray();
        res.send(players.slice(0, numPlayersToShow));
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getPlayersById(req, res) {
    const { id } = req.params;

    try {
        const player = await db.collection('players').findOne({ _id: new ObjectId(id) });
        if (!player) return res.sendStatus(404);
        res.send(player)
    } catch (error) {
        res.status(500).send(error.message);
    }
}
