import { IconButton } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';
import { useState } from "react";
import { couldStartTrivia } from "typescript";


const UploadButton = () => {
    const [uploadStatus, setUploadStatus] = useState("")
    let dofileUpload: HTMLInputElement | null
    function upload(){
        if( dofileUpload !== null) dofileUpload.click();
    }

  

    function openFile(evt: any) {
        if(evt.target !== null){
            let status : string[] = []; // Status output
            const fileObj = evt.target.files[0]; // We've not allowed multiple files.
            // See https://developer.mozilla.org/en-US/docs/Web/API/FileReader
            const reader = new FileReader(); 
            
            // Defining the function here gives it access to the fileObj constant.
            let fileloaded = (e : any) => {
                // e.target.result is the file's content as text
                const fileContents = JSON.parse(e.target.result);
                console.log(fileContents);
                // Don't trust the fileContents! 
                // Show the status messages
                setUploadStatus("done");
            }
            
            // Mainline of the method
            // fileloaded = fileloaded.bind(this);
            // The fileloaded event handler is triggered when the read completes
            reader.onload = fileloaded;
            reader.readAsText(fileObj); // read the file
            // console.log(fileObj.stream());
        }
    }

    return(
        <div>
            <IconButton aria-label="delete" onClick={upload} className='menuButton'>
                <PublishIcon color="primary"/>
            </IconButton>


            <input style = {{"display" : "none"}} type="file" className="hidden"
            multiple={false}
            accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
            onChange={evt => openFile(evt)}
            ref={e=>dofileUpload = e}
            />
        </div>
    );
}

export default UploadButton;