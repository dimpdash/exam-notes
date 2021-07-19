import { MapInteractionCSS } from 'react-map-interaction';
import Page from './Page';
import { useState } from 'react';
import {PageDivider} from './PageDivider'
let onlyOneTouch = true;




const PageView = (props) => {
    let [pages, setPages] = useState([
        {key:0},
        {key:1},
        {key:2},
        {key:3}
    ]);

    let [nextId, setNextId] = useState(4);

    let pointerType = null;

    const onPointerMove = (e) => {
        pointerType = e.pointerType
    }

    const onPointerUp = (e) => {
        pointerType = e.pointerType
    }
    

    // onPointerDown seems to be triggered before onTouchStart so can pass the pointer type to touch start event to discriminate touch events between finger and stylus
    const onPointerDown = (e) => {
        pointerType = e.pointerType
    }

    function preventPenEvent(e){
        if(pointerType == "pen"){
            e.stopPropagation();
        }
    }

    const getNewPageKey = ()=>{
        setNextId(nextId+1);
        return nextId;
    }

    const addPageAt = (pageNumber)=>()=>setPages(prev=>{
        let data = [...prev];
        data.splice(pageNumber,0,{key: getNewPageKey()});
        return data;
    });

    const children = [];
    pages.forEach(({key}, index)=>{
        children.push(<Page {...props} key={key}></Page>);
        if(index !== children.length)
            children.push(<PageDivider onClick={addPageAt(index+1)}/>);
    })

    return (
        //TODO allow users to add pages horizontally
        <div  style={{'touch-action': 'auto'}} onTouchStart={preventPenEvent} onTouchEnd={(e) =>  preventPenEvent(e)} onTouchMove={(e) =>  preventPenEvent(e)} onPointerMove={onPointerMove} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <MapInteractionCSS>
                {children}                
            </MapInteractionCSS>
        </div>   
    )
}

export default PageView;