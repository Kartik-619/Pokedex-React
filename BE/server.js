import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone"
import { typeDefs } from "./schema.js";

//resolver tells how to a query will be processed for a graph
const resolvers = {
  Query: {
    pokemon: async (_, { nameOrId }) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`
        );

        if (!response.ok) {
          throw new Error("Pokemon not found");
        }

        const data = await response.json();

        return {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,

          sprites: {
            front_default: data.sprites.front_default,
          },

          types: data.types.map((t) => t.type.name),

          moves: data.moves
            .slice(0, 4)
            .map((m) => m.move.name),
        };
      } catch (err) {
        console.error(err);
        throw new Error(err.message);
      }
    },
  },
};

const server = new ApolloServer({
    typeDefs,   // Must be plural 'typeDefs' to match Apollo's expectations
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log("server running at port 4000")