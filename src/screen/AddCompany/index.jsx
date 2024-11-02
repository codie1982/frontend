import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCompany,
  resetCompanyState,
} from "../../features/company/companySlice";
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
import ReactGA from "react-ga4";
import logo from "../../assets/logo.jpeg";

function AddCompany() {
  const [companyTitle, setCompanyTitle] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (companyTitle != "" && companyDescription != "") {
      dispatch(
        addCompany({ title: companyTitle, description: companyDescription })
      );
    }
  };

  const company = useSelector((state) => {
    return state.company;
  });
  useEffect(() => {
    resetCompanyState();
  }, []);

  useEffect(() => {
    if (company.isLoading) {
      setIsLoading(true);
    } else {
      if (company.isSuccess) {
        setIsLoading(false);
      }
    }

    if (company.isError) {
      setIsLoading(false);
    }
  }, [company]);
  return (
    <div>
      <Row className="mt-auto justify-content-center">
        <Col xs={6} md={4} className="text-center">
          <div className="logo-container">
            <Image src={logo} fluid rounded className="centered-logo" />
          </div>
        </Col>
      </Row>
      {isLoading ? (
        <div className="mt-auto justify-content-center">
          <Spinner className="text-center" />
        </div>
      ) : (
        <>
          <Row>
            <Col>
              <div className="text-center">
                <h1>Firmanı Ekle</h1>
              </div>
            </Col>
          </Row>
          <Row className="mt-auto justify-content-center">
            <Col xs={6} md={4} className="">
              <div className="">
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    className="mb-12"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Firma Adın</Form.Label>
                    <Form.Control
                      type="text"
                      value="GRNT3D Mimari Modelleme"
                      placeholder=""
                      onChange={(e) => {
                        setCompanyTitle(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-12"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Bize Kendinden bahset</Form.Label>
                    <Form.Control
                      as="textarea"
                      value="3D modelleme ve render işlemleri"
                      rows={3}
                      onChange={(e) => {
                        setCompanyDescription(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <div className="d-grid gap-2 mt-2">
                    <Button type="submit" variant="primary">
                      Firmayı Ekle
                    </Button>{" "}
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default AddCompany;
