import React from 'react';
import './Card.css';
import menudata from './menu.json';


function Card(){    
        return(
            menudata.map(({menu_name,menu_nutrition,menu_price_m,menu_sid})=>{
                return(
            <div className='product_card' key={menu_sid}>
                <div className='product_card_top'>
                    <div className='product_card_level'>Q</div>
                </div>
                <div className='product_card_down'>
                    <div className='product_card_txt'>
                        <p style={{ 'fontWeight':'bolder'}}>{menu_name}</p>
                        <p className='font-min' style={{'color':'#898787'}}>{menu_nutrition}</p>
                        <div className='d-flex product_card_price' >
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