import {ChangeEvent} from "react";
import {useFacet} from "../tmp/useFacet";

import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

import {FacetComponentProps} from "./SelectFacetComponent";

export function CheckboxFacetComponent({label, facet}: FacetComponentProps<string[]>) {

  const {
    facetOptions,
    selectedValue,
    onChange
  } = useFacet(facet);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSelectedValue = event.target.checked ? [...selectedValue, event.target.value] : selectedValue.filter(val => val !== event.target.value)
    onChange(newSelectedValue);
  };

  return (
    <FormControl component="fieldset" size="small">
      <FormLabel component="legend">
        {label}
      </FormLabel>
      <FormGroup>
        {Object.entries(facetOptions).map(([label, count]) => (
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
