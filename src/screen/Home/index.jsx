import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { conversition,cancelQuestion,answerQuestion } from "../../features/llm/llmSlice";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  InputGroup,
  Form,
  Card,
  ListGroup,
  Image,
  Spinner,
  ButtonGroup,
} from "react-bootstrap";
import { toast } from "react-toastify";
import CompanyCard from "../../component/CompnayCard";
import ReactGA from "react-ga4";
import logo from "../../assets/logo.jpeg";
export default function Home() {
  ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });

  const [conversitionId, setConversitionId] = useState(
    Math.floor(Math.random() * 1000001)
  );
  const [answerValues, setAnswerValues] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Giriş değerini saklamak için state
  const [llmMessage, setLLMMessages] = useState("");
  const [llmQuestions, setllmQuestions] = useState([]);
  const [isResults, setIsResults] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Giriş değeri güncellemesi
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfa yenilenmesini önlemek için
    if (inputValue.trim()) {
      dispatch(conversition({ human_message: inputValue, id: conversitionId }));
      setInputValue(""); // Gönderildikten sonra giriş alanını temizlemek için
    }
  };

  const llm = useSelector((state) => {
    return state.llm;
  });
  useEffect(() => {
    if (llm.isLoading) {
      setIsLoading(true);
    } else {
      if (llm.isSuccess) {
        setIsLoading(false);
        setLLMMessages(llm.message);
        setllmQuestions(llm.questions);
      }
    }

    if (llm.isError) {
      setIsLoading(false);
    }
  }, [llm]);

  useEffect(() => {
    console.log("llmMessage", llmMessage);
    console.log("llmQuestions", llmQuestions);
  }, [llmMessage, llmQuestions]);

  const handleQuestionsChange = (_id, event) => {
    const { value } = event.target;
    setAnswerValues((prevValues) => ({
      ...prevValues,
      [_id]: value, // Her bir input için değeri index ile ilişkilendiriyoruz
    }));
  };

  const handleSendClick = (_id) => {
    const answer = answerValues[_id];
    if (answer) {
      // Gönder request fonksiyonunu burada çağırın ve `_id` ile `value`'yi geçin
      console.log("Gönder request oluşturuldu:", { _id, answer });
      dispatch(answerQuestion( { _id, answer }));

    }
  };

  const handleCancelClick = (_id) => {
    setAnswerValues((prevValues) => ({
      ...prevValues,
      [_id]: "", // İptal edildiğinde ilgili input değerini boş yapıyoruz
    }));
    // İptal request fonksiyonunu burada çağırın ve `_id`'yi geçin
    console.log("İptal request oluşturuldu:", { _id });
    dispatch(cancelQuestion( { _id }));
  };

  return (
    <>
      <div className="chat-container">
        {/* Messages Section */}
        <Row>
          <Col>
            {isLoading ? (
              <div className="mt-auto justify-content-center">
                <Spinner className="text-center" />
              </div>
            ) : (
              <></>
            )}
            <div className="messages-scroll-container">
              <ListGroup>
                {llmMessage != "" ? (
                  <ListGroup.Item className="messages-container">
                    <div className="messages-section">
                      <section className="message user-message">
                        <p>{llmMessage}</p>
                      </section>
                      {/*  <section className="message ai-message">
                        <p>I want to know more about AI.</p>
                      </section> */}
                      {/* More messages can go here */}
                    </div>
                  </ListGroup.Item>
                ) : (
                  <></>
                )}

                {llmQuestions.length >= 1 ? (
                  llmQuestions.map((item, index) => {
                    const { _id, question } = item;
                    return (
                      <ListGroup.Item key={_id} className="messages-container">
                        <Row>
                          <Col lg="3">
                            <p>{question}</p>
                          </Col>
                          <Col lg="6">
                            <InputGroup className="mb-3">
                              <Form.Control
                                size="xs"
                                placeholder="Soru için bir açıklamada bulunabilirsiniz?"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={answerValues[_id] || ""} // Her bir inputun değeri ayrı ayrı kontrol ediliyor
                                onChange={(event) =>
                                  handleQuestionsChange(_id, event)
                                } // Değişiklikleri izlemek için _id'i gönderiyoruz
                              />
                              <ButtonGroup>
                                <Button
                                  variant="outline-secondary"
                                  id="button-addon2"
                                  onClick={() => handleSendClick(_id)} // Gönder butonuna tıklanınca çalışacak
                                >
                                  Gönder
                                </Button>
                                <Button
                                  onClick={() => handleCancelClick(_id)} // İptal butonuna tıklanınca çalışacak
                                  variant="danger"
                                  id="button-addon2"
                                >
                                  İptal
                                </Button>
                              </ButtonGroup>
                            </InputGroup>
                          </Col>

                          {/*  <section className="message ai-message">
                        <p>I want to know more about AI.</p>
                      </section> */}
                          {/* More messages can go here */}
                        </Row>
                      </ListGroup.Item>
                    );
                  })
                ) : (
                  <></>
                )}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </div>

      {/* Fixed Bottom Company Cards */}
      <Row className="fixed-bottom company-cards-container">
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
                <Button
                  onClick={() => {
                    setllmQuestions([]);
                    setLLMMessages("");
                    setConversitionId(Math.floor(Math.random() * 1000001));
                  }}
                  variant="danger"
                  id="button-addon2"
                >
                  Temizle
                </Button>
              </ButtonGroup>
            </InputGroup>
          </Form>
        </Col>
        <Col xl="2" />
      </Row>
      {results.length != 0 ? (
        <>
          <Row className="fixed-bottom company-cards-container">
            {results.map((item) => {
              return (
                <Col>
                  <CompanyCard />
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
