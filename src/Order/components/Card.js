import React from 'react';
import './Card.css';
import menudata from './menu.json';

function Card(){    
        return(
            menudata.map(({menu_name,menu_nutrition,menu_price_m})=>{
                return(
            <div className='course_card'>
                <div className='course_card_top'>
                    <div className='course_card_level'>1</div>
                </div>
                <div className='course_card_down'>
                    <div className='course_card_txt'>
                        <p style={{ 'fontWeight':'bolder'}}>{menu_name}</p>
                        <p className='font-min' style={{'color':'#898787'}}>{menu_nutrition}</p>
                        <div className='d-flex course_card_price' >
                            <p style={{ 'fontSize': '0.75rem','letterSpacing': '0.07rem'}}>NT${menu_price_m}</p>
                            {/* <p style={{ 'fontSize': '1.0625rem','letterSpacing': '0.07rem'}}>4</p> */}
                        </div>
                    </div>
                </div>
            </div>
            )})
        )
        }



export default Card;