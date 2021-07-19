import { createSingle, Action,  } from "context-class";
import Page from "../interfaces/Page";
import ruledLines from "../classes/backgrounds/RuledLines";

let tmpPage = {elements: [], background: ruledLines(210*2,297*2, 10*2), width: 210*2, height: 297*2};

export class PageState extends Action<PageState> {
    public title: string = "Untitled Document";
    public pages: Page[] = [
        {key:0, ...tmpPage},
        {key:1, ...tmpPage},
        {key:2, ...tmpPage}
    ]; //TODO agree that data structure is good type for pages

    public mm = 2; 
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
        pages.splice(pageNumber,0,{key: this.getNewPageKey(), ...tmpPage});
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

