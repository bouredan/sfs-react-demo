import {useEffect} from "react";
import {SfsContextProvider, useFacetSearch} from "@bouredan/react-sfs";

import {Button, Grid} from "@mui/material";

import {SelectFacetComponent} from "./SelectFacetComponent";
import {CheckboxFacetComponent} from "./CheckboxFacetComponent";
import {SearchResultsComponent} from "./SearchResultsComponent";
import {birthPlaceFacet, genreFacet} from "../App";


export function FacetSearch() {

  const {sfsApi, fetchResults} = useFacetSearch();

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <SfsContextProvider sfsApi={sfsApi}>
      <Grid container spacing={2} style={{padding: '16px'}}>
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
    </SfsContextProvider>
  );
}
