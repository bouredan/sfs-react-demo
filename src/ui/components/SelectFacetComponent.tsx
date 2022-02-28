import {FacetConfig} from "@bouredan/sfs-api";

import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

import {useFacet} from "../hooks/useFacet";
import {sfsApi} from "./FacetSearch";

export interface FacetComponentProps {
  facet: FacetConfig,
}

export function SelectFacetComponent({facet}: FacetComponentProps) {

  const {
    facetOptions,
    selectedValue,
    onChange,
  } = useFacet(sfsApi, facet.id, "");

  const labelId = `${facet.id}-select-label`;

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>
        {facet.name}
      </InputLabel>
      <Select
        labelId={labelId}
        value={selectedValue}
        label={facet.name}
        onChange={handleChange}
      >
        {Object.entries(facetOptions).map(([label, count]) => (
          <MenuItem key={label} value={label}>
            {label} ({count})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
