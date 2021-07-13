import { MapInteractionCSS } from 'react-map-interaction';
import Page from './Page';
import { useState } from 'react';

let onlyOneTouch = true;


const PageView = (props) => {
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

    return (
        //TODO allow users to add pages horizontally and vertically
        <div  style={{'touch-action': 'auto'}} onTouchStart={preventPenEvent} onTouchEnd={(e) =>  preventPenEvent(e)} onTouchMove={(e) =>  preventPenEvent(e)} onPointerMove={onPointerMove} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <MapInteractionCSS>
                <Page {...props}></Page>
                <Page {...props}></Page>
                <Page {...props}></Page>
                <Page {...props}></Page>
                
            </MapInteractionCSS>
        </div>   
    )
}

export default PageView;