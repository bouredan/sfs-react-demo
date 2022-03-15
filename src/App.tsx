import {SfsContextProvider} from "@bouredan/react-sfs";

import {sfsApi} from "./config/FacetSearchConfig";
import {FacetSearch} from "./components/FacetSearch";

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
