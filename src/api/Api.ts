import {IBindings, SparqlEndpointFetcher} from "fetch-sparql-endpoint";

import {Facet} from "../data/Facet";
import {createSparqlQuery} from "./SparqlQueryCreator";

const sparqlApi = new SparqlEndpointFetcher();

export function fetchFacetData(facet: Facet) {
  const sparql = createSparqlQuery(facet);
  console.log(sparql);
  return fetchBySparql(sparql);
}

function fetchBySparql(sparql: string) {
  return sparqlApi.fetchBindings("https://xn--slovnk-7va.gov.cz/sparql", sparql)
    .then(stream => {
      const bindings: IBindings[] = [];
      stream.on("data", data => {
        bindings.push(data);
      })
      return bindings
    })
    .catch(error => {
      console.log("error", error)
      return [];
    });
}
