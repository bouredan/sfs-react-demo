import {Grid} from "@mui/material";

import {FacetSearch} from "./components/FacetSearch";
import {ResultsTableComponent} from "./components/ResultsTableComponent";


function App() {

  return (
    <div>
      <Grid container spacing={3} padding={2}>
        <Grid item xs={4}>
          <FacetSearch/>
        </Grid>
        <Grid item xs>
          <ResultsTableComponent/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
