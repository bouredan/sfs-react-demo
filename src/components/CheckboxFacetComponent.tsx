import {ChangeEvent, CSSProperties} from "react";
import {FixedSizeList} from "react-window";
import {useFacet} from "react-sfs";

import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, LinearProgress} from "@mui/material";

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

  const renderOption = ({index, style}: {index: number, style: CSSProperties}) => {
    const option = options[index];
    return (
      <FormControlLabel
        key={option.value}
        style={style}
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
  }

  return (
    <FormControl component="fieldset" size="small" margin="normal" fullWidth>
      {isFetching && <LinearProgress/>}
      <FormLabel component="legend">
        {facetLabel}
      </FormLabel>
      <FormGroup>
        <FixedSizeList
          style={{overflow: "scroll"}}
          useIsScrolling
          height={800}
          itemCount={options.length}
          itemSize={35}
          width={"100%"}
          overscanCount={5}
        >
          {renderOption}
        </FixedSizeList>
      </FormGroup>
    </FormControl>
  );
}
