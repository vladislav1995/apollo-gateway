Run the following commands to deploy apollo gateway. Pay attention that all other GraphQL services must be deployed as well
`npm install express graphql apollo-server-express @apollo/server @apollo/gateway`
`node --max_old_space_size=1024 gateway.js`