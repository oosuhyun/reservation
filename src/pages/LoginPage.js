import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";
import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {useLocation} from "react-router";

function  LoginPage() {
    const location = useLocation();
    const seatID = getSeatID(location);
    const startDate = location.state.date.getFullYear()+"-"+("0"+(location.state.date.getMonth()+1)).slice(-2)+"-"+ ("0"+location.state.date.getDate()).slice(-2);

    const [NameValue, setNameValue] = useState("")
    const onNameChange = (event) => {
        setNameValue(event.currentTarget.value);
    };
    const [NumberValue, setNumberValue] = useState("")
    const onNumberChange = (event) => {
        setNumberValue(event.currentTarget.value);
    };

    const onButtonClick = () => {

    };

    return(
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div  style={{ display: 'flex', flexDirection: 'column', width: 500, marginTop: 70, paddingTop: 10, paddingLeft: 80, height: 500, border: 1, borderColor: "black", borderStyle: "solid"}}>
                <br/>
                <div style={{marginLeft: 50}}>
                    <h3>{startDate} 좌석{seatID}</h3>
                </div>
                <br/>
                <div>
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
                    <br/>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>인증번호: </Form.Label>
                            <Form.Control
                                type="text"
                                name = "name"
                                placeholder="인증번호를 입력하시오"
                                value={NumberValue}
                                onChange={onNumberChange}
                                style={{width : 300}}
                            />
                        </Form.Group>
                    </Form>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'end', marginRight:100}}>
                        <button
                            onClick={onButtonClick}
                            className={"button_seat"}
                            style={{width: 120, height:60}}
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

export  default  LoginPage;
