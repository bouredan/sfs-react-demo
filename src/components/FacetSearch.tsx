import {useState} from "react";
import {Box, Button, Grid, TextField} from "@mui/material";

import {glosaryFacet, sfsApi, subClassOfFacet} from "../config/FacetSearchConfig";
import {CheckboxFacetComponent} from "./CheckboxFacetComponent";
import {SelectFacetComponent} from "./SelectFacetComponent";


export function FacetSearch() {

  const [searchPattern, setSearchPattern] = useState("");

  const handleSearch = () => {
    sfsApi.newSearch(searchPattern);
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
            Hledej
          </Button>
        </Grid>
      </Grid>
      <SelectFacetComponent facetLabel="Je podtřídou" facet={subClassOfFacet}/>
      {/*<AutocompleteFacetComponent facetLabel="Glosář kopie" facet={glosaryFacet}/>*/}
      <CheckboxFacetComponent facetLabel="Glosář" facet={glosaryFacet}/>
    </Box>
  );
}
