import './List.css';

function List () {
    return (
        <div className='courseList d-flex f-aic'>
            <div className='List-img'><img src="" alt="" /></div>
            <div className='List-title'>愛心拉花</div>
            <div className='List-level'>初級</div>
            <div className='List-price'>NT$ &nbsp;<span style={{ fontSize: '1.0625rem' }}>2000</span></div>
            <div className='List-edit-icon'></div>
            <div className='List-delete-icon'></div>
        </div>
    );
}



export default List;