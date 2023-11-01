import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { SERVER_API } from '@src/config/settings';

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
export function fetchQuery(operation: any, variables: any) {
  return fetch(SERVER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

const environment = new Environment({
  network,
  store,
});

export default environment;
