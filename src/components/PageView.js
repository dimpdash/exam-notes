import { MapInteractionCSS } from 'react-map-interaction';
import InfiniteScroll from 'react-infinite-scroll-component';
import Page from './Page';
import { useState } from 'react';
import {MapInteractionControlled} from 'react-map-interaction/src/MapInteraction'

class Zoomable extends MapInteractionControlled {
}



let onlyOneTouch = true;


const PageView = (props) => {

    let storedPages = [<Page {...props}></Page>, <Page {...props}></Page>, <Page {...props}></Page>, <Page {...props}></Page>]

    function getStoredPages(from, to){
        return storedPages.splice(from,to);
    }

    const [items, setItems] = useState([<Page {...props}></Page>, <Page {...props}></Page>, <Page {...props}></Page>, <Page {...props}></Page>])
    const fetchData = () => {
        console.log("bottom");
        let oldItems = items.slice();
        oldItems.push(<Page {...props}></Page>);
        setItems(oldItems);
    };

    const [infScrollStyle, setScrollStyle] = useState({'touch-action': 'none'});

    const pos = {x: null, y: null, numOfActivePointers: 0}
    

    const onPointerMove = (e) => {
        let pointerEvt = e.nativeEvent;
        
        if (pointerEvt.pointerType == "touch" && pos.numOfActivePointers == 1){
            if(pos.x != null && pos.y != null){
                window.scrollBy(e.clientX-pos.x, e.clientY-pos.y)
            }
            
            pos.x = e.clientX;
            pos.y = e.clientY;
            
        } else {
            // also nothing
        }
    }

    const onPointerUp = (e) => {
        let pointerEvt = e.nativeEvent;
        if (pointerEvt.pointerType == "touch"){
            // console.log("Finger up");
            pos.x = null;
            pos.y = null;
            pos.numOfActivePointers--;
        }
    }

    const onPointerDown = (e) => {
        //TODO have scroll decay
        let pointerEvt = e.nativeEvent;
        if (pointerEvt.pointerType == "touch"){
            // console.log("Finger down");
            pos.x = e.clientX;
            pos.y = e.clientY;
            pos.numOfActivePointers++;
        }
    }

    return (
        // onPointerMove={onPointerMove} onPointerDown={onPointerDown} onPointerUp={onPointerUp}
        <div  style={{'touch-action': 'none'}}>
            <MapInteractionCSS>
                {/* <InfiniteScroll
                    style={infScrollStyle}
                    dataLength={items.length} //This is important field to render the next data
                    next={fetchData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    }
                    // below props only if you need pull down functionality
                    refreshFunction={() => null}
                    pullDownToRefresh
                    // pullDownToRefreshThreshold={50
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    }
                    >
                    {items}
                </InfiniteScroll>      */}
                <Page {...props}></Page>
                <Page {...props}></Page>
                <Page {...props}></Page>
                <Page {...props}></Page>
            </MapInteractionCSS>
        </div>   
    )
}

export default PageView;