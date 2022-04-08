import {ChangeEvent} from "react";
import {useFacet} from "@bouredan/react-sfs";

import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

import {FacetComponentProps} from "./SelectFacetComponent";

export function CheckboxFacetComponent({facetLabel, facet}: FacetComponentProps<string[]>) {

  const {
    facetOptions,
    selectedValue,
    onValueChange,
  } = useFacet(facet);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = selectedValue ?? []
    const newSelectedValue = event.target.checked ? [...value, event.target.value] : value.filter(val => val !== event.target.value)
    onValueChange(newSelectedValue);
  };

  return (
    <FormControl component="fieldset" size="small">
      <FormLabel component="legend">
        {facetLabel}
      </FormLabel>
      <FormGroup>
        {Object.values(facetOptions).map((bindings, index) => {
          const option = bindings[facet.id].value;
          const optionLabel = `${bindings[facet.id + "Label"].value}`;
          return (
            <FormControlLabel
              key={option}
              label={optionLabel}
              control={
                <Checkbox
                  value={option}
                  name={optionLabel}
                  onChange={handleChange}
                />
              }
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
