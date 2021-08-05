import { IconButton } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { useState } from 'react';
import { usePageContext } from '../../contexts/PageContext';

const SaveButton = () => {

    const [fileDownloadURL, setDownloadURL] = useState("")
let dofileDownload: HTMLAnchorElement | null

let pageContext = usePageContext();
  const downloadDocument = (e:any) => {
    console.log("Saving ", pageContext.title);
    const blob = new Blob([JSON.stringify(pageContext)]);
    let url = URL.createObjectURL(blob);
    setDownloadURL(url);
    if (dofileDownload !== null) dofileDownload.click() ;
  }

  return(
      <div>
        <IconButton aria-label="delete" onClick={downloadDocument} className='menuButton'>
          <SaveAltIcon color="primary"/>
        </IconButton>
        
        {/* Hidden element enables download */}
        <a style = {{"display" : "none"}}
             download={pageContext.title}
             href={fileDownloadURL}
             ref={e=> dofileDownload = e}
        >download it</a>
    </div>
  );
}

export default SaveButton;