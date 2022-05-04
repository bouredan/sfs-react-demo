import {useState} from "react";

import {Box, Button, Grid, TextField} from "@mui/material";

import {birthPlaceFacet, nationalityFacet, sfsApi} from "../config/FacetSearchConfig";
import {CheckboxFacetComponent} from "./CheckboxFacetComponent";
import {SelectFacetComponent} from "./SelectFacetComponent";


export function FacetSearch() {

  const [searchPattern, setSearchPattern] = useState("");

  const handleSearch = () => {
    sfsApi.newSearch(searchPattern)
  };

  return (
    <Box>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <TextField
            value={searchPattern}
            onChange={event => setSearchPattern(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleSearch} variant="contained">
            Search
          </Button>
        </Grid>
      </Grid>
      <SelectFacetComponent facetLabel="Nationality" facet={nationalityFacet}/>
      <CheckboxFacetComponent facetLabel="Birth place" facet={birthPlaceFacet}/>
    </Box>
  );
}
