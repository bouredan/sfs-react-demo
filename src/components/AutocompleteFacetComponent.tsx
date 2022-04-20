import { FacetOption } from "sfs-api";
import {useFacet} from "react-sfs";

import {Autocomplete, TextField} from "@mui/material";

import {FacetComponentProps} from "./SelectFacetComponent";


export function AutocompleteFacetComponent({facetLabel, facet}: FacetComponentProps<string[]>) {

  const {
    options,
    onValueChange,
  } = useFacet(facet);

  const handleChange = (event: unknown, newValue: FacetOption[]) => {
    onValueChange(newValue.map(val => val.value));
  };

  return (
    <Autocomplete
      multiple
      options={options}
      isOptionEqualToValue={(option, option2) => option.value === option2.value}
      getOptionLabel={(option => `(${option.count}) ${option.label}`)}
      onChange={handleChange}
      renderInput={(params => (
        <TextField
          {...params}
          label={facetLabel}
        />
      ))}
    />
  );
}
