import React, { useEffect, useState } from "react"
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { Outlet } from "react-router-dom";
//Components
import Header from "../Header"
import Footer from "../Footer"

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'




export function MainLayout() {
    const dispatch = useDispatch()
    useEffect(() => {

    }, [])
    return (
        <div data-bs-spy="scroll" data-bs-target="#navbar-example">
        <Container className="section" fluid>
            <Header />
            <Outlet lang={global} />
            {/* <Footer /> */}
        </Container>
        <ToastContainer />
    </div>
    )
}