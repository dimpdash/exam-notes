import React, { useRef, useEffect } from 'react'
import styles from './styles.module.css';

const Canvas = props => {

    const svgLine = (line) => {
        // console.log(line);
        return line
    }

    const {lines, ...rest} = props;
    // console.log(lines);
    return (
        <div className={styles.canvas}>
            <svg {...rest}  className="office" xmlns="http://www.w3.org/2000/svg" width={512} height={512} viewBox="0 0" aria-labelledby="title">
                    {lines.map(svgLine)}  
                    
            </svg>
        </div>
    );
}

export default Canvas