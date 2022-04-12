import {useState} from "react";
import {Box, Button, TextField} from "@mui/material";

import {birthPlaceFacet, sfsApi} from "../config/FacetSearchConfig";
import {CheckboxFacetComponent} from "./CheckboxFacetComponent";


export function FacetSearch() {

  const [searchPattern, setSearchPattern] = useState("");

  const handleSearch = () => {
    sfsApi.fetchResults(searchPattern);
  };

  // const parsed = sfsApi.sparqlParser.parse("SELECT * WHERE { " +
  //   "VALUES ?birthPlace {<http://dbpedia.org/resource/United_Kingdom> <http://dbpedia.org/resource/Japan>} " +
  //   "?id dbo:birthPlace ?birthPlace}");
  // console.info(parsed);

  return (
    <Box>
      <TextField
        value={searchPattern}
        onChange={event => setSearchPattern(event.target.value)}
      />
      <Button onClick={handleSearch}>
        Hledej
      </Button>
      <CheckboxFacetComponent facetLabel="Glosář" facet={birthPlaceFacet}/>
    </Box>
  );
}
