import {useCallback, useEffect, useState} from "react"
import {FacetOptions, FacetSearchApi} from "@bouredan/sfs-api";

export function useFacet<Value>(facetSearchApi: FacetSearchApi, facetId: string, initialValue: Value) {

  const [selectedValue, setSelectedValue] = useState<Value>(initialValue);
  const [facetOptions, setFacetOptions] = useState<FacetOptions>({});

  const onChange = useCallback((selectedValue: Value) => {
    setSelectedValue(selectedValue);
    facetSearchApi.setValue(facetId, selectedValue);
  }, [facetId, facetSearchApi]);

  useEffect(() => {
    const handleFacetChanged = (newFacetState: FacetOptions) => {
      setFacetOptions(newFacetState);
    };
    facetSearchApi.subscribeToFacetState(facetId, handleFacetChanged);

    return () => {
      facetSearchApi.unsubscribeToFacetState(facetId, handleFacetChanged);
    };
  }, [facetId, facetSearchApi]);

  return {
    facetOptions,
    selectedValue,
    onChange,
  };
}
