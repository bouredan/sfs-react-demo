import {ChangeEvent} from "react";

import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

import {FacetComponentProps} from "./SelectFacetComponent";
import {useFacet} from "../hooks/useFacet";
import {sfsApi} from "./FacetSearch";

export function CheckboxFacetComponent({facet}: FacetComponentProps) {

  const {
    facetOptions,
    selectedValue,
    onChange
  } = useFacet<string[]>(sfsApi, facet.id, []);

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
