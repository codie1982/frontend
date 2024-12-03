import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCompany, resetCompanyState } from "../../features/company/companySlice";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Badge, Stack, Form, Image, Spinner } from "react-bootstrap";

import logo from "../../assets/logo.jpeg";

function AddCompany() {
  const [companyTitle, setCompanyTitle] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [salesType, setSalesType] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (companyTitle && companyDescription && salesType) {
      dispatch(
        addCompany({
          title: companyTitle,
          description: companyDescription,
          type: salesType,
          categories: categories,
        })
      );
    }
  };

  const company = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(resetCompanyState());
  }, [dispatch]);

  const addCategories = (value) => {
    setCategories((prevValue) => {
      if (!prevValue.includes(value) && value !== "Bir Firma Kategorisi Seçin") {
        return [...prevValue, value];
      }
      return prevValue;
    });
  };

  const removeCategory = (value) => {
    setCategories((prevValue) => prevValue.filter((item) => item !== value));
  };

  useEffect(() => {
    setIsLoading(company.isLoading);

    if (company.isSuccess) {
      setIsLoading(false);
      navigate("/"); // Başarılı olduğunda yönlendirme
    }

    if (company.isError) {
      setIsLoading(false);
    }
  }, [company, navigate]);

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
        <div className="d-flex justify-content-center mt-3">
          <Spinner animation="border" />
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
            <Col xs={6} md={4}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Satış Türünü Seç</Form.Label>
                  <Form.Check
                    type="radio"
                    id="services"
                    name="sales"
                    value="services"
                    label="Hizmet Sektörü"
                    onChange={(e) => setSalesType(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    id="commercial"
                    value="commercial"
                    name="sales"
                    label="E-Ticaret"
                    onChange={(e) => setSalesType(e.target.value)}
                  />
                </Form.Group>

                {salesType === "services" && (
                  <>
                    <Form.Label>Firma Kategori</Form.Label>
                    <Form.Select onChange={(e) => addCategories(e.target.value)} aria-label="Default select example">
                      <option>Bir Firma Kategorisi Seçin</option>
                      <option value="3D Modelleme">3D Modelleme</option>
                      <option value="Mimarlık">Mimarlık</option>
                      <option value="Dekorasyon">Dekorasyon</option>
                    </Form.Select>

                    <Row className="mt-2">
                      <Col>
                        <Stack direction="horizontal" gap={2}>
                          {categories.map((item, index) => (
                            <Badge
                              style={{ cursor: "pointer" }}
                              key={index}
                              onClick={() => removeCategory(item)}
                              bg="primary"
                            >
                              {item}
                            </Badge>
                          ))}
                        </Stack>
                      </Col>
                    </Row>
                  </>
                )}

                <Form.Group className="mb-3" controlId="companyTitle">
                  <Form.Label>Firma Adın</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Firma adını girin"
                    value={companyTitle}
                    onChange={(e) => setCompanyTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="companyDescription">
                  <Form.Label>Bize Kendinden Bahset</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Firma hakkında bilgi verin"
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2 mt-2">
                  <Button type="submit" variant="primary">
                    Firmayı Ekle
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default AddCompany;
