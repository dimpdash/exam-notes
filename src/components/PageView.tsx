import { MapInteractionCSS } from '../external/react-map-interaction';
import Page from './Page';
import React, { useState } from 'react';
import { PageDivider } from './PageDivider'
import { PageContextProvider, usePageContext } from "../contexts/PageContext";
//@ts-ignore
import { ContextMenu, MenuItem, ContextMenuTrigger } from "../external/react-contextmenu";
import IPage from '../interfaces/Page'
import { MenuList, Paper, MenuItem as MatMenuItem, Divider } from '@material-ui/core';

let onlyOneTouch = true;

interface PageControlProps {
    page?: IPage,
    c: number,
    r: number
}

function PageControl({ page, r, c }: PageControlProps) {


    const pageContext = usePageContext();

    return <div>



        <ContextMenuTrigger id={"Page Context Menu "} collect={() => { return { r, c, page } }}>


            {page && <Page page={pageContext.getPageCR(c, r)} setPage={(page: IPage) => pageContext.setPage(c, r, page)} key={page.key}></Page>}
        </ContextMenuTrigger>

    </div>
}

function PageTable() {
    const pageContext = usePageContext();
    let pages = pageContext.pages;

    let columnSize = Math.max(...pages.map(row => row.length));
    let children = pages.map((row, r) =>
        [
            <tr>
                {Array(columnSize).fill(1).map((_, c) => [
                    <td></td>,
                    <td> {(pages[r][c] || (r > 0 && pages[r - 1][c])) && <PageDivider isHorizontal={true} onClick={() => pageContext.addPageAt(c, r, true)} />}</td>,
                ]
                ).concat()}
            </tr>,
            <tr>
                {
                    row.map((page, c) =>
                        [
                            c === 0 && <td> {pages[r][c] && <PageDivider isHorizontal={false} onClick={() => pageContext.addPageAt(c, r, false)} />}</td>,
                            <td><PageControl c={c} r={r} page={pages[r][c]} /></td>,
                            <td>{(pages[r][c] || (c < row.length && pages[r][c + 1])) &&
                                <PageDivider isHorizontal={false} onClick={() => pageContext.addPageAt(c + 1, r, false)} />}
                            </td>
                        ]
                    ).concat()
                }
            </tr>,
            r === pages.length - 1 && <tr>
                {Array(columnSize).fill(1).map((_, c) => [
                    <td></td>,
                    <td> {pages[r][c] && <PageDivider isHorizontal={true} onClick={() => pageContext.addPageAt(c, r + 1, true)} />}</td>,
                ]
                ).concat()}
            </tr>
        ]
    ).concat();

    return <table>
        {children}
    </table>

}


const PageView = () => {
    const pageContext = usePageContext();

    const [pointerType, setPointerType] = useState<any>(undefined);
    const onPointerMove = (e: any) => {
        setPointerType(e.pointerType);
    }

    const onPointerUp = (e: any) => {
        setPointerType(e.pointerType);
    }


    // onPointerDown seems to be triggered before onTouchStart so can pass the pointer type to touch start event to discriminate touch events between finger and stylus
    const onPointerDown = (e: any) => {
        setPointerType(e.pointerType);
    }

    function preventPenEvent(e: any) {
        if (pointerType == "pen") {
            e.stopPropagation();
        }
    }

    function preventScroll(e: any) {
        e.stopPropagation();
    }


    const onDeleteUp = (e: any, { r, c }: { page: IPage, r: number, c: number }) => {
        pageContext.deletePageUp(c, r);
    }

    const onDeleteLeft = (e: any, { r, c }: { page: IPage, r: number, c: number }) => {
        pageContext.deletePageLeft(c, r);
    }

    const onDelete = (e: any, { r, c }: { page: IPage, r: number, c: number }) => {
        pageContext.deletePage(c, r);
    }

    return (
        <div style={{ touchAction: 'auto', textAlign: "left" }}
            onWheel={preventScroll}
            onTouchStart={preventPenEvent} onPointerDown={onPointerDown}
            onTouchMove={preventPenEvent}  onPointerMove={onPointerMove}
            onTouchEnd={preventPenEvent}   onPointerUp={onPointerUp} 
            
            >

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>

                    <MapInteractionCSS class="App" onWheel={preventScroll}>
                        <PageTable />
                    </MapInteractionCSS>

                    <ContextMenu id={"Page Context Menu "}>
                        <Paper>
                            <MenuList>
                            <MenuItem onClick={onDelete}>
                                <MatMenuItem>Delete</MatMenuItem>
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={onDeleteUp}>
                                <MatMenuItem>Delete, Move Up</MatMenuItem>
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={onDeleteLeft}>
                                <MatMenuItem>Delete, Move Left</MatMenuItem>
                            </MenuItem>
                            </MenuList>
                        </Paper>
                        
                    </ContextMenu>
                </div>
                </div>
            </div>

    )
}

export default PageView;