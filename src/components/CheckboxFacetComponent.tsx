import {Autocomplete, TextField} from "@mui/material";

import {FacetComponentProps} from "./SelectFacetComponent";

export function CheckboxFacetComponent({facet, options}: FacetComponentProps) {

  return (
    <Autocomplete
      options={options}
      getOptionLabel={option => option[facet.id].value}
      multiple
      renderInput={(params) => (
        <TextField
          {...params}
          label={facet.name}
          variant="standard"
          margin="normal"
        />
      )}
    />
  );
}
