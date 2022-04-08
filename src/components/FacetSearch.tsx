import {Grid} from "@mui/material";

import {glosaryFacet} from "../config/FacetSearchConfig";
import {SearchResultsComponent} from "./SearchResultsComponent";
import {SelectFacetComponent} from "./SelectFacetComponent";


export function FacetSearch() {

  return (
    <Grid container spacing={3} padding={2}>
      <Grid item xs={3}>
        <SelectFacetComponent facetLabel="Glosář" facet={glosaryFacet}/>
      </Grid>
      <Grid item xs>
        <SearchResultsComponent/>
      </Grid>
    </Grid>
  );
}
