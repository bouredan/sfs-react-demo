import {useFacetSearch} from "../tmp/SfsContext";

import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

export function SearchResultsComponent() {

  const {searchResults} = useFacetSearch();

  if (!searchResults) {
    return <div/>;
  }

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {searchResults.variables.map((variable, index) => (
            <TableCell key={index}>{variable.value}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {searchResults.bindings.map((row, index) => (
          <TableRow key={index}>
            {Object.entries(row).map(entry => (
              <TableCell key={`${index + entry[0]}`}>{entry[1].value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}