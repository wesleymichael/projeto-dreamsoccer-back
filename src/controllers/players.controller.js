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
    const query = {};
    if (position) {
        query.position = { $in: position };
    }
    if (category) {
        query.category = { $in: category };
    }
    if (type) {
        query.type = { $in: type };
    }
    if (nationality) {
        if (nationality === "BRA") {
            query.nationality = "BRA";
        } else {
            query.nationality = { $ne: "BRA" };
        }
    }

    console.log(query)
    const player_per_page = 20;
    const numPlayersToShow = player_per_page * page;
    try {
        const players = await db.collection("players").find(query).toArray();
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
