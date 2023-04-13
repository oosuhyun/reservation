import React, {useState, useEffect} from 'react'
import "../assets/css/Main.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";


function  MainPage() {
    const now = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    // const [form, setForm] = useState({
    //     year: now.getFullYear(),
    //     month: ("0"+ (now.getMonth()+1)).slice(-2),
    //     day: ("0"+now.getDate()).slice(-2),
    //     dayOfWeek : week[now.getDay()]
    // });
    const [reservationDate, setReservationDate] = useState(new Date());
    const [seat, setSeat] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(form);
        axios.get("/api/seat")
            .then(res => setSeat(res.data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        console.log(reservationDate.getMonth());
    }, [reservationDate]);

    const onButtonClick = (event, seatID) => {
        console.log(seatID);
        navigate("/login?seat=" + seatID, {state:{date: reservationDate}});
    };

    // //현재년도부터 +2개까지만 선택할 목록으로 만든다.
    // let years = [];
    // for (let y = now.getFullYear(); y <= now.getFullYear()+2; y += 1) {
    //     years.push(y.toString());
    // }
    // //1월부터 12월까지 목록으로 만든다.
    // let month = [];
    // for (let m = 1; m <= 12; m += 1) {
    //     if(m<10){
    //         month.push("0"+m.toString());
    //     }else{
    //         month.push(m.toString());
    //     }
    // }
    // //년도와 달에 따라 날짜를 생성한다.
    // let days = [];
    // let date = new Date(form.year, form.month, 0).getDate();
    // for (let d = 1; d <= date; d += 1) {
    //     if(d<10){
    //         days.push(d.toString());
    //     }
    //     else{
    //         days.push(d.toString());
    //     }
    // }


    return(
        <div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 30}}>
                        {/*<div>*/}
                        {/*    <DatePicker*/}
                        {/*        locale={ko}*/}
                        {/*        dateFormat="yyyy-MM-dd"*/}
                        {/*        minDate={new Date()}*/}
                        {/*        selected={reservationDate}*/}
                        {/*        onChange={date =>*/}
                        {/*            setReservationDate(date)*/}
                        {/*        }*/}
                        {/*        onFocus={e => e.target.blur()} //mobile 경우 keyboard 사용 막음*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <h2 style={{marginTop:10, fontFamily: 'NeoDunggeunmoPro-Regular', fontSize:30}}>{reservationDate.getFullYear()}년 {("0"+(reservationDate.getMonth()+1)).slice(-2)}월 {("0"+reservationDate.getDate()).slice(-2)}일 {week[reservationDate.getDay()]}요일</h2>
                    </div>
                </div>
                {/*<select*/}
                {/*    value={form.year}*/}
                {/*    onChange={(e) =>*/}
                {/*        setForm({ ...form,*/}
                {/*            year: e.target.value,*/}
                {/*            dayOfWeek: week[new Date((e.target.value).toString() + '-' + (form.month).toString() +'-'+ (form.day).toString()).getDay()]*/}
                {/*        })*/}
                {/*    }*/}
                {/*    className={"selectCustom"}*/}
                {/*>*/}
                {/*    {years.map(item => (*/}
                {/*        <option value={item} key={item}>*/}
                {/*            {item}*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</select>*/}
                {/*<select*/}
                {/*    value={form.month}*/}
                {/*    onChange={(e) =>*/}
                {/*        setForm({ ...form,*/}
                {/*            month: e.target.value,*/}
                {/*            dayOfWeek: week[new Date((form.year).toString() + '-' + (e.target.value).toString() +'-'+ (form.day).toString()).getDay()]*/}
                {/*        })*/}
                {/*    }*/}
                {/*    className={"selectCustom"}*/}
                {/*>*/}
                {/*    {month.map(item => (*/}
                {/*        <option value={item} key={item}>*/}
                {/*            {item}*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</select>*/}
                {/*<select*/}
                {/*    value={form.day}*/}
                {/*    onChange={(e) =>*/}

                {/*        setForm({ ...form,*/}
                {/*            day: e.target.value,*/}
                {/*            dayOfWeek: week[new Date((form.year).toString() + '-' + (form.month).toString() +'-'+ (e.target.value).toString()).getDay()]*/}
                {/*        })*/}
                {/*    }*/}
                {/*    className={"selectCustom"}*/}
                {/*>*/}
                {/*    {days.map(item => (*/}
                {/*        <option value={item} key={item}>*/}
                {/*            {item}*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</select>*/}
                {/*<br></br>*/}
                {/*<br></br>*/}
                {/*<h2 style={{fontFamily: 'NeoDunggeunmoPro-Regular'}}>*/}
                {/*    {form.year}년 {form.month}월 {form.day}일 {form.dayOfWeek}요일*/}
                {/*</h2>*/}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20}} >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginRight: 120
                    }}>
                        {seat.filter(myMap => (myMap.seatID)%2 !== 0)
                            .map((myMap) => (
                                <button
                                    onClick={e => onButtonClick(e, myMap.seatID)}
                                    className={"button_seat"}
                                >{myMap.seatID}</button>
                            ))}
                    </div>
                    <div>
                        <div style={{display: 'flex',
                            flexDirection: 'column',
                            marginLeft: 120
                        }}>
                            {seat.filter(myMap => (myMap.seatID)%2 === 0)
                                .map((myMap) => (
                                    <button
                                        onClick={e => onButtonClick(e, myMap.seatID)}
                                        className={"button_seat"}
                                    >{myMap.seatID}</button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export  default  MainPage;


