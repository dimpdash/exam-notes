import AppBar from '@material-ui/core/AppBar'
import {Toolbar, IconButton, Typography, Button} from '@material-ui/core'
import styles from './styles.module.css';
import { usePenContext } from './PenContext';
import { ToolTypes } from '../interfaces/ToolTypes';

const MyToolbar = () => { 
    let penContext = usePenContext();

    const onMouseDown = (e) => {
        if(penContext.toolType === "pen"){
          penContext.setTool(ToolTypes.Eraser);
        } else {
          penContext.setTool(ToolTypes.Pen);
        }
      }

    return (
            <AppBar style={{position: 'relative'}}>
                <Toolbar>
                    <IconButton edge="start" className='menuButton' color="inherit" aria-label="menu">
                    </IconButton>
                    <Button color="inherit" onClick={onMouseDown} >{penContext.toolType}</Button>
                </Toolbar>
        </AppBar>
    )
}

export default MyToolbar;