import React, {useState} from 'react'
import {Form} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function  ConfirmPage() {
    const [NameValue, setNameValue] = useState("")
    const onNameChange = (event) => {
        setNameValue(event.currentTarget.value);
    };
    const navigate = useNavigate();
    const onButtonClick = () => {
        if(NameValue===""){
            alert("이름을 입력하세요")
        }else{
            axios.get("/api/member/search?name="+NameValue)
                .then((res) => {
                    if(res.status === 200){
                        navigate("/result",{state:{reName: NameValue}});
                    }
                })
                .catch(error => {
                    console.log(error);
                    if(error.response && error.response.status === 404){
                        alert("없는 사용자입니다.");
                    }
                });
        }
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div  style={{ display: 'flex',  flexDirection: 'column', width: 500, marginTop: 70, paddingTop: 10, paddingLeft: 80, height: 500, border: 1, borderColor: "black", borderStyle: "solid"}}>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{marginTop:100}}>
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
                    >예약 확인</button>
                </div>
            </div>
        </div>
    );
}

export  default  ConfirmPage;
