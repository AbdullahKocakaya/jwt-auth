import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx } from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from './entity/User';
import { MyContext } from './MyContext';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}

@Resolver()
export class UserResolver {
    @Query( () => String )
    hello() {
        return 'hi!'
    }

    @Query( () => [User] )
    users() {
        return User.find();
    }

    @Mutation(() => LoginResponse)
    async login (
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: MyContext
        ): Promise<LoginResponse> {

        const user = await User.findOne({ where: { email }});

        if(!user) {
            throw new Error ('no user');
        }

        const valid = await compare(password, user.password);

        if(!valid) {
            throw new Error("wrong password");
        }

        //login successfull

        res.cookie(
            'jid', 
            sign(
                { userId: user.id }, 
                'secret', 
                { expiresIn: '15m' }
            ),
            { httpOnly: true }
        );

        return {
            accessToken: sign(
                { userId: user.id }, 
                'secret', 
                { expiresIn: '15m' }
            )
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {

        const hashedPassword = await hash(password, 12);

        try {
            await User.insert({
                email,
                password : hashedPassword
            });
        } catch(err){
            console.log(err);
            return false;
        }
        return true;
    }
}