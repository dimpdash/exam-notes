import React from 'react';

export class Tool{
    public pointerDown(e:React.PointerEvent<SVGSVGElement>){}
    public pointerUp(e:React.PointerEvent<SVGSVGElement>){}
    public pointerMove(e:React.PointerEvent<SVGSVGElement>){}
    public setPoints: (points: any[])=>void;
    public savePointsToTree:(points:any[], count:number)=>void;
    public setElements:(elements:any[])=>void;
    public setCount: (e:any)=>void;
    public penMove: (e:any)=>void;
    public points: any[] = [];
    public elements: any[] = [];
    public tree: any;
    public count: number = 0;
    public getPos(pointerEvt:any){
        return {x:Math.floor(pointerEvt.offsetX), y:Math.floor(pointerEvt.offsetY)}
    }


    constructor(setPoints:(points: any[])=>void, 
    savePointsToTree:(points:any[], count:number)=>void, 
    setCount: (count:number)=>void,
    penMove: (e:any)=>void,
    setElements:(elements:any[])=>void){
        this.setPoints = setPoints;
        this.savePointsToTree = savePointsToTree;
        this.setCount = setCount;
        this.penMove = penMove;
        this.setElements = setElements;
    }
    
}

export class PenTool extends Tool{

    constructor(setPoints:(points: any[])=>void, 
    savePointsToTree:(points:any[], count:number)=>void, 
    setCount: (count:number)=>void,
    penMove: (e:any)=>void,
    setElements:(elements:any[])=>void){
        super(setPoints,savePointsToTree, setCount,penMove, setElements);
    }

    public pointerDown(e:React.PointerEvent<SVGSVGElement>){
        console.log(e);
        let pointerEvt = e.nativeEvent;
        if(pointerEvt?.target){
            if (e.pointerType == "pen"){
                //@ts-ignore
                pointerEvt.target.setPointerCapture(pointerEvt.pointerId);
                this.points.push(this.getPos(pointerEvt));
            }
        }
    }
    public pointerUp(e:React.PointerEvent<SVGSVGElement>){
        if (e.pointerType == "pen"){
                    this.savePointsToTree(this.points, this.count);

                    this.setCount((prev:number)=>prev+ 1);
                    this.setPoints([]);
        }
    }
    public pointerMove(e:React.PointerEvent<SVGSVGElement>){
        let pointerEvt = e.nativeEvent;
        if(pointerEvt?.target){
            if (e.pointerType === "pen"){
                // console.log("move here")
                //@ts-ignore
                pointerEvt.target.setPointerCapture(pointerEvt.pointerId)
                this.penMove(e);
            }
        }
    }
}

export class EraserTool extends Tool{

    constructor(setPoints:(points: any[])=>void, 
    savePointsToTree:(points:any[], count:number)=>void, 
    setCount: (count:number)=>void,
    penMove: (e:any)=>void,
    setElements:(elements:any[])=>void){
        super(setPoints,savePointsToTree, setCount,penMove, setElements);
    }

    public erase(pointerEvt:any){
        // console.log(getPos(pointerEvt));
        let p = this.getPos(pointerEvt);
        let box :any = {};
        box.minX = p.x - 20;
        box.maxX = p.x + 20;
        box.minY = p.y - 20;
        box.maxY = p.y + 20;
        let result = this.tree.search(box);
        // console.log(tree.all());
        // console.log(result);
        // console.log(elements)
        let newLines = this.elements.slice();
        result.forEach( (p:any) => {
            this.tree.remove(p);
            newLines[p.line] = undefined;
        });
        this.setElements(newLines);
    }

    public pointerDown(e:React.PointerEvent<SVGSVGElement>){
        let pointerEvt = e.nativeEvent;
        if(pointerEvt?.target){
            if (e.pointerType == "pen"){
                this.erase(pointerEvt);
            }
        }
    }

    public pointerMove(e:React.PointerEvent<SVGSVGElement>){
        let pointerEvt = e.nativeEvent;
        if(pointerEvt?.target){
            if (e.pointerType === "pen"){
                if (e.buttons == 1){
                    this.erase(pointerEvt);
                }
            }
        }
    }
}