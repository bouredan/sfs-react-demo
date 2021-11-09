import {Autocomplete, TextField} from "@mui/material";
import {Facet} from "../data/Facet";
import {IBindings} from "fetch-sparql-endpoint";
import {fetchFacetData} from "../api/Api";
import {useEffect, useState} from "react";

interface FacetComponentProps {
  facet: Facet,
}

export function FacetComponent({facet}: FacetComponentProps) {

  const [options, setOptions] = useState<IBindings[]>([]);

  useEffect(() => {
    fetchFacetData(facet)
      .then(bindings => {
        setOptions(bindings)
      });
  }, [facet]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={option => option[facet.solutionWanted].value}
      multiple
      renderInput={(params) => (
        <TextField
          {...params}
          label={facet.label}
          placeholder={facet.label}
          variant="standard"
          margin="normal"
        />
      )}
    />
  );
}
