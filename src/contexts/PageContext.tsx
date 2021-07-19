import { createSingle, Action,  } from "context-class";
import Page from "../interfaces/Page";


export class PageState extends Action<PageState> {
    public title: string = "Untitled Document";
    public pages: Page[] = [
        {key:0},
        {key:1},
        {key:2},
        {key:3},
        {key:4}
    ]; //TODO agree that data structure is good type for pages
    private nextId: number = this.pages.length;

    public setPages(pages:Page[]){
        this.merge({pages})
    }

    private getNewPageKey = ()=>{
        this.nextId++;
        return this.nextId;
    }

    public addPageAt(pageNumber: number){
        //Duplicate pages
        let pages = this.pages.slice(); 
        pages.splice(pageNumber,0,{key: this.getNewPageKey()});
        this.setPages(pages)
        return pages;
    }

    //TODO add helper functions like addPage

    private merge(newData:any){
        console.log(newData)
        this.setState((prev:PageState)=>{ 
            console.log(prev)
            return{...prev, ...newData} as PageState});
    }
}


export const [PageContextProvider, usePageContext] = createSingle(new PageState);

