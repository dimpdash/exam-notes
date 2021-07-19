import Canvas from "./Canvas"
import React, {useEffect, useState} from "react";
import Path from "../classes/Path";
import Line from "../classes/Line";
import RBush from "rbush";
import styles from './styles.module.css'
import { usePenContext } from "../contexts/PenContext";

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

const Background = (props) => {
    console.log(props.canvas.width)
    let lines = []
    

    let spacing = 10*mm
    let numOfLines = Math.floor(props.canvas.height / spacing)
    console.log(numOfLines)
    for(let i = 0; i < numOfLines; i++){
        let line = new Line(0, spacing*(i+1), props.canvas.width, spacing*(i+1), 'blue');
        lines.push(line)
    }
    
    return lines.map( l => l.get());
}

const Page = (props) => {
    const penContext = usePenContext();
    let tool = penContext.toolType;
    let newPath = [];
    let currentLineId;



    
    function penMove(e){
        
        console.log(e.buttons);
        if(e.buttons === 1){
            console.log(e);
            e.nativeEvent.preventDefault() // prevent scrolling when inside DIV
            let pointerEvt = e.nativeEvent;
            // console.log(points[-1])
            if (!points[points.length-1] || DISTANCE_OF_NEXT_POINT_SQUARED < distSquared(points[points.length-1], getPos(pointerEvt))){
                let old_lines = lines.slice();
                let newPoints = points.slice();
                newPoints.push(getPos(pointerEvt));
                // console.log(newPoints);
                setPoints(newPoints);
                
                // console.log(old_lines.length, currentLine);
                // console.log(old_lines);
                if (lines.length > count){
                    old_lines[old_lines.length - 1] = bzCurve(newPoints)
                    // console.log(old_lines);
                    setLines(old_lines);
                }
                else {
                    currentLineId = count;
                    old_lines.push(bzCurve(newPoints))
                    setLines(old_lines);
                }
            }
            // console.log(lines);
        }
    }

    function erase(pointerEvt){
        console.log(getPos(pointerEvt));
        let p = getPos(pointerEvt);
        let box = {};
        box.minX = p.x - 20;
        box.maxX = p.x + 20;
        box.minY = p.y - 20;
        box.maxY = p.y + 20;
        let result = tree.search(box);
        console.log(tree.all());
        console.log(result);
        console.log(lines)
        let newLines = lines.slice();
        result.forEach( (p) => {
            tree.remove(p);
            newLines[p.line] = undefined;
        });
        setLines(newLines);
    }

    function distSquared(p1,p2){
        return (p1.x-p2.x)**2 + (p2.y-p1.y)**2;
    }


    const onPointerMove = (e) => {
        // e.preventDefault()
        // e.stopPropagation();
        // console.log(e)
        let pointerEvt = e.nativeEvent;
        // pointerEvt.preventDefault();
        // pointerEvt.stopPropagation();
        if (e.pointerType === "pen"){
            console.log("move here")
            pointerEvt.target.setPointerCapture(pointerEvt.pointerId)
            if (tool == "pen"){
                penMove(e);
            } else if (tool === "eraser") {
                if (e.buttons == 1){
                    erase(pointerEvt);
                }
            }
        }
    };

    const onPointerDown = (e) => {
        // e.preventDefault()
        // e.stopPropagation();
        let pointerEvt = e.nativeEvent;
        // pointerEvt.preventDefault();
        // pointerEvt.stopPropagation();
        if (e.pointerType == "pen"){
            console.log('here');
            pointerEvt.target.setPointerCapture(pointerEvt.pointerId)
            if (tool == "pen"){
                console.log(lines);
                setPoints([]);
                points.push(getPos(pointerEvt));
            } else if (tool == "eraser") {
                erase(pointerEvt);
            }
        }
    };

    const onPointerUp = (e) => {
        // e.preventDefault()
        // e.stopPropagation();
        //save to tree
        if (e.pointerType == "pen"){
            if (tool == "pen"){
                    savePointsToTree(points, count);

                    setCount(count + 1);
                    console.log(count);
                    setPoints([]);
            }
        }


    };


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
    
    const [lines, setLines] = useState([]);
    const [count, setCount] = useState(lines.length)
    
    const [points, setPoints] = useState([]);

    let canvasProps = {
        lines: lines,
        width: 210*mm,
        height: 297*mm,
        Background: Background

    }
    const preventTouch = props.preventTouch;
    return (
        <div className={styles.page} styles={{width: canvasProps.width}}>
            <Canvas {...canvasProps} onPointerMove={onPointerMove} onPointerDown={onPointerDown} onPointerUp={onPointerUp}></Canvas>
        </div>
    );
};

export default Page;