import { UserInputError, ApolloError } from 'apollo-server';
import fetch from 'node-fetch';

export async function getCEPAddress(cep) {
  if (cep.length !== 8) {
    return new UserInputError('INVALID_CEP', {
      invalidArgs: 'cep',
    });
  }

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const json = await response.json();

  if (json.erro) {
    return new ApolloError('INEXISTENT_CEP');
  }

  return json;
}