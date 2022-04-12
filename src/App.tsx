import {Grid} from "@mui/material";
import {SfsContextProvider} from "@bouredan/react-sfs";

import {sfsApi} from "./config/FacetSearchConfig";
import {ResultsComponent} from "./components/ResultsComponent";
import {FacetSearch} from "./components/FacetSearch";

function App() {

  return (
    <SfsContextProvider sfsApi={sfsApi}>
      <div>
        <Grid container spacing={3} padding={2}>
          <Grid item xs={3}>
            <FacetSearch/>
          </Grid>
          <Grid item xs>
            <ResultsComponent/>
          </Grid>
        </Grid>
      </div>
    </SfsContextProvider>
  );
}

export default App;
