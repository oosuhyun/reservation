import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container,Nav, Navbar} from "react-bootstrap";
import MainPage from "./pages/MainPage";
import StartPage from "./pages/StartPage";
import ConfirmPage from "./pages/ConfirmPage";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import ResultPage from "./pages/ResultPage";
import Main2Page from "./page/Main2Page";
import Register2Page from "./page/Register2Page";

function App() {
  return (
      <BrowserRouter>
          <div>
              {window.location.href === "http://localhost:3000/"
                  ? <Navbar bg="dark" variant="dark">
                      <Container>
                          <Navbar.Brand>Reservation</Navbar.Brand>
                      </Container>
                  </Navbar>
                  : <Navbar bg="dark" variant="dark">
                      <Container>
                          <Navbar.Brand>Reservation</Navbar.Brand>
                          {/*<Nav className="me-auto">*/}
                          {/*    <Nav.Link href="/main">Home</Nav.Link>*/}
                          {/*    <Nav.Link href="/confirm">confirm</Nav.Link>*/}
                          {/*</Nav>*/}
                      </Container>
                  </Navbar>}

              <Routes>
                  {/*<Route path = "/" element={<StartPage />} />*/}
                  <Route path = "/" element={<Main2Page />} />
                  <Route path = "/register2" element={<Register2Page />} />
                  <Route path = "/main" element={<MainPage />} />
                  <Route path = "/confirm" element={<ConfirmPage />} />
                  <Route path = "/register" element={<Register />} />
                  <Route path = "/login" element={<LoginPage />} />
                  <Route path = "/result" element={<ResultPage />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
