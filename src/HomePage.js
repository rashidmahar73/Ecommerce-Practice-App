import { Card, Row, Col, Container, Button, Form } from "react-bootstrap";
import "./ApiHit.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
// import {Button} from "react-bootstrap";

export default function GetData() {
  const apiData = useSelector((state) => state.ApiReducer.data);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchArray, setSearchArray] = useState("");
  const [filteredListItem, setFilteredListItem] = useState("");
  function handleNewOne(e, item) {
    navigate("/SingleProduct", { state: item });
  }
  // UniqueCategoriesName
  const uniqueIds = [];

  apiData.forEach((element) => {
    const isDuplicate = uniqueIds.includes(element.category);

    if (!isDuplicate) {
      uniqueIds.push(element.category);
      return true;
    }
    return false;
  });
  // UniqueCategoriesName
  // SearchFieldWithButton
  function handleSearch(e) {
    apiData.forEach((item) => {
      if (e.target.value === item.category) {
        setSearch(e.target.value);
      }
    });
  }
  function handlesearchData() {
    const filterSearchData = apiData.filter((item) =>search === item.category?item:!item);
    setSearchArray(filterSearchData);
  }
  // SearchFieldWithButton
  // handleCheckboxItem Array
  function handleCheckboxItem(event) {
    if (event.target.checked === true) {
      const filterSearchData = apiData.filter((item) => event.target.id === item.category?item:!item);
      setFilteredListItem(filterSearchData);
    } else if (event.target.checked === false) {
      return setFilteredListItem("");
    }
  }
  // ListItemSearch Array
  return (
    <>
      <Container>
        <Row>
          <Col lg={3}>
            <h5>Product Type</h5>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                onChange={(e) => {
                  handleSearch(e);
                }}
              >
                <Form.Control type="email" placeholder="Search Category" />
                {uniqueIds.map((item) => {
                  return (
                    <>
                      <div key={`default-${item}`} className="mb-3">
                        <Form.Check
                          type="checkbox"
                          id={`${item}`}
                          label={` ${item}`}
                          onChange={(event) => {
                            handleCheckboxItem(event);
                          }}
                        />
                      </div>
                    </>
                  );
                })}
              </Form.Group>
            </Form>
            <Button onClick={handlesearchData}>Category</Button>
          </Col>
          <Col lg={9}>
            {filteredListItem &&
              filteredListItem.map((item) => {
                const { title, thumbnail, description, price } = item;
                return (
                  <>
                    <Row>
                      <Col lg={3}>
                        <Card
                          style={{
                            width: "10rem",
                            border: "none",
                          }}
                        >
                          <Card.Img
                            variant="top"
                            src={thumbnail}
                            className="img-fluid"
                          />
                        </Card>
                      </Col>
                      <Col lg={7}>
                        <Card style={{ border: "none" }}>
                          <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>{description}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col lg={1}>
                        <span
                          style={{ fontWeight: "bold" }}
                        >{`$${price}`}</span>
                        <Button onClick={(e) => handleNewOne(e, { item })}>
                          Details
                        </Button>
                      </Col>
                      <Col lg={1} />
                    </Row>
                  </>
                );
              })}
          </Col>
        </Row>
      </Container>
      {/* <Container>
        <Row style={{ height: "30px" }} />
        <Row>
          <Row>
            <Col>
              {" "}
              <h3 style={{ textAlign: "center" }}> SmartPhones</h3>
            </Col>
          </Row>
          {apiData &&
            apiData.slice(0, 5).map((item) => {
              const { id, title, thumbnail } = item;
              return (
                <Col key={id} xs={12} md={4} lg={2}>
                  <Card
                    style={{ width: "10rem", justifyContent: "space-around" }}
                    onClick={(e) => handleNewOne(e, { item })}
                  >
                    <Card.Img
                      variant="top"
                      src={thumbnail}
                      className="img-fluid"
                    />
                    <Card.Body>
                      <Card.Title key={id}>{title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
        <Row style={{ height: "10px" }}></Row>
      </Container>
      <Container>
        <Row style={{ height: "30px" }} />
        <Row>
          <Row>
            <Col>
              {" "}
              <h3 style={{ textAlign: "center" }}> Laptops</h3>
            </Col>
          </Row>
          {apiData &&
            apiData.slice(5, 10).map((item) => {
              const { id, title, thumbnail } = item;
              return (
                <Col key={id} xs={12} md={4} lg={2}>
                  <Card
                    style={{ width: "10rem", justifyContent: "space-around" }}
                    onClick={(e) => handleNewOne(e, { item })}
                  >
                    <Card.Img
                      variant="top"
                      src={thumbnail}
                      className="img-fluid"
                    />
                    <Card.Body>
                      <Card.Title key={id}>{title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
        <Row style={{ height: "10px" }}></Row>
      </Container> */}
    </>
  );
}
