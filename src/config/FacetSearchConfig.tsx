import {CheckboxFacet, SelectFacet, SfsApi} from "sfs-api";


export const glosaryFacet = new CheckboxFacet({
  id: "glosary",
  predicate: "<http://www.w3.org/2004/02/skos/core#inScheme>",
  labelPredicates: ["dct:title", "skos:prefLabel"],
});

export const subClassOfFacet = new SelectFacet({
  id: "subClassOf",
  predicate: "<http://www.w3.org/2000/01/rdf-schema#subClassOf>",
  labelPredicates: ["skos:prefLabel", "rdfs:label"],
});

export const birthPlaceFacet = new CheckboxFacet({
  id: "birthPlace",
  predicate: "dbp:birthPlace",
  labelPredicates: ["rdfs:label"],
});

export const nationalityFacet = new SelectFacet({
  id: "nationality",
  predicate: "dbp:nationality",
  labelPredicates: ["rdfs:label"],
});

const language = "en";

export const sfsApi = new SfsApi({
  endpointUrl: "https://xn--slovnk-7va.gov.cz/sparql",
  facets: [glosaryFacet, subClassOfFacet],
  queryTemplate:
    `SELECT DISTINCT ?_id ?_label 
WHERE 
  { ?_id a skos:Concept .
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
    dct: "http://purl.org/dc/terms/"
  },
  language,
});

export const sfsApiDbpedia = new SfsApi({
  endpointUrl: "https://dbpedia.org/sparql",
  facets: [birthPlaceFacet, nationalityFacet],
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
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    skos: "http://www.w3.org/2004/02/skos/core#",
    dbp: "http://dbpedia.org/property/",
    dbo: "http://dbpedia.org/ontology/",
    wcsc: "http://ldf.fi/schema/warsa/casualties/",
    wsch: "http://ldf.fi/schema/warsa/",
  },
});