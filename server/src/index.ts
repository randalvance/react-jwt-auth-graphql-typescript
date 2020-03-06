import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./UserResolver";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./auth";
import { sendRefreshToken } from "./sendRefreshToken";

dotenv.config();

(async () => {
    const app = express();
    app.use(cors({
        credentials: true,
        origin: "http://localhost:3000",
    }));
    app.use(cookieParser());

    app.get('/', (_req, res) => {
        res.send('Hello');
    });

    app.post("/refresh-token", async (req, res) => {
        const token = req.cookies.jit;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }

        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (error) {
            console.log(error);
            return res.send({ ok: false, accessToken: "" });
        }

        const user = await User.findOne({ id: payload.userId });

        if (!user || user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }

        sendRefreshToken(res, createRefreshToken(token));

        return res.send({ ok: true, accessToken: createAccessToken(user) });

    });

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(5000, () => {
        console.log('App listening at localhost:5000');
    });
})();

