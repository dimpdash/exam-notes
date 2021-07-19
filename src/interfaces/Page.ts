import { TupleType } from "typescript";
import Line from "../classes/Line";
import Element from "./Element";

export default interface Page{
    // line: Line[]
    key: number,
    elements: Element[],
    background: Element[],
}
