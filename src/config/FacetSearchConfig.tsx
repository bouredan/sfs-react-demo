import {CheckboxFacet, SelectFacet, SfsApi} from "sfs-api";

export const nationalityFacet = new SelectFacet({
  id: "nationality",
  predicate: "dbp:nationality",
  labelPredicates: ["rdfs:label"],
});

export const birthPlaceFacet = new CheckboxFacet({
  id: "birthPlace",
  predicate: "dbp:birthPlace",
  labelPredicates: ["rdfs:label"],
});

const language = "en";

export const sfsApi = new SfsApi({
  endpointUrl: "https://dbpedia.org/sparql",
  facets: [nationalityFacet, birthPlaceFacet],
  queryTemplate:
    `SELECT DISTINCT ?_id ?_label 
WHERE 
  { ?_id a dbo:Writer .    
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
  language,
  prefixes: {
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    skos: "http://www.w3.org/2004/02/skos/core#",
    dbp: "http://dbpedia.org/property/",
    dbo: "http://dbpedia.org/ontology/"
  },
});