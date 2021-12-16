import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

import {FacetComponentProps} from "./SelectFacetComponent";
import {useFacet} from "../hooks/useFacet";
import {ChangeEvent} from "react";

export function CheckboxFacetComponent({facet}: FacetComponentProps) {

  const {
    facetStats,
    selectedValue,
    onChange
  } = useFacet<string[]>(facet.id, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSelectedValue = event.target.checked ? [...selectedValue, event.target.value] : selectedValue.filter(val => val !== event.target.value)
    onChange(newSelectedValue);
  };

  return (
    <FormControl component="fieldset" size="small">
      <FormLabel component="legend">
        {facet.name}
      </FormLabel>
      <FormGroup>
        {Object.entries(facetStats).map(([label, count]) => (
          <FormControlLabel
            key={label}
            label={`${label} (${count})`}
            control={<Checkbox value={label} onChange={handleChange} name={label}/>}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
