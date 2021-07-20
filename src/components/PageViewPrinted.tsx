import React from 'react'
import Page from './Page';
import Pageable from '../interfaces/Page';
import { Component } from 'react';
import {PageState} from '../contexts/PageContext';
import Canvas from './Canvas';
import "./Print.css";

type Props = {
    pages: (Pageable | undefined)[][],
}

export default class PageViewPrinted extends Component<Props,{}> {

    render(){
        let pageGrid = this.props.pages;

        const pages = pageGrid.flat();
    
        pages.filter((page: Pageable|undefined) => {
            return page != undefined;
        }) as Pageable[];

        const pageStyle ={
            'height': '100%',
            'width': '100%'
        }

        const children = pages.map((page) => {
                let style = {

                }
                if(page){
                        return (
                            <div className="page">
                                <Canvas 
                                    width={"100%"} 
                                    height={"100%"}
                                    viewBox={`0 0 ${210*2} ${297*2}`} 
                                    elements={page.elements} 
                                    background={page.background} 
                                    divStyle={pageStyle}>
                                    {/* <style>{"@media { margin: 0 0 0 0; size 297mm 210mm}"}</style> */}
                                </Canvas>
                                {/* <Page page={page} setPage={(p: Pageable) => {}} key={page.key}>
                                    
                                </Page> */}
                                {/* <div className="page-break"></div> */}
                            </div>
                        );
                    }
                }
            );

        return(
            <div>
                {children}
            </div>
        );
    }
}

// const divStyle = {
//     'height': '100%',
//     'width': canvasProps.width,
//     'position': 'relative'
// }

// return (
//     <div className={styles.page} styles={{width: canvasProps.width}}>
//         <Canvas {...canvasProps} divStyle={divStyle}  background={page.background} elements={page.elements} onPointerMove={onPointerMove} onPointerDown={onPointerDown} onPointerUp={onPointerUp}></Canvas>
//     </div>