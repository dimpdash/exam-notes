import React from 'react'

export default class PageViewPrinted extends React.PureComponent{

    public render()  {
        return(
        <div>
            <p>hey</p>
            <svg height="100" width="100">
                <circle cx="50" cy="50" fill="yellow" r="40" stroke="green" strokeWidth="4" />
            </svg>
        </div>
        );
    }
}