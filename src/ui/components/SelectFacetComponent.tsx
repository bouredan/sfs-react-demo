import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

import {FacetConfig} from "../../api/facets/Facet";
import {useFacet} from "../hooks/useFacet";

export interface FacetComponentProps {
  facet: FacetConfig,
}

export function SelectFacetComponent({facet}: FacetComponentProps) {

  const {
    facetStats,
    selectedValue,
    onChange,
  } = useFacet(facet.id, "");

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
        {Object.entries(facetStats).map(([label, count]) => (
          <MenuItem key={label} value={label}>
            {label} ({count})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
