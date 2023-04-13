import React, {useState, useEffect} from 'react'
import "../assets/css/Main.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function  Main2Page() {
    const now = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const [reservationDate, setReservationDate] = useState(new Date());
    const [seat, setSeat] = useState([]);
    const navigate = useNavigate();
    const today = reservationDate.getFullYear()+"-" + ("0"+(reservationDate.getMonth()+1)).slice(-2) + "-" + ("0"+reservationDate.getDate()).slice(-2);
    // const today = reservationDate.getFullYear()+"-"+$"0" + (reservationDate.getMonth() + 1)).slice(-2)}`}+"-"+{("0"+reservationDate.getDate()).slice(-2)};

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
        navigate("/register2?seat=" + seatID, {state:{date: reservationDate}});
    };


    return(
        <div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 30}}>
                        <h2 style={{marginTop:10, fontFamily: 'NeoDunggeunmoPro-Regular', fontSize:30}}>{reservationDate.getFullYear()}년 {("0"+(reservationDate.getMonth()+1)).slice(-2)}월 {("0"+reservationDate.getDate()).slice(-2)}일 {week[reservationDate.getDay()]}요일</h2>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20}} >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginRight: 80
                    }}>
                        {seat.filter(myMap => (myMap.seatID) <= 5)
                            .map((myMap) => (
                                <button
                                    disabled={myMap.seatFDate < today ? true : myMap.seatStatus == 0 ? true : false}
                                    onClick={e => onButtonClick(e, myMap.seatID)}
                                    className={"button_seat"}
                                >{myMap.seatID}</button>
                            ))}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 150
                    }}>
                        {seat.filter(myMap => (myMap.seatID) > 100 && (myMap.seatID) <= 104)
                            .map((myMap) => (
                                <button
                                    disabled={myMap.seatFDate < today ? true : myMap.seatStatus == 0 ? true : false}
                                    onClick={e => onButtonClick(e, myMap.seatID)}
                                    className={"button_seat_notebook"}
                                >{myMap.seatID-100}</button>
                            ))}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 150
                    }}>
                        {seat.filter(myMap => (myMap.seatID) >= 105)
                            .map((myMap) => (
                                <button
                                    disabled={myMap.seatFDate < today ? true : myMap.seatStatus == 0 ? true : false}
                                    onClick={e => onButtonClick(e, myMap.seatID)}
                                    className={"button_seat_notebook"}
                                >{myMap.seatID-100}</button>
                            ))}
                    </div>
                    <div style={{display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 80
                    }}>
                        {seat.filter(myMap => (myMap.seatID) > 5 && (myMap.seatID) < 100)
                            .map((myMap) => (
                                <button
                                    disabled={myMap.seatFDate < today ? true : myMap.seatStatus == 0 ? true : false}
                                    onClick={e => onButtonClick(e, myMap.seatID)}
                                    className={"button_seat"}
                                >{myMap.seatID}</button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};



export  default  Main2Page;


