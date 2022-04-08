import {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Facet, FacetOption} from "@bouredan/sfs-api";


export interface FacetComponentProps<Value> {
  facetLabel: string,
  facet: Facet<Value>,
}

export function SelectFacetComponent({facetLabel, facet}: FacetComponentProps<string>) {

  const labelId = `${facet.id}-select-label`;

  const [options, setOptions] = useState<FacetOption[]>();
  const [value, setValue] = useState("");

  useEffect(() => {
    // document.addEventListener(facet.id, ((event: CustomEvent<FacetOption[]>) => {
    //   setOptions(event.detail);
    // }) as EventListener);
    facet.attachSubscriber(setOptions);
    facet.refreshOptions();
  }, [facet]);


  const handleChange = (event: SelectChangeEvent) => {
    facet.setValue(event.target.value);
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>
        {facetLabel}
      </InputLabel>
      <Select
        labelId={labelId}
        value={value}
        label={facetLabel}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {!!options && options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            ({option.count}) {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
