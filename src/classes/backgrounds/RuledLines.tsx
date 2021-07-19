import Line from "../Line";
import Page from "../../interfaces/Page";

const background = (width: number, height: number, spacing:number) => {
    // console.log(props.canvas.width)
    let lines = []
    
    let numOfLines = Math.floor(height / spacing)
    // console.log(numOfLines)
    for(let i = 0; i < numOfLines; i++){
        let line = new Line(0, spacing*(i+1), width, spacing*(i+1), 'blue');
        lines.push(line)
    }
    
    return lines.map( l => l.get());
}

export default background;