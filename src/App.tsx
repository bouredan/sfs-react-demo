import {Box, Grid, Typography} from "@mui/material";

import {FacetSearch} from "./components/FacetSearch";
import {ResultsComponent} from "./components/ResultsComponent";


function App() {

  return (
    <Box padding={2}>
      <Typography variant="h3">
        Prohlížeč sémantického slovníku pojmů MVČR
      </Typography>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={4}>
          <FacetSearch/>
        </Grid>
        <Grid item xs>
          <ResultsComponent/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
