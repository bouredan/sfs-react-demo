import {Facet} from "sfs-api";
import {useFacet} from "react-sfs";

import {FormControl, InputLabel, LinearProgress, MenuItem, Select, SelectChangeEvent} from "@mui/material";


export interface FacetComponentProps<Value> {
  facetLabel: string,
  facet: Facet<Value>,
}

export function SelectFacetComponent({facetLabel, facet}: FacetComponentProps<string>) {

  const labelId = `${facet.id}-select-label`;

  const {
    options,
    value,
    onValueChange,
    isFetching
  } = useFacet(facet);

  const handleChange = (event: SelectChangeEvent) => {
    onValueChange(event.target.value);
  };

  return (
    <FormControl fullWidth margin="normal">
      {isFetching && <LinearProgress/>}
      <InputLabel id={labelId}>
        {facetLabel}
      </InputLabel>
      <Select
        labelId={labelId}
        value={value ?? ""}
        label={facetLabel}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {!!options && options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            ({option.count}) {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
