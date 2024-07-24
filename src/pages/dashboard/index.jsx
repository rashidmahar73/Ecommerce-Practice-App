import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Card, Row, Col, Container, Button, Form } from "react-bootstrap";
import "./styles.css";
import { fetchProducts } from "../../actionCreator/actionCreator";

function Dashboard() {
  const [category, setCategory] = useState("beauty");

  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const productDetails = useSelector((state) => state.ApiReducer.data);
  const thunkLoading = useSelector((state) => state.ApiReducer.loading);


  function handleNewOne(e, item) {
    navigate("/productDetail", { state: item });
  }

  const uniqueCategorytList = [];

  productDetails.forEach((element) => {
    const isDuplicate = uniqueCategorytList.includes(element.category);

    if (isDuplicate) return false;

    uniqueCategorytList.push(element.category);
    return true;
  });

  function handleCheckboxItem(productCategroy) {
    setCategory(productCategroy);
  }

  const filteredList = useMemo(
    () =>
      productDetails.filter((item) =>
        category === item.category ? item : !item
      ),
    [category, productDetails]
  );

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <>
      {thunkLoading ? (
        <ClipLoader
          color="#ffffff"
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <React.Fragment>
          <Container>
            <Row>
              <Col lg={3}>
                <h5>Product Type</h5>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => handleCheckboxItem(e.target.value)}
                    >
                      {uniqueCategorytList?.map((item) => {
                        return (
                          <option key={`produt-category${item}`} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              {filteredList &&
                filteredList.map((item) => {
                  const { title, thumbnail, description, price } = item;
                  return (
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
                        <Card.Body>
                          <Card.Title>{title}</Card.Title>
                          <Card.Text>{description?.slice(0, 30)}...</Card.Text>
                        </Card.Body>
                        <span
                          style={{ fontWeight: "bold" }}
                        >{`$${price}`}</span>
                        <Button onClick={(e) => handleNewOne(e, { item })}>
                          Details
                        </Button>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </React.Fragment>
      )}
    </>
  );
}

export { Dashboard };
