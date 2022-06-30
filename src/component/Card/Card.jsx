import React from 'react';




function Card({test}){
    
    
        return(
            <div className='course_card'>
                <div className='course_card_top'>
                    <div className='course_card_level'>{test.lv}</div>
                </div>
                <div className='course_card_down'>
                    <div className='course_card_txt'>
                        <p style={{ 'font-size': 17,'font-weight':'bolder'}}>{test.title}</p>
                        <p  style={{ 'font-size': 10,'color':'#898787', 'line-height': 17}}>{test.txt}</p>
                        <div className='d-flex course_card_price'>
                            <p style={{ 'font-size': 12,'letter-spacing': '0.07rem'}}>NT$</p>
                            <p style={{ 'font-size': 17,'letter-spacing': '0.07rem'}}>{test.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        
        )
    
}

export default Card