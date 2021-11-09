import {BasicTriple} from "./BasicTriple";

export interface Facet {
  label: string,
  solutionWanted: string,
  triples: BasicTriple[],
  limit?: number,
}