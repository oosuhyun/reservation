import React from 'react'
import {Button, Card} from "react-bootstrap";
import imgA from "../assets/images/blue&yellow-unsplash.jpg";
import imgB from "../assets/images/blue&pink-unsplash.jpg";

function  MainPage() {
    return(
        <div>
            <h2></h2>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
                <Card style={{ width: '18rem', margin: 15 }}>
                    <Card.Img variant="top" src={imgA} width={100} height={180}  />
                    <Card.Body>
                        {/*<Card.Title>자리 예약 시스템으로 이동합니다</Card.Title>*/}
                        <Card.Text>
                            자리를 예약합니다.
                        </Card.Text>
                        <Button variant="outline-primary" href={"/main"}>자리 예약</Button>
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem', margin: 15 }}>
                    <Card.Img variant="top" src={imgB} width={100} height={180}  />
                    <Card.Body>
                        {/*<Card.Title>Card Title</Card.Title>*/}
                        <Card.Text>
                            예약을 확인합니다.
                        </Card.Text>
                        <Button variant="outline-primary" href={"/confirm"}>예약 확인</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export  default  MainPage;
