import {Grid} from "@mui/material";

import {FacetSearch} from "./components/FacetSearch";
import {ResultsComponent} from "./components/ResultsComponent";


function App() {

  return (
    <div>
      <Grid container spacing={3} padding={2}>
        <Grid item xs={4}>
          <FacetSearch/>
        </Grid>
        <Grid item xs>
          <ResultsComponent/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
