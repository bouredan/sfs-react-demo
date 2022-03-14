import {Facet, FacetConfig} from "@bouredan/sfs-api";

export class CustomFacet extends Facet<string> {

  public constructor({id, predicate, initialValue}: Omit<FacetConfig<string>, "type">) {
    // TODO change type to "custom"
    super({type: "select", id, predicate, initialValue});
  }

  public generateSparql(): string {
    const whereClause = `BIND(<${this.value}> AS ?${this.id})
                         ?id ${this.predicate} <${this.value}> . `
    return (
      `${this.value ? whereClause : ""}
      OPTIONAL { 
        ?id ${this.predicate} ?${this.id} . 
      }`
    );
  }
}