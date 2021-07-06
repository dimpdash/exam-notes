import {rollingAverage} from '../components/Page';

test('rolling average', () => {
    let points = [
        {x:0,y:0},
        {x:30,y:10},
        {x:20,y:20},
        {x:100,y:100}
    ];
    expect(rollingAverage(points,1,3)).toEqual({x:15,y:5});
})