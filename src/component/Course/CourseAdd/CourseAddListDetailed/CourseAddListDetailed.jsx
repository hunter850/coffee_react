import './CourseAddListDetailed.css';
import Btn from '../../../Item/Btn/Btn';

function CourseAddListDetailed () {
    return (
        <div className='CourseAddListDetailed d-flex f-jcc'>
            <div>
                <div>
                    <p style={{ paddingBottom: 10, paddingTop: 44 }}>內頁輪播圖片 :</p>
                    <p style={{ fontWeight: 400, paddingBottom: 5 }}>圖片1 :</p>
                    <div className='CourseAddListDetailed-img' style={{ marginBottom: 19 }}></div>
                    <Btn backgroundColor={'#6E7B83'} color={'#fff'} width={'669px'}>上傳圖片</Btn>
                    <button className='CourseAddListDetailed-btn'>+ 新增圖片</button>
                </div>
                <div >
                    <p>課程簡介 :</p>
                    <textarea type="text" className='CourseAddListDetailed-inp'></textarea>
                </div>
                <div>
                    <p>適合對象 :</p>
                    <textarea type="text" className='CourseAddListDetailed-object-inp'  ></textarea>
                </div>
                <div>
                    <p>需求材料 :</p>
                    <textarea type="text" className='CourseAddListDetailed-material-inp'  ></textarea>
                </div>
                <div>
                    <p>注意事項 :</p>
                    <textarea type="text" className='CourseAddListDetailed-inp'  ></textarea>
                </div>
                <div>
                    <p style={{ paddingBottom: 6 }}>報名資訊 :</p>
                    <div style={{ paddingBottom: 6 }}>
                        <p style={{ fontWeight: 400 }}>報名時間 1 :</p>

                        <div className='CourseAddListDetailed-select-inp '>
                            <input type="text" className='CourseAddListDetailed-date-inp' placeholder="選擇日期" />
                            <input type="text" className='CourseAddListDetailed-time-inp' placeholder="選擇時段1" />
                            <input type="text" className='CourseAddListDetailed-time-inp' placeholder="選擇時段2" />
                            <div className='delet-img'></div>
                        </div>
                    </div>
                    <div style={{ paddingBottom: 21 }}>
                        <p style={{ fontWeight: 400 }}>報名時間 2 :</p>
                        <div className='CourseAddListDetailed-select-inp '>
                            <input type="text" className='CourseAddListDetailed-date-inp' placeholder="選擇日期" />
                            <input type="text" className='CourseAddListDetailed-time-inp' placeholder="選擇時段1" />
                            <input type="text" className='CourseAddListDetailed-time-inp' placeholder="選擇時段2" />
                            <div className='delet-img'></div>
                        </div>
                    </div>
                    <button className='CourseAddListDetailed-btn' style={{ marginBottom: 92 }}>+ 報名時間</button>
                </div>
            </div>
        </div>
    );
}

export default CourseAddListDetailed;