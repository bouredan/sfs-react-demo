export type SortType = "asc" | "desc";

export interface BasicTriple {
  subject: string,
  predicate: string,
  object: string,
  sort?: SortType,
}

export const conceptTriples: BasicTriple[] = [{
  subject: "[]",
  predicate: "a",
  object: "?concept",
  sort: "desc",
}];

export const vocabularyTriples: BasicTriple[] = [{
  subject: "?slovnik",
  predicate: "a",
  object: "<http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/slovník>",
}, {
  subject: "?slovnik",
  predicate: "dct:title",
  object: "?nazev_slovniku",
}];
