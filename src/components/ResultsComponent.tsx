import {CSSProperties} from "react";
import {FixedSizeList} from "react-window";
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

import {sfsApiDbpedia} from "../config/FacetSearchConfig";


export function ResultsComponent() {

  const {
    results,
    isFetching,
  } = useFacetSearch(sfsApiDbpedia);

  const renderRow = ({index, style}: {index: number, style: CSSProperties}) => {
    if (!results) {
      return null;
    }
    const bindings = results.bindings[index];
    return (
      <TableRow key={bindings["_id"].value} style={style}>
        <TableCell>
          <Link href={bindings["_id"].value} target="_blank">
            {bindings["_label"].value}
          </Link>
        </TableCell>
      </TableRow>
    )
  }

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
              <FixedSizeList
                height={1000}
                itemCount={results.bindings.length}
                itemSize={35}
                width={"100%"}
                overscanCount={5}
              >
                {renderRow}
              </FixedSizeList>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}