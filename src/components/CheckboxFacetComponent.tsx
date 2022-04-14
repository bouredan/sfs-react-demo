import {ChangeEvent, useEffect, useState} from "react";
import { FacetOption, FacetState } from "@bouredan/sfs-api";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

import {FacetComponentProps} from "./SelectFacetComponent";

export function CheckboxFacetComponent({facetLabel, facet}: FacetComponentProps<string[]>) {

  const [options, setOptions] = useState<FacetOption[]>([]);
  const [value, setValue] = useState<string[]>();

  const handleFacetStateChange = (facetState: FacetState<string[]>) => {
    setOptions(facetState.options);
    setValue(facetState.value);
  };

  useEffect(() => {
    // document.addEventListener(facet.id, ((event: CustomEvent<FacetOption[]>) => {
    //   setOptions(event.detail);
    // }) as EventListener);
    facet.attachSubscriber(handleFacetStateChange);
    facet.refreshOptions();
  }, [facet]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const prevValue = value ?? [];
    const newValue = event.target.checked ? [...prevValue, event.target.value] : prevValue.filter(val => val !== event.target.value)
    facet.setValue(newValue);
  };

  return (
    <FormControl component="fieldset" size="small" margin="normal">
      <FormLabel component="legend">
        {facetLabel}
      </FormLabel>
      <FormGroup>
        {options.map(option => {
          return (
            <FormControlLabel
              key={option.value}
              label={`(${option.count}) ${option.label}`}
              control={
                <Checkbox
                  value={option.value}
                  name={option.value}
                  checked={value ? value.includes(option.value) : false}
                  onChange={handleChange}
                  size="small"
                />
              }
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
