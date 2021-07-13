class Line{

    constructor(x1, y1, x2, y2, color = 'black'){
        this.x1 = x1; 
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.color = color;
    }

    get(){
        return (
            <line x1={this.x1} y1={this.y1} x2={this.x2} y2={this.y2} stroke={this.color}/>
        )
    }
}

export default Line;