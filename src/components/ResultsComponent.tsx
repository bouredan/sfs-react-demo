import {Virtuoso} from "react-virtuoso";
import {Bindings} from "sfs-api";
import {useFacetSearch} from "react-sfs";

import {Box, Divider, LinearProgress, Link, Typography} from "@mui/material";

import {sfsApi} from "../config/FacetSearchConfig";


export function ResultsComponent() {

  const {
    results,
    lastSearchPattern,
    isFetching,
    error
  } = useFacetSearch(sfsApi);

  if (error) {
    return (
      <Typography variant="h6" align="center">
        Error! No results available.
      </Typography>
    );
  }

  /**
   * All this code with Map and Sets is just to group not grouped bindings from SPARQL query.
   * Otherwise, there could be multiple rows (solutions) for an id.
   */
  const bindingsMap = new Map<string, Bindings[]>();
  results?.bindings.forEach(bindings => {
    const entry = bindingsMap.get(bindings["_id"].value);
    bindingsMap.set(bindings["_id"].value, entry ? [...entry, bindings] : [bindings]);
  });
  const bindings = Array.from(bindingsMap.values());

  return (
    <Box padding={1}>
      <Box height="24px">
        {isFetching ?
          <LinearProgress/> :
          (results &&
            <Box>
              Vyhledáno {bindingsMap.size} pojmů {!!lastSearchPattern && `pro "${lastSearchPattern}"`}
            </Box>
          )
        }
      </Box>
      {!!results &&
        <Virtuoso
          style={{height: '95vh'}}
          data={bindings}
          itemContent={ResultRow}
        />
      }
    </Box>
  );

  function ResultRow(index: number, bindings: Bindings[]) {
    const typeIdsSet = new Set<string>();
    const typeLabelsSet = new Set<string>();
    const superClassIdsSet = new Set<string>();
    const superClassLabelsSet = new Set<string>();
    /**
     * This bit of code is making sure our typeLabels and superClassLabels are unique.
     */
    bindings.forEach(binding => {
      if (binding["typeLabel"]) {
        typeIdsSet.add(binding["typeId"].value);
        typeLabelsSet.add(binding["typeLabel"].value);
      }
      if (binding["superClassLabel"]) {
        superClassIdsSet.add(binding["superClassId"].value);
        superClassLabelsSet.add(binding["superClassLabel"].value);
      }
    });
    const typeIds = Array.from(typeIdsSet.values());
    const superClassIds = Array.from(superClassIdsSet.values());
    const typeLabels = Array.from(typeLabelsSet.values());
    const superClassLabels = Array.from(superClassLabelsSet.values());
    return (
      <Box key={index}>
        <Box padding={1}>
          <Typography variant="h6">
            <Link href={bindings[0]["_id"].value} target="_blank">
              {bindings[0]["_label"].value}
            </Link>
          </Typography>
          <Typography variant="body2" component="div">
            {!!bindings[0]["schemeId"] &&
              <Box>
                z glosáře&nbsp;
                <Link href={bindings[0]["schemeId"].value} target="_blank">
                  {bindings[0]["schemeLabel"].value}
                </Link>
              </Box>
            }
            {typeIds.length > 0 &&
              <Box>
                je typu:&nbsp;
                <ul style={{margin: 0}}>
                  {typeIds.map((typeId, i) => (
                    <li key={typeId}>
                      <Link href={typeId} target="_blank">
                        {typeLabels[i]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Box>
            }
            {superClassIds.length > 0 &&
              <Box>
                je podtřídou:&nbsp;
                <ul style={{marginTop: 0}}>
                  {superClassIds.map((superClassId, i) => (
                    <li key={superClassId}>
                      <Link href={superClassId} target="_blank">
                        {superClassLabels[i]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Box>
            }
            {!!bindings[0]["definition"] &&
              <Box marginTop={1}>
                {bindings[0]["definition"].value}
              </Box>
            }
          </Typography>
        </Box>
        <Divider/>
      </Box>
    )
  }
}