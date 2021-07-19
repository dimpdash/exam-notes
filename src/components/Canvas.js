import React, { useRef, useEffect } from 'react'
import styles from './styles.module.css';

const Canvas = props => {

    let {lines, Background, ...rest} = props
    // Background |= () => null;
    // console.log(lines);
    console.log(props.width, props.height)
    let divStyle = {
        'height': '100%',
        'width': rest.width,
        'position': 'relative'
      }

    return (
        <div className={styles.canvas} style={divStyle}>
            <svg {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0" aria-labelledby="title">
                <rect width="100%" height="100%" fill="white"/>
                <Background canvas={rest}></Background>
                {props.lines}  
                    
            </svg>
        </div>
    );
}

export default Canvas