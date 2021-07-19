import React from "react";
import { TupleType } from "typescript";
import Line from "../classes/Line";
import Element from "./Element";

export default interface Page{
    // line: Line[]
    key: number,
    elements: Element[],
    background: React.SVGProps<SVGElement>[],
    width: number,
    height: number,
}
