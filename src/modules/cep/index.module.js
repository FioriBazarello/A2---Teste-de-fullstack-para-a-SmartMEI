import { gql } from 'apollo-server';
import { GraphQLModule } from '@graphql-modules/core';

import { getCEPAddress } from '../../services/cep';

const CEPModule = new GraphQLModule({
  typeDefs: gql`
  type Endereco {
    cep: String,
    logradouro: String,
    complemento: String,
    bairro: String,
    localidade: String,
    uf: String,
    unidade: String,
    ibge: String,
    gia: String
  }

  type Query {
    Endereco(cep: String!): Endereco
  }
`,
  resolvers: {
    Query: {
      Endereco: async (parent, args, context, info) => {
        return await getCEPAddress(args.cep);
      },
    },
  },
});

export default CEPModule;