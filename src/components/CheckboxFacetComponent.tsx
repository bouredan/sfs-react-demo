import {ChangeEvent, useEffect, useState} from "react";
import { FacetOption } from "@bouredan/sfs-api";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";

import {FacetComponentProps} from "./SelectFacetComponent";

export function CheckboxFacetComponent({facetLabel, facet}: FacetComponentProps<string[]>) {

  const [options, setOptions] = useState<FacetOption[]>();
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    // document.addEventListener(facet.id, ((event: CustomEvent<FacetOption[]>) => {
    //   setOptions(event.detail);
    // }) as EventListener);
    facet.attachSubscriber(setOptions);
    facet.refreshOptions();
  }, [facet]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSelectedValue = event.target.checked ? [...value, event.target.value] : value.filter(val => val !== event.target.value)
    facet.setValue(newSelectedValue);
    setValue(newSelectedValue);
  };

  return (
    <FormControl component="fieldset" size="small">
      <FormLabel component="legend">
        {facetLabel}
      </FormLabel>
      <FormGroup>
        {!!options && options.map(option => {
          return (
            <FormControlLabel
              key={option.value}
              label={`(${option.count}) ${option.label}`}
              control={
                <Checkbox
                  value={option.value}
                  name={option.value}
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
