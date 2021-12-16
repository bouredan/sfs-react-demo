import {IBindings, SparqlEndpointFetcher} from "fetch-sparql-endpoint";
import {VariableTerm} from "sparqljs";
import {buildFacet, Facet, FacetConfig} from "./Facet";

interface FacetSearchApiConfig {
  endpointUrl: string,
  facetConfigs: FacetConfig[],
  prefixes?: string,
}

export class FacetSearchApi {
  private readonly fetcher = new SparqlEndpointFetcher({});

  private readonly endpointUrl: string;
  private readonly facets: Record<string, Facet>;
  private readonly prefixes: string;

  constructor(config: FacetSearchApiConfig) {
    this.endpointUrl = config.endpointUrl;
    this.facets = config.facetConfigs.reduce((acc, curr) => ({...acc, [curr.id]: buildFacet(curr)}), {});
    this.prefixes = config.prefixes ?? "";
  }

  public async fetchResults() {
    const stream = await this.fetcher.fetchBindings(this.endpointUrl, this.generateSparql());
    return arrayifySparqlStream(stream);
  }

  public setValue(facetId: string, value: any) {
    this.facets[facetId].setValue(value);
  }

  private generateSparql() {
    return `
    ${this.prefixes} 
    SELECT * 
    WHERE {
      ?id a <http://dbpedia.org/ontology/Writer> .
      ${Object.values(this.facets).map(facet => facet.generateSparql()).join("")}
    }
    LIMIT 10
  `;
  }

}

interface SparqlResponse {
  variables: VariableTerm[],
  bindings: IBindings[],
}

function arrayifySparqlStream(stream: NodeJS.ReadableStream) {
  return new Promise<SparqlResponse>((resolve, reject) => {
    const bindings: IBindings[] = [];
    let variables: VariableTerm[] = [];
    stream.on("variables", fetchedVariables => {
      variables = fetchedVariables
    });
    stream.on("data", data => {
      bindings.push(data);
    });
    stream.on("error", reject);
    stream.on("end", () => {
      resolve({variables, bindings});
    });
  });
}