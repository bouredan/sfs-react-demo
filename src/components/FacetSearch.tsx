import {FormEvent, useState} from "react";
import {useFacetSearch} from "react-sfs";

import {Box, Button, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import {Clear as ClearIcon, Search as SearchIcon} from "@mui/icons-material";

import {glosaryFacet, sfsApi, subClassOfFacet, typeFacet} from "../config/FacetSearchConfig";
import {CheckboxFacetComponent} from "./CheckboxFacetComponent";
import {SelectFacetComponent} from "./SelectFacetComponent";


export function FacetSearch() {

  const [searchPattern, setSearchPattern] = useState("");

  const {isFetching} = useFacetSearch(sfsApi);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    sfsApi.newSearch(searchPattern);
  }

  return (
    <Box>
      <form onSubmit={handleSearchSubmit}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs>
            <TextField
              label="Hledat dle názvu"
              value={searchPattern}
              onChange={event => setSearchPattern(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon/>
                  </InputAdornment>
                ),
                endAdornment: !!searchPattern && (
                  <IconButton onClick={() => setSearchPattern("")}>
                    <ClearIcon/>
                  </IconButton>
                )
              }}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Hledej
            </Button>
          </Grid>
        </Grid>
      </form>
      <SelectFacetComponent
        facetLabel="Je typu"
        facet={typeFacet}
        disabled={isFetching}
      />
      <SelectFacetComponent
        facetLabel="Je podtřídou"
        facet={subClassOfFacet}
        disabled={isFetching}
      />
      <CheckboxFacetComponent
        facetLabel="Glosář"
        facet={glosaryFacet}
        disabled={isFetching}
      />
    </Box>
  );
}
