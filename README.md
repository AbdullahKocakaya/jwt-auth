# JWT Example
JWT Example is an app that how to manage access and refresh token via cookie. You can basically register, login, see other registered users and logout.

## Technical Details
For backend it's Express.js and for database it's uses PostgeSQL. And for the login obviously it is using JSON Web Token authentication. For frontend i used React.js and React Router DOM.

## How to Run
#### For backend
- Create `./server/.env` file. The parameters are in `.env.example`
- Setup database settings inside `./server/ormconfig.json` file
- Download PostgreSQL v11.10 from [here](https://www.postgresql.org/download/)
- Create db named `jwt-auth-example`
- Run `yarn`
- And finally run `yarn start`
- You should see GraphQL Playground http://localhost:4000/graphql

#### For frontend
- If this folder is not exist `./web/src/generated/` run this `yarn gen`
- Run `yarn`
- And go with `yarn start`
