import { gql } from 'graphql-tag';
//we are defining custom objects in here under graphQL and we are defining what that obj would look like and the attributes it might contain
export const typeDefs=gql`

type Pokemon{
    id:ID!
    name:String!
    height:Int
    weight:Int
    sprites:PokemonSprites
    types:[String!]!
    moves:[String!]!
    }

    type PokemonSprites{
    front_default:String
    }

    type Query {
    pokemon(nameOrId: String!): Pokemon
  }`;


//query defines the entry points to a graph and also defines the exit point

