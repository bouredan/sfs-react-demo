import {useEffect} from "react";
import {useFacetSearch} from "@bouredan/react-sfs";

import {Button, Grid} from "@mui/material";

import {birthPlaceFacet, genreFacet} from "../config/FacetSearchConfig";
import {SelectFacetComponent} from "./SelectFacetComponent";
import {CheckboxFacetComponent} from "./CheckboxFacetComponent";
import {SearchResultsComponent} from "./SearchResultsComponent";


export function FacetSearch() {

  const {fetchResults} = useFacetSearch();

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <Grid container spacing={3} padding={2}>
      <Grid item xs={3}>
        <SelectFacetComponent label="Birth place" facet={birthPlaceFacet}/>
        <CheckboxFacetComponent label="Genre" facet={genreFacet}/>
        <div>
          <Button variant="outlined" onClick={fetchResults}>
            Fetch results
          </Button>
        </div>
      </Grid>
      <Grid item xs>
        <SearchResultsComponent/>
      </Grid>
    </Grid>
  );
}
