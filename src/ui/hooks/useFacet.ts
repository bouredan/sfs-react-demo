import {useCallback, useEffect, useState} from "react"

import {sfsApi} from "../components/FacetSearch";
import {FacetStats} from "../../api/FacetSearchApi";


export function useFacet<Value>(facetId: string, initialValue: Value) {

  const [selectedValue, setSelectedValue] = useState<Value>(initialValue);
  const [facetStats, setFacetStats] = useState<FacetStats>({});

  const onChange = useCallback((selectedValue: Value) => {
    setSelectedValue(selectedValue);
    sfsApi.setValue(facetId, selectedValue);
  }, [facetId]);

  useEffect(() => {
    const handleFacetChanged = (newFacetState: FacetStats) => {
      setFacetStats(newFacetState);
    };
    sfsApi.subscribeToFacetState(facetId, handleFacetChanged);

    return () => {
      sfsApi.unsubscribeToFacetState(facetId, handleFacetChanged);
    };
  }, [facetId]);

  return {
    facetStats,
    selectedValue,
    onChange,
  };
}
