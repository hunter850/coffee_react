import React, { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";

function Calendar({ setHour, hour }) {
    return (
        <DatePicker
            selected={hour}
            onChange={setHour}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="時段"
            dateFormat="yyyy MMMM d, h:mm aa"
            minTime={setHours(setMinutes(new Date(), 0), 13)}
            maxTime={setHours(setMinutes(new Date(), 30), 18)}
            disabledKeyboardNavigation
            placeholderText="請選擇日期"
        />
    );
}

export default Calendar;
