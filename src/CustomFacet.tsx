import {Facet} from "@bouredan/sfs-api/dist";

export class CustomFacet extends Facet {
    public generateSparql(): string {
        throw new Error("Method not implemented.");
    }
}