import {Facet} from "sfs-api";
import {useFacet} from "react-sfs";

import {FormControl, InputLabel, LinearProgress, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";


export interface FacetComponentProps<Value> {
  facetLabel: string,
  facet: Facet<Value>,
  disabled?: boolean,
}

export function SelectFacetComponent({facetLabel, facet, disabled}: FacetComponentProps<string>) {

  const labelId = `${facet.id}-select-label`;

  const {
    options,
    value,
    onValueChange,
    isFetching,
    error,
  } = useFacet(facet);

  const handleChange = (event: SelectChangeEvent) => {
    onValueChange(event.target.value);
  };

  if (error) {
    return (
      <Typography align="center" padding={1}>
        Error! Facet is not available.
      </Typography>
    );
  }

  return (
    <FormControl
      margin="normal"
      disabled={disabled}
      fullWidth
    >
      {isFetching && <LinearProgress/>}
      <InputLabel id={labelId} shrink>
        {facetLabel}
      </InputLabel>
      <Select
        labelId={labelId}
        value={value ?? ""}
        label={facetLabel}
        onChange={handleChange}
        notched
        displayEmpty
      >
        <MenuItem value="">
          <em>Žádný výběr</em>
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
