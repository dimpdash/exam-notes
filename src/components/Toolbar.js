import AppBar from '@material-ui/core/AppBar'
import {Toolbar, IconButton, Typography, Button} from '@material-ui/core'
import styles from './styles.module.css';

const MyToolbar = (props) => { 
    const onMouseDown = (e) => {
        console.log(e);
        if(props.tool == "pen"){
          props.setTool("eraser")
        } else {
          props.setTool("pen");
        }
      }

    return (
        <div style={{'flexGrow': 1}}>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" className='menuButton' color="inherit" aria-label="menu">
                    </IconButton>
                    <Button color="inherit" onClick={onMouseDown} >{props.tool}</Button>
                </Toolbar>
        </AppBar>
      </div>
    )
}

export default MyToolbar;