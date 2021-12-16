import {useEffect, useState} from "react";
import {IBindings} from "fetch-sparql-endpoint";
import {VariableTerm} from "sparqljs";

import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

import {SelectFacetComponent} from "./SelectFacetComponent";
import {FacetSearchApi} from "../api/FacetSearchApi";
import {FacetConfig} from "../api/Facet";
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

const facets = [birthPlaceFacet, genreFacet];

export function FacetSearch() {

  const [variables, setVariables] = useState<VariableTerm[]>([]);
  const [bindings, setBindings] = useState<IBindings[]>([]);

  useEffect(() => {
    const facetSearchApi = new FacetSearchApi({
      endpointUrl: "https://dbpedia.org/sparql",
      facetConfigs: facets,
      prefixes: `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX dbp: <http://dbpedia.org/property/>
        PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      `
    });
    //facetSearchApi.setValue(birthPlaceFacet.id, "<http://dbpedia.org/resource/UAE>");
    facetSearchApi.fetchResults()
      .then(({variables, bindings}) => {
        setVariables(variables);
        setBindings(bindings);
      })
  }, []);

  return (
    <div>
      <SelectFacetComponent facet={birthPlaceFacet} options={bindings}/>
      <CheckboxFacetComponent facet={genreFacet} options={bindings}/>
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
    </div>
  );
}
