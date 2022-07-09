import './CoursePath.css';

function CoursePath () {
    return (
        <div className='CoursePath'>
            <div className='CoursePath-content focus' style={{ paddingBottom: '23px' }}>課程內容</div>
            <div className='CoursePath-object' style={{ paddingBottom: '23px' }}>適合對象</div>
            <div className='CoursePath-material' style={{ paddingBottom: '23px' }}>需求材料</div>
            <div className='CoursePath-news' style={{ paddingBottom: '23px' }}>報名資訊</div>
            <div className='CoursePath-matter' style={{ paddingBottom: '23px' }}>注意事項</div>
        </div>
    );
}


export default CoursePath;