import React from 'react';
import { Divider, IconButton } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface PageDividerProps {
    onClick?: () => void,
    isHorizontal: boolean
}

export function PageDivider(props: PageDividerProps) {

    const verticalStyle: any = {
        height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center'
    }

    const horizontalStyle: any = {
        width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'center'
    }

    const style = props.isHorizontal ? horizontalStyle : verticalStyle;

    return (
        <div style={style}>
            <div style={{ ...style, height: '', width: '' }}>
                <IconButton aria-label="add" onClick={props.onClick}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </div>
        </div>
    )
}