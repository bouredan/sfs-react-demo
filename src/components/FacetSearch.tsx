import {conceptTriples, vocabularyTriples} from "../data/BasicTriple";
import {Facet} from "../data/Facet";
import {FacetComponent} from "./FacetComponent";

const conceptsFacet: Facet = {
  label: "Concepts",
  solutionWanted: "concept",
  triples: conceptTriples,
  limit: 20,
}

const vocabulariesFacet: Facet = {
  label: "Vocabularies",
  solutionWanted: "nazev_slovniku",
  triples: vocabularyTriples,
  limit: 20,
}

export function FacetSearch() {

  return (
    <div>
      <FacetComponent facet={conceptsFacet}/>
      <FacetComponent facet={vocabulariesFacet}/>
    </div>
  );
}
