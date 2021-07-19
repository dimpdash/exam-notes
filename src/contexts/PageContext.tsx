import { createSingle, Action,  } from "context-class";
import Page from "../interfaces/Page";

export class PageState extends Action<PageState> {
    public title: string = "Untitled Document";
    public pages: Page[] = [
        {key:0, elements: [], background: []},
        {key:1, elements: [], background: []},
        {key:2, elements: [], background: []}
    ]; //TODO agree that data structure is good type for pages

    private keyMap = new Map(); 
    private nextId: number = this.pages.length + 1;

    public setPages(pages:Page[]){
        this.merge({pages})
    }

    public setPage(key: number, page: Page){
        // console.log(this);
        let pages = this.pages.slice();
        pages[key] = page; 
        this.setPages(pages);
    }


    private getNewPageKey = ()=>{
        this.nextId++;
        return this.nextId;
    }

    public addPageAt(pageNumber: number){
        //Duplicate pages
        let pages = this.pages.slice(); 
        pages.splice(pageNumber,0,{key: this.getNewPageKey(), elements: [], background: []});
        this.setPages(pages)
        return pages;
    }

    public getIndex(key: number): number{
        for(let i = 0; i<this.pages.length; i++){
            if(this.pages[i].key == key){
                return i;
            }
        }
        throw console.exception("Key not in pages");
    }

    public getPage(key: number) : Page{
        let i = this.getIndex(key);
        return this.pages[i];
    }

    private merge(newData:any){
        // console.log(newData)
        this.setState((prev:PageState)=>{ 
            // console.log(prev)
            return{...prev, ...newData} as PageState});
    }
}


export const [PageContextProvider, usePageContext] = createSingle(new PageState);

