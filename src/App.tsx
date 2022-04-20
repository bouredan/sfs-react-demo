import {Grid} from "@mui/material";

import {ResultsComponent} from "./components/ResultsComponent";
import {FacetSearch} from "./components/FacetSearch";
import "./config/FacetSearchConfig";


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
