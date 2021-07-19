import { MapInteractionCSS } from 'react-map-interaction';
import Page from './Page';
import { useState } from 'react';
import {PageDivider} from './PageDivider'
import { usePageContext } from "../contexts/PageContext";

let onlyOneTouch = true;

const PageView = (props) => {
    const pageContext = usePageContext();
    let pages = pageContext.pages;

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

    function preventScroll(e){
        console.log(e);
        e.stopPropagation();
    }

    const children = [];
    pages.forEach(({key}, index)=>{
        children.push(<Page {...props} key={key}></Page>);
        if(index !== children.length)
            children.push(<PageDivider onClick={(e) => pageContext.addPageAt(index+1)}/>);
    })

    return (
        //TODO allow users to add pages horizontally
        //text-align must be left otherwize zooming does not properly occur
        <div  style={{'touch-action': 'auto', "text-align": "left"}} onWheel={preventScroll} onTouchStart={preventPenEvent} onTouchEnd={(e) =>  preventPenEvent(e)} onTouchMove={(e) =>  preventPenEvent(e)} onPointerMove={onPointerMove} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <MapInteractionCSS onWheel={preventScroll}>
                {children}                
            </MapInteractionCSS>
        </div>   

    )
}

export default PageView;