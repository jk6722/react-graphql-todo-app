const express = require("express");

const { buildSchema } = require("graphql");
const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const { json } = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");

const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");

const path = require("path");

// loadFilesSync로 현재 폴더(__dirname)에 있는
// 모든 폴더(**) 속 ~.graphql로 끝나는 모든 파일(*)을 불러오겠다.
const loadedTypes = loadFilesSync("**/*", {
  extensions: ["graphql"],
});

const loadedResolvers = loadFilesSync(
  path.join(__dirname, "**/*.resolvers.js")
);

const startApolloServer = async () => {
  const app = express();
  const port = 4000;

  const schema = makeExecutableSchema({
    typeDefs: loadedTypes,
    resolvers: loadedResolvers,
  });

  // This Apollo server object contains all the middleware and
  // logic to handle incoming graphical requests.
  const server = new ApolloServer({
    schema,
  });

  // Ensure we wait for our apollo server to start
  await server.start();
  // Connect apollo middleware with express server
  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );
  // app express 서버를 Connect하고, incoming request를 처리할 graphql path!

  app.listen(port, () => {
    console.log("Running a GraphQL API server...");
  });
};

startApolloServer();
