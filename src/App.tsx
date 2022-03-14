import {CheckboxFacet, SelectFacet, SfsApi} from "@bouredan/sfs-api/dist";
import { SfsContextProvider } from "./tmp/SfsContext";

import {FacetSearch} from "./components/FacetSearch";

export const birthPlaceFacet = new SelectFacet({
  id: "birthPlace",
  predicate: "dbp:birthPlace",
  initialValue: "",
});

export const genreFacet = new CheckboxFacet({
  id: "genre",
  predicate: "dbp:genre",
  initialValue: [],
});

const sfsApi = new SfsApi({
  endpointUrl: "https://dbpedia.org/sparql",
  facets: [birthPlaceFacet, genreFacet],
  prefixes: `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX dbp: <http://dbpedia.org/property/>
        PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      `
});

function App() {
  return (
    <div className="App">
      <SfsContextProvider sfsApi={sfsApi}>
        <FacetSearch/>
      </SfsContextProvider>
    </div>
  );
}

export default App;
