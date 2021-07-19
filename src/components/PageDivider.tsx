import React from 'react';
import { Divider, IconButton } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface PageDividerProps{
    onClick?: ()=>void
}

export function PageDivider(props:PageDividerProps) {
    return <div style={{position: 'relative'}}>
        <Divider />
        <div style={{position: 'absolute', left:"100%",  transform: 'translateY(-50%)' }}>
        <IconButton aria-label="add" onClick={props.onClick}>
            <AddCircleOutlineIcon />
        </IconButton>
        </div>
    </div>
}