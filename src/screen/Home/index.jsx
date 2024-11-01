import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { searchProduct } from "../../features/llm/llmSlice"
import { useNavigate, } from "react-router-dom";
import { Row, Col, Button, InputGroup, Form, Card, ListGroup, Image, Spinner, ButtonGroup } from 'react-bootstrap'
import { toast } from 'react-toastify'
import CompanyCard from "../../component/CompnayCard"
import ReactGA from "react-ga4";
import logo from "../../assets/logo.jpeg"
export default function Home() {
  ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });

  const [inputValue, setInputValue] = useState(''); // Giriş değerini saklamak için state
  const [llmMessage, setLLMMessages] = useState([])
  const [isResults, setIsResults] = useState(false)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Giriş değeri güncellemesi
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfa yenilenmesini önlemek için

    if (inputValue.trim()) {
      //setLLMMessages(prevMessages => [...prevMessages, { human: inputValue, system: "" }]);
      dispatch(searchProduct(inputValue))
      setInputValue(''); // Gönderildikten sonra giriş alanını temizlemek için
    }

  };

  const llm = useSelector(
    (state) => {
      return state.llm
    }
  )
  useEffect(() => {

    if (llm.isLoading) {
      setIsLoading(true)
    } else {
      if (llm.isSuccess) {
        setIsLoading(false)
        setLLMMessages(prevMessages => [...prevMessages, { human: "", system: llm.message }]);
        console.log('Gelen cevap:', llm.message);
      }
    }

    if (llm.isError) {
      setIsLoading(false)
    }

  }, [llm])

  useEffect(() => {
    console.log("llmMessage", llmMessage)
  }, [llmMessage])

  return (
    <>
      <Row className="mt-auto justify-content-center">
        <Col xs={6} md={4} className="text-center">
          <div className="logo-container">
            <Image src={logo} fluid rounded className="centered-logo" />
          </div>
        </Col>
      </Row>
      <div className="chat-container">
        <Row>
          <Col xl="2" />
          <Col>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <Form.Control
                  size="lg"
                  placeholder="Bir ürün ve hizmet isteğinde bulunun"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={inputValue} // Giriş değerini kontrol etmek için
                  onChange={handleInputChange} // Değişiklikleri izlemek için
                />
                <ButtonGroup>
                  <Button variant="outline-secondary" id="button-addon2">
                    Gönder
                  </Button>
                  <Button onClick={()=>{setLLMMessages([])}} variant="danger" id="button-addon2">
                    Temizle
                  </Button>
                </ButtonGroup>

              </InputGroup>
            </Form>
          </Col>
          <Col xl="2" />
        </Row>

        {/* Messages Section */}
        <Row>
          <Col>
            {isLoading ?
              <div className="mt-auto justify-content-center">
                <Spinner className='text-center' />
              </div> : <></>}
            <div className="messages-scroll-container">
              <ListGroup>


                {llmMessage.reverse().map((item, index) => {
                  return (
                    <ListGroup.Item key={index} className="messages-container">
                      <div className="messages-section">
                        <section className="message user-message">
                          <p>{item.system}</p>
                        </section>
                        {/*  <section className="message ai-message">
                        <p>I want to know more about AI.</p>
                      </section> */}
                        {/* More messages can go here */}
                      </div>
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </div>

      {/* Fixed Bottom Company Cards */}
      {results.length != 0 ? <>
        <Row className="fixed-bottom company-cards-container">
          {
            results.map((item) => {
              return (
                <Col><CompanyCard /></Col>
              )
            })
          }
        </Row>
      </> :
        <>
        </>}
    </>
  )
}
