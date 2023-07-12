const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');

function initGateway() {
  let services = [
    { name: 'user', url: `http://localhost:7070/graphql/user`},
    { name: 'film', url: `http://localhost:8080/graphql/film`},
    { name: 'review', url: `http://localhost:9090/graphql/review`},
  ];

  console.log('initGateway with services:', services);

  return new ApolloGateway({
    serviceList: services,
    buildService: ({ name, url}) => (new RemoteGraphQLDataSource({ name, url })),
  });
}

let gateway = initGateway();

(async () => {
  const { schema, executor } = await gateway.load();


  const server = new ApolloServer({
    schema,
    executor,
    subscriptions: false,
    playground: {
      settings: {
        'editor.theme': 'light',
      },
      tabs: [
        {
          query: {},
        },
      ],
    }
  });

  const app = express();

  await server.start()
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => console.log(`ð<9f><9a><80> Server ready at http://localhost:${PORT}/`));
})().catch(
    e => {
      console.error(e)
    });
