import {Virtuoso} from "react-virtuoso";
import {Bindings} from "sfs-api";
import {useFacetSearch} from "react-sfs";

import {
  Box,
  LinearProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import {sfsApi} from "../config/FacetSearchConfig";


export function ResultsTableComponent() {

  const {
    results,
    isFetching,
  } = useFacetSearch(sfsApi);

  return (
    <Box>
      <Box visibility={isFetching ? "visible" : "hidden"}>
        <LinearProgress/>
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                Writer
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results &&
              <Virtuoso
                style={{height: '95vh'}}
                data={results.bindings}
                itemContent={ResultsRow}
              />
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  function ResultsRow(index: number, bindings: Bindings) {
    return (
      <TableRow key={bindings["_id"].value}>
        <TableCell>
          <Link href={bindings["_id"].value} target="_blank">
            {bindings["_label"].value}
          </Link>
        </TableCell>
      </TableRow>
    )
  }
}