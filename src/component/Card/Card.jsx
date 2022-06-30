import React,{Component} from 'react';


class Card extends Component {
    render(){
        return(
            <div className='course_card'>
                <div className='course_card_top'>
                    <div className='course_card_level'>初級</div>
                </div>
                <div className='course_card_down'>
                    <div className='course_card_txt'>
                        <p style={{ 'font-size': 17,'font-weight':'bolder'}}>愛心拉花</p>
                        <p  style={{ 'font-size': 10,'color':'#898787',  'line-height': 17}}>課程介紹範例文字與範圍,課程介紹範例文字與範圍,課程介紹範例文字與範圍.</p>
                        <div className='d-flex course_card_price'>
                            <p style={{ 'font-size': 12,'letter-spacing': '0.07rem'}}>NT$</p>
                            <p style={{ 'font-size': 17,'letter-spacing': '0.07rem'}}>2000</p>
                        </div>
                    </div>
                </div>
            </div>
        
        )
    }
}



export default Card