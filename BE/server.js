import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone"
import { typeDefs } from "./schema.js";

//resolver tells how to a query will be processed for a graph
const resolvers={
    Query:{
        pokemon:async (_,{nameOrId})=>{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
            const data = await response.json();
      
            // 2. Return the data mapped to our Schema
            return {
              id: data.id,
              name: data.name,
              height: data.height,
              weight: data.weight,
              sprites: {
                front_default: data.sprites.front_default
              },
              //mapping complex array in simpler array of string
              types:data.types.map(t=>t.type.name),
              //only first 4 moves are shown
              moves:data.moves.slice(0,4).map(m=>m.move.name)
            };
        }
    }
}

const server = new ApolloServer({
    typeDefs,   // Must be plural 'typeDefs' to match Apollo's expectations
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log("server running at port 4000")