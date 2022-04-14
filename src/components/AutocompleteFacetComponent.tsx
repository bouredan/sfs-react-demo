import {useEffect, useState} from "react";
import { FacetOption, FacetState } from "@bouredan/sfs-api";
import {Autocomplete, TextField} from "@mui/material";

import {FacetComponentProps} from "./SelectFacetComponent";

export function AutocompleteFacetComponent({facetLabel, facet}: FacetComponentProps<string[]>) {

  const [options, setOptions] = useState<FacetOption[]>([]);
  const [, setValue] = useState<string[]>();

  const handleFacetStateChange = (facetState: FacetState<string[]>) => {
    setOptions(facetState.options);
    setValue(facetState.value);
  };

  useEffect(() => {
    facet.attachSubscriber(handleFacetStateChange);
    //facet.refreshOptions();
  }, [facet]);

  const handleChange = (event: unknown, newValue: FacetOption[]) => {
    // const prevValue = value ?? [];
    // const newValue = event.target.checked ? [...prevValue, event.target.value] : prevValue.filter(val => val !== event.target.value)
    facet.setValue(newValue.map(val => val.value));
  };

  return (
    <Autocomplete
      multiple
      options={options}
      isOptionEqualToValue={(option, option2) => option.value === option2.value}
      getOptionLabel={(option => `(${option.count}) ${option.label}`)}
      onChange={handleChange}
      renderInput={(params => (
        <TextField
          {...params}
          label={facetLabel}
        />
      ))}
    />
  );
}
