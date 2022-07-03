import React from 'react';
import './Path.css'

export default function Path ({pathObj}){
    const {path} = pathObj
   
    return(
        <div className='container'>
            <div className='Path-font Path-wrap'>
                    <span>首頁</span>
                    <span>{path.p1}</span>
                    <span>{path.p2}</span>
            </div>
        </div>
    )
}