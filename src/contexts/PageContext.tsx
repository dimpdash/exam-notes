import { createSingle, Action,  } from "context-class";
import Page from "../interfaces/Page";
import ruledLines from "../classes/backgrounds/RuledLines";

let tmpPage = {elements: [], background: ruledLines(210*2,297*2, 10*2), width: 210*2, height: 297*2};

export class PageState extends Action<PageState> {
    public title: string = "Untitled Document";
    //columns then rows
    //pages[row][columns]
    public pages: (Page|undefined)[][] = [ 
        [{key:0, ...tmpPage}],
        [{key:1, ...tmpPage}],
        [{key:2, ...tmpPage}, {key:3, ...tmpPage}]
    
    ]; //TODO agree that data structure is good type for pages

    public mm = 2; 
    private nextId: number = this.pages.length + 1;

    public setPages(pages:(Page|undefined)[][]){
        this.merge({pages})
    }

    public setPage(column: number, row: number, page?: Page){
        //console.log(this);
        let pages = this.pages.slice();
        pages[row][column] = page; 
        this.setPages(pages);
        console.log(pages)
    }


    private getNewPageKey = ()=>{
        this.nextId++;
        return this.nextId;
    }

    public addPageAt(columnIndex: number, rowIndex: number, isVertical:boolean){
        if(isVertical){
            while(this.pages.length <= rowIndex)
                this.pages.push([])
            
            if(this.pages[rowIndex][columnIndex] && (rowIndex==0 || this.pages[rowIndex-1][columnIndex])){
                let col : (Page | undefined)[] = [];
                for(let i = 0; i < columnIndex; i++)
                    col.push(undefined);
                col.push({key: this.getNewPageKey(), ...tmpPage})

                
                let rowPages = [...this.pages]; 
                rowPages.splice(rowIndex, 0, col);
                this.setPages(rowPages);
            }else{
                console.log("here")
                if(!this.pages[rowIndex-1][columnIndex]){
                    rowIndex --;
                }
                for(let i = this.pages[rowIndex].length; i < columnIndex; i++){
                   this.pages[rowIndex].push(undefined);
                }
                
                this.pages[rowIndex][columnIndex] = {key: this.getNewPageKey(), ...tmpPage};
               
                this.setPages(this.pages);
            }
        }else{
            let rowPages = [...this.pages]; 
            if(this.pages[rowIndex][columnIndex] && (columnIndex==0 || this.pages[rowIndex][columnIndex-1])){
                rowPages[rowIndex].splice(columnIndex, 0, {key: this.getNewPageKey(), ...tmpPage});
            }else{
                if(!this.pages[rowIndex][columnIndex-1]){
                    columnIndex --;
                }
                rowPages[rowIndex][columnIndex] = {key: this.getNewPageKey(), ...tmpPage};
            }
            // for(let i = 0; i < rowPages.length; i++){
            //     let page : (Page|undefined) = undefined;
            //     if(i === rowIndex)
            //         page = {key: this.getNewPageKey(), ...tmpPage};
            //     rowPages[i].splice(columnIndex, 0, page);
            // }
            this.setPages(rowPages);
        }


        // let newPages = this.pages.map((rowPages)=>{
        //     //make a copy
        //     rowPages = rowPages.slice(); 
        //     //insert new page
        //     rowPages.splice(columnIndex,0,{key: this.getNewPageKey(), ...tmpPage});
        //     return rowPages;
        // })
       
        // this.setPages(newPages);
        // return newPages;
    }

    public getPage(key: number) : Page | undefined{
        let page : Page | undefined = undefined;
        this.pages.forEach(column=>column.forEach(p=>{
            if(p && p.key === key){
                page = p;
            }
        }))

        return page;
    }

    private removeUndefinedRow(pages: (Page|undefined)[][]){
        return pages.filter((row)=>!row.every((value)=>value===undefined))
    }

    private removeUndefinedColumn(pages: (Page|undefined)[][]){
        let columnSize = Math.max(...pages.map(row => row.length));

        let columnsToRemove :number[]= []
        for(let c = 0; c < columnSize; c++){
            let empty = true;
            for(let r = 0; r < this.pages.length; r++){
                if(this.pages[r][c]){
                    empty=false;
                    break;
                }
            }
            if(empty){
                columnsToRemove.push(c);
            }
        }

       console.log(columnsToRemove)
        return this.pages.map((row)=>row.filter((p,index)=>!columnsToRemove.includes(index)));
    }

    public deletePage(column:number, row:number){
        this.pages[row][column] = undefined;
        this.pages = this.removeUndefinedRow(this.pages);
        this.pages = this.removeUndefinedColumn(this.pages);
        this.setPages(this.pages)
    }

    public deletePageUp(column:number, row:number){
        this.setPage(column,row, undefined);
        for(let r = row+1; r < this.pages.length; r++){
            this.pages[r-1][column] = this.pages[r][column];
        }
        this.pages[this.pages.length-1][column] = undefined;
        this.setPages(this.pages);
    }

    public deletePageLeft(column:number, row:number){
        this.pages[row][column] = undefined;
        this.pages[row].splice(column, 1);
        this.setPages(this.pages);
    }

    public getPageCR(col:number, row:number) {
        return this.pages[row][col];
    }

    private merge(newData:any){
        // console.log(newData)
        this.setState((prev:PageState)=>{ 
            // console.log(prev)
            return{...prev, ...newData} as PageState});
    }
}


export const [PageContextProvider, usePageContext] = createSingle(new PageState);

