import {Facet} from "@bouredan/sfs-api/dist";
import {useFacet} from "../tmp/useFacet";

import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

export interface FacetComponentProps<Value> {
  label: string,
  facet: Facet<Value>,
}

export function SelectFacetComponent({label, facet}: FacetComponentProps<string>) {

  const {
    facetOptions,
    selectedValue,
    onChange,
  } = useFacet(facet);

  const labelId = `${facet.id}-select-label`;

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        value={selectedValue}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.entries(facetOptions).map(([label, count]) => (
          <MenuItem key={label} value={label}>
            {label} ({count})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
