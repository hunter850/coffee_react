import React from 'react';
import './Path.css'
import { v4 } from 'uuid';

export default function Path ({pathObj}){
   console.log(pathObj.path);
   
   
    return(
        <div className='container'>
            <div className='Path-font Path-wrap'>
                    <span>首頁</span>
                    {
                        pathObj.path.map((path)=>{
                            return (
                                <span key={v4()}>{path}</span>
                            )
                        })
                    }
                  
            </div>
        </div>
    )
}