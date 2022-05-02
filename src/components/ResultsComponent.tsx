import {Virtuoso} from "react-virtuoso";
import {Bindings} from "sfs-api";
import {useFacetSearch} from "react-sfs";

import {Box, Divider, LinearProgress, Link, Typography} from "@mui/material";

import {sfsApi} from "../config/FacetSearchConfig";


export function ResultsComponent() {

  const {
    results,
    isFetching,
  } = useFacetSearch(sfsApi);

  return (
    <Box>
      <Box visibility={isFetching ? "visible" : "hidden"}>
        <LinearProgress/>
      </Box>
      <Box>
        {!!results &&
          <Virtuoso
            style={{height: '95vh'}}
            data={results.bindings}
            itemContent={ResultRow}
          />}
      </Box>
    </Box>
  );

  function ResultRow(index: number, bindings: Bindings) {
    return (
      <Box key={index}>
        <Box padding={1}>
          <Typography variant="h6">
            <Link href={bindings["_id"].value} target="_blank">
              {bindings["_label"].value}
            </Link>
          </Typography>
          <Typography variant="body2" component="div">
            {!!bindings["schemeId"] &&
              <Box>
                z glosáře&nbsp;
                <Link href={bindings["schemeId"].value} target="_blank">
                  {bindings["schemeLabel"].value}
                </Link>
              </Box>
            }
            {!!bindings["typeId"] &&
              <Box>
                je typu&nbsp;
                <Link href={bindings["typeId"].value} target="_blank">
                  {bindings["typeLabel"].value}
                </Link>
              </Box>
            }
            {!!bindings["superClassId"] &&
              <Box>
                a podtřídou&nbsp;
                <Link href={bindings["superClassId"].value} target="_blank">
                  {bindings["superClassLabel"].value}
                </Link>
              </Box>
            }
            {!!bindings["definition"] &&
              <Box marginTop={1}>
                {bindings["definition"].value}
              </Box>
            }
          </Typography>
        </Box>
        <Divider/>
      </Box>
    )
  }
}