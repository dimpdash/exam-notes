import { MapInteractionCSS } from '../external/react-map-interaction';
import Page from './Page';
import { useState } from 'react';
import {PageDivider} from './PageDivider'
import { PageContextProvider, usePageContext } from "../contexts/PageContext";

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
        e.stopPropagation();
    }

    let columnSize = Math.max(...pages.map(row=>row.length));
    console.log(columnSize)
    let children = pages.map((row, r)=>
         [ 
            <tr>
                {Array(columnSize).fill(1).map((_,c)=>[
                    <td></td>,
                    <td> {(pages[r][c] || (r>0 && pages[r-1][c])) && <PageDivider isHorizontal={true} onClick={(e) => pageContext.addPageAt(c,r, true)}/>}</td>,
                ]
                ).concat()}
            </tr> ,
         <tr>
            {
                row.map((page,c)=>
                [
                c===0 && <td> { pages[r][c] && <PageDivider isHorizontal={true} onClick={(e) => pageContext.addPageAt(c,r, false)}/> }</td>,
                <td>{page && <Page {...props} page={pageContext.getPageCR(c,r)} setPage={(page) => pageContext.setPage(c,r,page)} key={page.key}></Page> }</td>,
                <td>{(pages[r][c] || (c<row.length && pages[r][c+1])) && <PageDivider isHorizontal={false}  onClick={(e) => pageContext.addPageAt(c+1,r, false)}/>}</td>
                   
                    // <table width="100%" style={{height:"100%"}}>
                    //     <tr>
                    //         <td></td>
                    //         <td> {(r==0) && <PageDivider isHorizontal={true} onClick={(e) => pageContext.addPageAt(c,r, true)}/>}</td>
                    //         <td></td>
                    //     </tr>
                    //     <tr>
                    //         <td> {(c==0) &&<PageDivider isHorizontal={false}  onClick={(e) => pageContext.addPageAt(c,r, false)}/>}</td> 
                    //         <td>  {page && <Page {...props} page={pageContext.getPageCR(c,r)} setPage={(page) => pageContext.setPage(c,r,page)} key={page.key}></Page> }</td>
                    //         <td > {(page || !pages[r][c+1]) && <PageDivider isHorizontal={false}  onClick={(e) => pageContext.addPageAt(c+1,r, false)}/> } </td>
                    //     </tr>
                    //     <tr>
                    //         <td></td>
                    //         <td  ><PageDivider isHorizontal={true} onClick={(e) => pageContext.addPageAt(c,r+1, true)}/></td>
                    //         <td></td>
                    //     </tr>
                    
                    //  </table>
                    
                ]
                ).concat()
            }
        </tr>,
        r === pages.length-1 && <tr>
        {Array(columnSize).fill(1).map((_,c)=>[
            <td></td>,
            <td> {pages[r][c] && <PageDivider isHorizontal={true} onClick={(e) => pageContext.addPageAt(c,r+1, true)}/>}</td>,
        ]
        ).concat()}
        </tr>
    ]
    ).concat();

    // pages.forEach(({key}, index)=>{
        
        

    //     children.push(<Page {...props} page={pageContext.getPage(key)} setPage={(page) => pageContext.setPage(key,page)} key={key}></Page>);
    //     if(index !== children.length)
    //         children.push(<PageDivider onClick={(e) => pageContext.addPageAt(index+1)}/>);
    // })

    return (
        //TODO allow users to add pages horizontally
        <div  style={{'touch-action': 'auto', "text-align": "left"}} onWheel={preventScroll} onTouchStart={preventPenEvent} onTouchEnd={(e) =>  preventPenEvent(e)} onTouchMove={(e) =>  preventPenEvent(e)} onPointerMove={onPointerMove} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
             <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                 <div>
            <MapInteractionCSS class="App"  onWheel={preventScroll}>
            <table>
                {children}  
                </table>
            </MapInteractionCSS>
            </div>
            </div>    
        </div>   

    )
}

export default PageView;