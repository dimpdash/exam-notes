import { createSingle, Action,  } from "context-class";
import { ToolTypes } from "../interfaces/ToolTypes";


export class ToolState extends Action<ToolState> {
    public size: number = 24;
    public color: string = "black";
    public toolType: ToolTypes = ToolTypes.Pen;

    public setTool(toolType:ToolTypes){
        this.merge({toolType});
    }

    public setSize(size: number){
        this.merge({size});
    }

    public setColor(color:string){
        this.merge({color});
    }

    private merge(newData:any){
        console.log(newData)
        this.setState((prev:ToolState)=>{ 
            console.log(prev)
            return{...prev, ...newData} as ToolState});
    }
}


export const [PenContextProvider, usePenContext] = createSingle(new ToolState());

