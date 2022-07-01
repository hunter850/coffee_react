import React from 'react';




function Card({test}){
    
    
        return(
            <div className='course_card'>
                <div className='course_card_top'>
                    <div className='course_card_level'>{test.lv}</div>
                </div>
                <div className='course_card_down'>
                    <div className='course_card_txt'>
                        <p style={{ 'fontSize': '1.0625rem','fontWeight':'bolder'}}>{test.title}</p>
                        <p className='font-min' style={{'color':'#898787'}}>{test.txt}</p>
                        <div className='d-flex course_card_price' >
                            <p style={{ 'fontSize': 12,'letterSpacing': '0.07rem'}}>NT$</p>
                            <p style={{ 'fontSize': 17,'letterSpacing': '0.07rem'}}>{test.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        //  'fontSize':'0.625rem',
        )
    
}

export default Card