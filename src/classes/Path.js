export default class Path{
    points = [];
    path;
    segments = [];
    color = "black";
    points = [];
    width = 5;
    constructor(lineId = 0){
        this.id = lineId;
    }

    moveTo(x,y){
        this.segments.push(`M ${x} ${y} `);
        this.points.push({x:x, y:y, color:this.color});
    }

    bezierLineTo(x1, y1, x2, y2, x, y){
        this.segments.push(`C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y} `);
        this.points.push({x:x, y:y, color: "red"});
    }

    getd(){
        return ''.concat(...this.segments);
    }

drawDots(){
        return this.points.map( (p) => {
            return <circle cx={p.x} cy={p.y} r="2" stroke="black" stroke-width="1" fill={p.color} />
        })
    }

    getPath(){
        return (
            <g>
            <path key={this.lineId} d={this.getd()} strokeWidth={this.width} stroke={this.color} fill="transparent"/>
            {/* {this.drawDots()} */}
            </g>
            /* 
            </div> */
            // {
            //     this.segments.map( (seg) => {
            //         return <circle cx={seg.} cy={} r="10" stroke="black" stroke-width="3" fill="red" />
            //     })
            // }
        );
    }
}