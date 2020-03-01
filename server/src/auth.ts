import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

export const createAccessToken = (user: User) => {
    return sign(
        { userId: user.id },
        "secret",
        { expiresIn: "15m" }
    );
};

export const createRefreshToken = (user: User) => {
    return sign(
        { userId: user.id  },
        "secret2",
        { expiresIn: "7d" }
    );
}