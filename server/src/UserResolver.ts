import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx } from 'type-graphql';

import { User } from './entity/User';
import { MyContext } from './MyContext';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'hi!';
    }

    @Query(() => [User])
    users() {
        return User.find();
    }

    
    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: MyContext,
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email }});

        if (!user) {
            throw new Error("User was not found!");
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            throw new Error("Invalid password!");
        }

        // Login Successfull

        // Refresh token as cookie
        res.cookie(
            "jid",
            sign(
                { userId: user.id  },
                "secret2",
                { expiresIn: "7d" }
            ),
            {
                httpOnly: true,
            },
        );

        return {
            accessToken: sign(
                { userId: user.id },
                "secret",
                { expiresIn: "15m" }
            )
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        const hashedPassword = await hash(password, 12);
        try {
            await User.insert({
                email,
                password: hashedPassword,
            });
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }
}