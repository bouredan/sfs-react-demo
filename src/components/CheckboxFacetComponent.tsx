import {ChangeEvent} from "react";
import {Virtuoso} from "react-virtuoso";
import {FacetOption} from "sfs-api";
import {useFacet} from "react-sfs";

import {Box, Checkbox, FormControl, FormControlLabel, FormLabel, LinearProgress} from "@mui/material";

import {FacetComponentProps} from "./SelectFacetComponent";


export function CheckboxFacetComponent({facetLabel, facet}: FacetComponentProps<string[]>) {

  const {
    options,
    value,
    onValueChange,
    isFetching
  } = useFacet(facet);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const prevValue = value ?? [];
    const newValue = event.target.checked ? [...prevValue, event.target.value] : prevValue.filter(val => val !== event.target.value)
    onValueChange(newValue);
  };

  return (
    <FormControl
      component="fieldset"
      margin="normal"
      fullWidth
    >
      {isFetching && <LinearProgress/>}
      <FormLabel component="legend">
        {facetLabel}
      </FormLabel>
      <Virtuoso
        style={{height: '80vh'}}
        data={options}
        overscan={5}
        itemContent={Option}
      />
    </FormControl>
  );

  function Option(index: number, option: FacetOption) {

    return (
      <Box marginLeft={2}>
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
      </Box>
    );
  }
}
