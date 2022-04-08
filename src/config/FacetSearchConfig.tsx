import {SelectFacet, SfsApi} from "@bouredan/sfs-api";


export const glosaryFacet = new SelectFacet({
  id: "glosary",
  predicate: "http://www.w3.org/2004/02/skos/core#inScheme",
  labelPredicates: ["dct:title", "skos:prefLabel"],
});

export const sfsApi = new SfsApi({
  endpointUrl: "https://xn--slovnk-7va.gov.cz/sparql",
  queryTemplate:
    `SELECT DISTINCT ?id ?label 
WHERE 
  { ?id a skos:Concept .
    OPTIONAL
      { ?id skos:prefLabel ?_label 
        FILTER langMatches(lang(?_label), "cs")
      }
      BIND(coalesce(?_label, ?id) AS ?label) 
  }
ORDER BY DESC(?label)`,
  facets: [glosaryFacet],
  prefixes: {
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    skos: "http://www.w3.org/2004/02/skos/core#",
    dct: "http://purl.org/dc/terms/",
  },
});
