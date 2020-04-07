import { gql } from 'apollo-boost';
import "babel-polyfill";

import client from './index';

describe("CEP API", () => {
  test('Should load the selected data from a valid CEP', async () => {
    const query = gql`
      {
        Endereco(cep: "06045400") {
          localidade,
          uf
        }
      }
    `;

    const response = await client.query({ query });

    expect(response).toBeDefined();
    expect(response.data.Endereco.localidade).toEqual('Osasco');
    expect(response.data.Endereco.uf).toEqual('SP');
  });

  test('Should return a bad user input error from an invalid CEP', async () => {
    const query = gql`
      {
        Endereco(cep: "99999") {
          localidade,
          uf
        }
      }
    `;

    try {
      await client.query({ query });
    }
    catch(error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual('GraphQL error: INVALID_CEP');
    }
  });

  test('Should return an inexistent cep error from an invalid CEP', async () => {
    const query = gql`
      {
        Endereco(cep: "06045401") {
          localidade,
          uf
        }
      }
    `;

      try {
        await client.query({ query });
      }
      catch(error) {
        expect(error).toBeDefined();
        expect(error.message).toEqual('GraphQL error: INEXISTENT_CEP');
      }
  });
});