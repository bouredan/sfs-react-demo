import {CheckboxFacet, SfsApi} from "@bouredan/sfs-api";


export const glosaryFacet = new CheckboxFacet({
  id: "glosary",
  predicate: "http://www.w3.org/2004/02/skos/core#inScheme",
  labelPredicates: ["dct:title", "skos:prefLabel"],
});

export const birthPlaceFacet = new CheckboxFacet({
  id: "birthPlace",
  predicate: "<http://dbpedia.org/property/birthPlace>",
  labelPredicates: ["rdfs:label", "dct:title", "skos:prefLabel"],
});

const language = "en";

export const sfsApi = new SfsApi({
  endpointUrl: "https://dbpedia.org/sparql",
  // fetch: ((requestInfo, init) => {
  //   const headers: Headers = new Headers(init?.headers);
  //   headers.append('Accept', 'application/sparql-results+json');
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   const body = new URLSearchParams();
  //   return fetch("https://xn--slovnk-7va.gov.cz/sparql", {
  //     mode: 'no-cors',
  //     method: 'POST',
  //     headers,
  //     body
  //   })
  // }),
  queryTemplate:
    `SELECT DISTINCT ?id ?label 
WHERE 
  { ?id a <http://dbpedia.org/ontology/Writer> .
    OPTIONAL
      { ?id rdfs:label ?_label 
        FILTER langMatches(lang(?_label), "${language}")
      }
      BIND(coalesce(?_label, ?id) AS ?label) 
  }
ORDER BY ASC(?label)`,
  facets: [birthPlaceFacet],
  prefixes: {
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    skos: "http://www.w3.org/2004/02/skos/core#",
    dct: "http://purl.org/dc/terms/",
    dbp: "http://dbpedia.org/property/",
    dbo: "http://dbpedia.org/ontology/",
  },
  language,
});
