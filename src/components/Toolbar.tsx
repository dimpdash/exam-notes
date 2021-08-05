import React, {useRef} from 'react';
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, IconButton, Typography, Button, TextField } from '@material-ui/core'
import styles from './styles.module.css';
import { usePenContext } from '../contexts/PenContext';
import { ToolTypes } from '../interfaces/ToolTypes';
import { ColorPicker } from 'material-ui-color';
import Printer from './Printer';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Input from '@material-ui/core/InputLabel';
import { usePageContext } from '../contexts/PageContext';
import fs from 'fs'
import { useState } from 'react';
import { Ref } from 'react';
import SaveButton from './Toolbar/SaveButton';
import UploadButton from './Toolbar/UploadButton';

const MyToolbar = () => {
  let penContext = usePenContext();

  const changeToolToPen = (e:any) => {
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
    <AppBar color="secondary" style={{ position: 'sticky'}}>
      <Toolbar style={{color: 'white'}}>
        <IconButton edge="start" className='menuButton' color="primary" aria-label="menu">
        </IconButton >
        <IconButton aria-label="delete" onClick={changeToolToPen} className='menuButton'>
          <BorderColorIcon color="primary"/>
        </IconButton>
        <SaveButton/>
        <UploadButton/>
        <Button color="primary" onClick={changeToolToPen} >{penContext.toolType}</Button>
        <Printer/>
        <ColorPicker hideTextfield={true} defaultValue="black" value={penContext.color} onChange={colorPickerChange} />
        <TextField color="primary" type="number" value={penContext.size} onChange={(e)=>{penContext.setSize(parseInt(e.target.value))}}/>
      </Toolbar>
    </AppBar>
  )
}

export default MyToolbar;