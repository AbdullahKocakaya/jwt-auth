import { MiddlewareFn } from "type-graphql"
import { MyContext } from "./MyContext"
import { verify } from "jsonwebtoken";

// bearer 1412554sdaffdsf24 => token is going to look like that. that's why we split it and take the second one.

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
        throw new Error("not authenticated!");
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as any;
    } catch(err) {
        console.log('### isAuth -> ', err);
        throw new Error("not authenticated!");
    }

    return next()
}