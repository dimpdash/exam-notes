import React from 'react'
import Page from './Page';
import Pageable from '../interfaces/Page';
import { Component } from 'react';
import {PageState} from '../contexts/PageContext';

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


        const children = pages.map((page) => {
                if(page){
                        return <Page 
                            page={page} 
                            setPage={(p: Pageable) => {}}
                            key={page.key}
                        />
                    }
                }
            );

        return(
            <div style={{display: "block"}}>
                {children}
                <p>hey</p>
            </div>
        );
    }
}