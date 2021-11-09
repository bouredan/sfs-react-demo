import {Facet} from "../data/Facet";

export function createSparqlQuery(query: Facet): string {
  const whereClauses = query.triples.map(({subject, predicate, object}) => {
    return `${subject} ${predicate} ${object} .`;
  });
  return (
    "PREFIX dct: <http://purl.org/dc/terms/> " +
    "SELECT DISTINCT * " +
    `WHERE { ${whereClauses.join(" ")} } ` +
    `${query.limit ? `LIMIT ${query.limit}` : ""}`
  );
}