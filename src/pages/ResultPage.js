import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router";
import axios from "axios";
import "../assets/css/Result.css";



function  ResultPage() {
    const location = useLocation();
    const [name, setName] = useState(location.state.reName);
    const [reservation, setReservation] = useState([]);

    useEffect(() =>{
        console.log(name);
        axios.get("/api/reservation/search/my?name="+ name)
            .then(res => {
                setReservation(res.data);
            })
            .catch(error => console.log(error));
    }, [])

    const onButtonClick = async(event, reID) => {

        console.log(reID);
        if(window.confirm("삭제하시겠습니까?")){
            await axios.delete("/api/reservation/" + reID)
                .catch(error => console.log(error));
            alert("삭제 되었습니다.");
            window.location.reload();
            console.log("delete success");
        } else{
            console.log("delete cancel");
        }
    };


    return (

        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div  className={"div_custom1"}>
                <div  className={"div_custom2"}>
                    <h2 className={"h2_custom"}>예약 확인</h2>
                    <h5 className={"h5_custom"}>{name}</h5>
                    <div className={"div_custom3"}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            {reservation.map((myMap) => (
                                <text className={"text_custom"}>{myMap.reSTime.replace("T", " ").substring(0,16)} - {myMap.reFTime.substring(11,16)}  좌석{myMap.seatID}</text>
                            ))}
                        </div>
                        <div style={{display: 'flex',
                            flexDirection: 'column',
                        }}>
                            {reservation.map((myMap) => (
                                <button className={"button_custom"} onClick={e => onButtonClick(e, myMap.reID)}>취소</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export  default  ResultPage;
