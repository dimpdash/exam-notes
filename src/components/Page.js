import Canvas from "./Canvas"
import React, {useEffect, useState} from "react";
import Path from "../classes/Path";
import Line from "../classes/Line";
import RBush from "rbush";
import styles from './styles.module.css'
import { usePenContext } from "../contexts/PenContext";
import {PenTool, EraserTool} from '../classes/PenTool';

export function rollingAverage(points,i,N){
    let n = i-N >= 0 ? N : i+1
    let subset = points.slice(i+1-n,i+1);
    
    let x = subset.reduce( (m,e) => {
        return m + (e.x - m)/n;
    }, 0)

    let y = subset.reduce( (m,e) => {
        return m + (e.y - m)/n;
    }, 0)

    return {x:x, y:y};
}

function getPos(pointerEvt){
    return {x:Math.floor(pointerEvt.offsetX), y:Math.floor(pointerEvt.offsetY)}
}


const DISTANCE_OF_NEXT_POINT_SQUARED = 5**2;
const tree = new RBush();

const savePointsToTree = (points, lines) => {
    tree.load(points.map( (p) => {
        let item = {};
        item.line = lines;
        item.minX = p.x;
        item.maxX = p.x;
        item.maxY = p.y;
        item.minY = p.y;
        return item;
    }));
}

const mm = 2;


const Page = (props) => {
    const penContext = usePenContext();
   

    let newPath = [];
    let currentLineId;


    
    function penMove(e){
        // console.log(e.buttons);
        if(e.buttons === 1){
            // console.log(e);
            e.nativeEvent.preventDefault() // prevent scrolling when inside DIV
            let pointerEvt = e.nativeEvent;
            // console.log(points[-1])
            if (!points[points.length-1] || DISTANCE_OF_NEXT_POINT_SQUARED < distSquared(points[points.length-1], getPos(pointerEvt))){
                let old_lines = elements.slice();
                let newPoints = points.slice();
                newPoints.push(getPos(pointerEvt));
                // console.log(newPoints);
                setPoints(newPoints);
                
                // console.log(old_lines.length, currentLine);
                // console.log(old_lines);
                if (elements.length > count){
                    old_lines[old_lines.length - 1] = bzCurve(newPoints)
                    // console.log(old_lines);
                    setElements(old_lines);
                }
                else {
                    currentLineId = count;
                    old_lines.push(bzCurve(newPoints))
                    setElements(old_lines);
                }
            }
            // console.log(lines);
        }
    }

    function distSquared(p1,p2){
        return (p1.x-p2.x)**2 + (p2.y-p1.y)**2;
    }

    function gradient(a, b) {
        return (b.y-a.y)/(b.x-a.x);
    }
    
    function bzCurve(points, f, t) {
        if (typeof(f) == 'undefined') f = 0;
        if (typeof(t) == 'undefined') t = 1;
        
        let line = new Path(count);
        line.color = penContext.color;
        line.width = penContext.size;
        
        line.moveTo(points[0].x, points[0].y);
        
        var m = 0;
        var dx1 = 0;
        var dy1 = 0;
        let dx2;
        let dy2;
    
        var preP = points[0];
        let N=1
        for (var i = 1; i < points.length; i+=N) {
            // var curP = rollingAverage(points,i,N);
            // let nexP = rollingAverage(points,i,N);
            let curP = points[i];
            let nexP = points[i+1];
            if(!nexP){
                dx2 = 0;
                dy2 = 0;
            } else if (!preP){
                dx2 = 0;
                dy2 = 0;
            }
            else if (nexP.x != preP.x) {
                m = gradient(preP, nexP);
                dx2 = (nexP.x - curP.x) * -f;
                dy2 = dx2 * m * t;
            } else {
                dx2 = 0;
                dy2 = (nexP.y - curP.y) *-f * t;
            }
                
            line.bezierLineTo(
                Math.floor(preP.x - dx1), Math.floor(preP.y - dy1),
                Math.floor(curP.x + dx2), Math.floor(curP.y + dy2),
                curP.x, curP.y
            );
            
            dx1 = dx2;
            dy1 = dy2;
            preP = curP;
        }
        return line.getPath(count);
    }

    

    //Set state hooks
    
    // const [elements, setElements] = useState([]);
    const page = props.page; 
    const elements = page.elements;
    const [count, setCount] = useState(elements.length)
    
    const [points, setPoints] = useState([]);

    const preventTouch = props.preventTouch;
    const setPage = props.setPage;

    const setElements = (elements)=>{
        let newPage = { ...page };
        newPage.elements = elements;
        setPage(newPage);
    }

    let tool = undefined;
    if(penContext.toolType === 'pen'){
        tool = new PenTool(setPoints,savePointsToTree, setCount,penMove, setElements);
    }else{
        tool = new EraserTool(setPoints,savePointsToTree, setCount,penMove, setElements);
    }
    const divStyle = {
        'height': props.page.height,
        'width': props.page.width,
        'position': 'relative'
    }
    
    tool.count = count;
    tool.points = points;
    tool.tree = tree;
    tool.elements = elements;


    return (
        <div className={styles.page} styles={{width: props.page.width, height: props.page.height}}>
            <Canvas background={page.background} elements={page.elements} 
            onPointerMove={(e)=>tool.pointerMove(e)} 
            onPointerDown={(e)=>tool.pointerDown(e)} 
            onPointerUp={(e)=>tool.pointerUp(e)}
            onMouseMove={(e) => console.log(e.button, e.buttons)}
            width={props.page.width}
            height={props.page.height}
            viewBox="0 0">
            
            </Canvas>
        </div>
    );
};

export default Page;