import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, IconButton, Typography, Button, TextField } from '@material-ui/core'
import styles from './styles.module.css';
import { usePenContext } from '../contexts/PenContext';
import { ToolTypes } from '../interfaces/ToolTypes';
import { ColorPicker } from 'material-ui-color';
import Printer from './Printer';

const MyToolbar = () => {
  let penContext = usePenContext();

  const onMouseDown = (e:any) => {
    if (penContext.toolType === "pen") {
      penContext.setTool(ToolTypes.Eraser);
    } else {
      penContext.setTool(ToolTypes.Pen);
    }
  }

const colorPickerChange = (e:any)=>{
  penContext.setColor('#'+e.hex)
}

  return (
    <AppBar style={{ position: 'relative' }}>
      <Toolbar>
        <IconButton edge="start" className='menuButton' color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" onClick={onMouseDown} >{penContext.toolType}</Button>
        <Printer/>
        <ColorPicker defaultValue="black" value={penContext.color} onChange={colorPickerChange} />
        <TextField type="number" value={penContext.size} onChange={(e)=>{penContext.setSize(parseInt(e.target.value))}} />
      </Toolbar>
    </AppBar>
  )
}

export default MyToolbar;