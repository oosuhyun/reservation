import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {Form} from "react-bootstrap";
import axios from "axios";


function Register(){
    const location = useLocation();
    const seatID = getSeatID(location);
    // const [reservation, setReservation] = useState([
    //     {id:1, name: 'a', R_sTime: '2023.03.02 11:00', R_fTime: '2023.03.02 12:30'},
    //     {id:2, name: 'b', R_sTime: '2023.03.02 15:00', R_fTime: '2023.03.02 16:30'}
    // ]);
    const [reservation, setReservation] = useState([]);
    const [startTime, setStartTime] = useState({
        sHour:"10",
        sMinutes:"00"
    });
    const [finishTime, setFinishedTime] = useState({
        fHour:"10",
        fMinutes:"00"
    });
    const [NameValue, setNameValue] = useState("")
    const onNameChange = (event) => {
        setNameValue(event.currentTarget.value);
    };

    // let startMonth = location.state.date.month;
    // if(Number(location.state.date.month)<10){
    //     startMonth = "0" + startMonth.toString();
    // }
    // let startDay = location.state.date.day;
    // if(Number(location.state.date.day)<10){
    //     startDay = "0" + startDay.toString();
    // }

    const startDate = location.state.date.getFullYear()+"-"+("0"+(location.state.date.getMonth()+1)).slice(-2)+"-"+ ("0"+location.state.date.getDate()).slice(-2);
    const onButtonClick = () => {
        // console.log("seatID: " + seatID)
        // console.log("reservationName: " + NameValue)
        // console.log("reSTime: " + startDate+"T"+startTime.sHour+":"+startTime.sMinutes+":00")
        // console.log("reFTime: " + startDate+"T"+finishTime.fHour+":"+finishTime.fMinutes+":00")
        // console.log("reFDate: " + startDate)
        const data ={
            "seatID": seatID,
            "reservationName": NameValue,
            "reSTime": startDate+"T"+startTime.sHour+":"+startTime.sMinutes+":00",
            "reFTime": startDate+"T"+finishTime.fHour+":"+finishTime.fMinutes+":00",
            "reFDate": startDate
        };

        if(startTime.sHour === finishTime.fHour && startTime.sMinutes === finishTime.fMinutes){
            alert("시작시간과 종료시간을 확인해주세요")
        }
        else if(Number(startTime.sHour) > Number(finishTime.fHour)){
            alert("시작시간과 종료시간을 확인해주세요")
        }
        else if(startTime.sHour === finishTime.fHour && startTime.sMinutes === "30" && finishTime.fMinutes === "00"){
            alert("시작시간과 종료시간을 확인해주세요")
        }
        else if(NameValue===""){
            alert("이름을 입력하세요")
        }
        else {
            axios.get("/api/member/search?name="+NameValue)
                .then(() => {
                    axios.post("api/reservation", JSON.stringify(data), {
                        headers: {
                            "Content-Type": 'application/json'
                        },
                    })
                        .then((res) => {
                            console.log(res.data);
                            if (res.status === 201) {
                                alert("예약되었습니다.")
                                window.location.reload();
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            if (error.response && error.response.status === 409) {
                                alert("이미 예약된 시간입니다.");
                            }
                        })
                })
                .catch(error => {
                    console.log(error);
                    if(error.response && error.response.status === 404){
                        alert("없는 사용자입니다.");
                    }
                });
        }    };

    useEffect(() => {
        axios.get("api/reservation/search?startDateTime="+startDate+"T00:00:00&&endDateTime="+startDate+"T23:59:59"+"&&seat="+seatID)
            .then(res => setReservation(res.data))
            .catch(error => console.log(error));
    }, [startTime]);

    let hour = [];
    for(let h=10; h<=22; h+=1){
        hour.push(h.toString());
    }

    let minutes = ["00", "30"];

    return(
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div  style={{ display: 'flex', flexDirection: 'column', width: 500, marginTop: 70, paddingTop: 10, paddingLeft: 80, height: 500, border: 1, borderColor: "black", borderStyle: "solid"}}>
                <div style={{marginLeft: 50}}>
                    <h3>{startDate} 좌석{seatID}</h3>
                </div>
                <br/>
                <div  style={{flexDirection: 'column', fontFamily: 'kyobo'}}>
                    {reservation.map((myMap) => (
                        <text style={{
                            color:'#d35db3',
                            padding:1,
                            borderRadius:2,
                            marginBottom : 10,
                            fontWeight:400
                        }}
                        >{myMap.reSTime.substring(11,16)} - {myMap.reFTime.substring(11,16)} {myMap.reservationName}<br/></text>
                    ))}
                </div>
                <div>
                    <text>시작 시간: </text>
                    <select
                        value={startTime.sHour}
                        onChange={(e) =>
                            setStartTime({ ...startTime,
                                sHour: e.target.value
                            })
                        }
                        style={{padding:3, borderRadius:5, marginRight:2, backgroundColor:"white", color:"black", borderColor:"black"}}
                    >
                        {hour.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <select
                        value={startTime.sMinutes}
                        onChange={(e) =>
                            setStartTime({ ...startTime,
                                sMinutes: e.target.value
                            })
                        }
                        style={{padding:3, borderRadius:5, backgroundColor:"white", color:"black", borderColor:"black"}}
                    >
                        {minutes.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <br></br>
                    <text>종료 시간: </text>
                    <select
                        value={finishTime.fHour}
                        onChange={(e) =>
                            setFinishedTime({ ...finishTime,
                                fHour: e.target.value
                            })
                        }
                        style={{padding:3, borderRadius:5, marginRight:2, backgroundColor:"white", color:"black", borderColor:"black"}}
                    >
                        {/*{hour.filter(item => item>=startTime.sHour)*/}
                        {/*    .map(item => (*/}
                        {hour.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <select
                        value={finishTime.fMinutes}
                        onChange={(e) =>
                            setFinishedTime({ ...finishTime,
                                fMinutes: e.target.value
                            })
                        }
                        style={{padding:3, borderRadius:5, backgroundColor:"white", color:"black", borderColor:"black"}}
                    >
                        {minutes.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <br/>
                    <br/>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>이름: </Form.Label>
                            <Form.Control
                                type="text"
                                name = "name"
                                placeholder="이름을 입력하시오"
                                value={NameValue}
                                onChange={onNameChange}
                                style={{width : 300}}
                            />
                        </Form.Group>
                    </Form>
                    <div style={{ display: 'flex', justifyContent: 'end', marginRight:100}}>
                        <button
                            onClick={onButtonClick}
                            className={"button_seat"}
                        >예약하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getSeatID(location) {
    const params = new URLSearchParams(location.search);
    return params.get('seat')
}

export default Register;