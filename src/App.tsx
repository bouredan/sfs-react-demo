import {CheckboxFacet, SfsApi} from "@bouredan/sfs-api";
import {SfsContextProvider} from "@bouredan/react-sfs";

import {FacetSearch} from "./components/FacetSearch";
import {CustomFacet} from "./CustomFacet";

export const birthPlaceFacet = new CustomFacet({
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
