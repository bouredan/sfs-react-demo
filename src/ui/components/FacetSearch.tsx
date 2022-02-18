import {useEffect, useState} from "react";
import {IBindings} from "fetch-sparql-endpoint";
import {VariableTerm} from "sparqljs";
import {FacetSearchApi} from "sfs-api/api/FacetSearchApi";
import {FacetConfig} from "sfs-api/facets/Facet";

import {Button, Grid, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

import {SelectFacetComponent} from "./SelectFacetComponent";
import {CheckboxFacetComponent} from "./CheckboxFacetComponent";


const birthPlaceFacet: FacetConfig = {
  type: "select",
  id: "birthPlace",
  name: "Birth place",
  predicate: "dbp:birthPlace"
};

const genreFacet: FacetConfig = {
  type: "checkbox",
  id: "genre",
  name: "Genre",
  predicate: "dbp:genre"
};

const facetConfigs = [birthPlaceFacet, genreFacet];

export const sfsApi = new FacetSearchApi({
  endpointUrl: "https://dbpedia.org/sparql",
  facetConfigs: facetConfigs,
  prefixes: `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX dbp: <http://dbpedia.org/property/>
        PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      `
});

export function FacetSearch() {

  const [variables, setVariables] = useState<VariableTerm[]>([]);
  const [bindings, setBindings] = useState<IBindings[]>([]);

  const fetchResults = () => {
    return sfsApi.fetchResults()
      .then(({variables, bindings}) => {
        setVariables(variables);
        setBindings(bindings);
      });
  }

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <Grid container spacing={2} style={{padding: '16px'}}>
      <Grid item xs={3}>
        <SelectFacetComponent facet={birthPlaceFacet}/>
        <CheckboxFacetComponent facet={genreFacet}/>
        <div>
          <Button variant="outlined" onClick={fetchResults}>
            Fetch results
          </Button>
        </div>
      </Grid>
      <Grid item xs>
        <Table size="small">
          <TableHead>
            <TableRow>
              {variables.map((variable, index) => (
                <TableCell key={index}>{variable.value}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bindings.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(entry => (
                  <TableCell key={`${index + entry[0]}`}>{entry[1].value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}
