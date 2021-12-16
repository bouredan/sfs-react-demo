import {useState} from "react";
import {IBindings} from "fetch-sparql-endpoint";

import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

import {FacetConfig} from "../api/Facet";

export interface FacetComponentProps {
  facet: FacetConfig,
  options: IBindings[],
}

export function SelectFacetComponent({facet, options}: FacetComponentProps) {

  const [value, setValue] = useState("");

  const labelId = `${facet.id}-select-label`;

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>
        {facet.name}
      </InputLabel>
      <Select
        labelId={labelId}
        value={value}
        label={facet.name}
        onChange={handleChange}
      >
        {options.map(option => (
          <MenuItem key={option[facet.id].value}>
            {option[facet.id].value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
