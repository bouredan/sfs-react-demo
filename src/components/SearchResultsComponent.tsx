import {useEffect, useState} from "react";
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
import {Results} from "@bouredan/sfs-api";

import {sfsApi} from "../config/FacetSearchConfig";


export function SearchResultsComponent() {

  const [results, setResults] = useState<Results>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    sfsApi.attachResultsSubscriber(setResults);
    setIsFetching(true);
    sfsApi.fetchResults()
      .then(() => setIsFetching(false));
  }, []);

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
                Pojem
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!results && results.bindings.map(bindings => (
              <TableRow key={bindings.id.value}>
                <TableCell>
                  <Link href={bindings.id.value}>
                    {bindings.label.value}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}