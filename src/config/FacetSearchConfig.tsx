import {CheckboxFacet, SelectFacet, SfsApi} from "sfs-api";

export const typeFacet = new SelectFacet({
  id: "type",
  predicate: "rdf:type",
  labelPredicates: ["skos:prefLabel", "rdfs:label"],
});

export const subClassOfFacet = new SelectFacet({
  id: "subClassOf",
  predicate: "rdfs:subClassOf",
  labelPredicates: ["skos:prefLabel", "rdfs:label"],
});

export const glosaryFacet = new CheckboxFacet({
  id: "glosary",
  predicate: "skos:inScheme",
  labelPredicates: ["dct:title", "skos:prefLabel"],
});

const language = "cs";

export const sfsApi = new SfsApi({
  endpointUrl: "https://xn--slovnk-7va.gov.cz/sparql",
  facets: [typeFacet, subClassOfFacet, glosaryFacet],
  baseQuery:
    `SELECT DISTINCT ?_id ?_label ?definition ?schemeId ?schemeLabel ?typeId ?typeLabel ?superClassId ?superClassLabel 
WHERE 
  { ?_id a skos:Concept .
    FILTER (isIRI(?_id))
    OPTIONAL
      { ?_id rdfs:label ?rdfsLabel 
        FILTER (langMatches(lang(?rdfsLabel), "${language}"))
      }
    OPTIONAL
      { ?_id skos:prefLabel ?prefLabel 
        FILTER (langMatches(lang(?prefLabel), "${language}"))
      }
      BIND(coalesce(?rdfsLabel, ?prefLabel, ?_id) AS ?_label)
    OPTIONAL
      { ?_id skos:definition ?definition
        FILTER (langMatches(lang(?definition), "${language}"))
      }
    OPTIONAL
      { ?_id skos:inScheme ?schemeId
        FILTER (isIRI(?schemeId))
        OPTIONAL
          { ?schemeId dct:title ?schemeLabel1
            FILTER (langMatches(lang(?schemeLabel1), "${language}"))
          }
        BIND(coalesce(?schemeLabel1, ?schemeId) AS ?schemeLabel)
      }
    OPTIONAL
      { ?_id a ?typeId
        FILTER (isIRI(?typeId))
        OPTIONAL
          { ?typeId skos:prefLabel ?typeLabel1
            FILTER (langMatches(lang(?typeLabel1), "${language}"))
          }
        BIND(coalesce(?typeLabel1, ?typeId) AS ?typeLabel)
      }
    OPTIONAL
      { ?_id rdfs:subClassOf ?superClassId
        FILTER (isIRI(?superClassId))
        OPTIONAL
          { ?superClassId skos:prefLabel ?superClassLabel1
            FILTER (langMatches(lang(?superClassLabel1), "${language}"))
          }
        BIND(coalesce(?superClassLabel1, ?superClassId) AS ?superClassLabel)
      } 
  }
ORDER BY ASC(?_label)`,
  prefixes: {
    rdf: "https://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    skos: "http://www.w3.org/2004/02/skos/core#",
    owl: "http://www.w3.org/2002/07/owl#",
    dct: "http://purl.org/dc/terms/"
  },
  language,
});
