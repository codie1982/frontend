import React from 'react'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../assets/logo.jpeg"

export default function Header() {

  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#"> <Link to={"/"} className="navbar-brand" href="#"><img src={logo} width={100} height={100} /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Link to={"/abouth"} className="nav-link text-black" aria-current="page">{"Hakkımızda"}</Link>
          <Link to={"/price"} className="nav-link text-black" aria-current="page">{"Fiyatlandırma"}</Link>
          </Nav>
          <Nav>
          <Link to={"/addcompany"} className="nav-link text-black" aria-current="page">{"Firma Ekle"}</Link>
          <Link to={"/login"} className="nav-link text-black" aria-current="page">{"Giriş Yap"}</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
  )
}
