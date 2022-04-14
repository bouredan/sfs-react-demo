import {CheckboxFacet, SelectFacet, SfsApi} from "@bouredan/sfs-api";


export const glosaryFacet = new CheckboxFacet({
  id: "glosary",
  predicate: "<http://www.w3.org/2004/02/skos/core#inScheme>",
  labelPredicates: ["dct:title", "skos:prefLabel"],
});

export const subClassOfFacet = new SelectFacet({
  id: "subClassOf",
  predicate: "<http://www.w3.org/2000/01/rdf-schema#subClassOf>",
  labelPredicates: ["skos:prefLabel", "rdfs:label"],
})

const language = "cs";

export const sfsApi = new SfsApi({
  endpointUrl: "https://xn--slovnk-7va.gov.cz/sparql",
  facets: [glosaryFacet, subClassOfFacet],
  queryTemplate:
    `SELECT DISTINCT ?_id ?_label 
WHERE 
  { ?_id a <http://www.w3.org/2004/02/skos/core#Concept> .
    FILTER isIRI(?_id)
    OPTIONAL
      { ?_id rdfs:label ?rdfsLabel 
        FILTER langMatches(lang(?rdfsLabel), "${language}")
      }
    OPTIONAL
      { ?_id skos:prefLabel ?prefLabel 
        FILTER langMatches(lang(?prefLabel), "${language}")
      }
      BIND(coalesce(?rdfsLabel, ?prefLabel, ?_id) AS ?_label) 
  }
ORDER BY ASC(?_label)`,
  prefixes: {
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    skos: "http://www.w3.org/2004/02/skos/core#",
    dct: "http://purl.org/dc/terms/",
    dbp: "http://dbpedia.org/property/",
    dbo: "http://dbpedia.org/ontology/",
  },
  language,
});
