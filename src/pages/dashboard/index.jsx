import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { Card, Row, Col, Container, Button, Form } from "react-bootstrap";
import {fetchProducts,productList} from "../../redux"
import { ModalModule, Navv } from "../../component";
import { ProductDetail } from "../productDetail";
import "./styles.css";

function Dashboard() {
  const [category, setCategory] = useState("beauty");
  const [isDetailModal, setIsDetailModal] = useState(false);
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const productDetails = useSelector((state) => state.ApiReducer.data);
  const thunkLoading = useSelector((state) => state.ApiReducer.loading);

  function handleDetails(item) {
    setIsDetailModal(true);
    setProduct(item);
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
          <Navv />
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
                      {uniqueCategorytList?.map((item) => (
                        <option key={`produt-category${item}`} value={item}>
                          {item}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              {filteredList?.map((item) => (
                <Col lg={3} style={{ marginBottom: "10px" }}>
                  <Card className="card">
                    <Card.Img
                      variant="top"
                      src={item?.thumbnail}
                      className="card-img"
                    />
                    <Card.Body>
                      <Card.Title className="card-title">
                        {item?.title}
                      </Card.Title>
                      <Card.Text className="card-text">
                        {item?.description?.slice(0, 30)}...
                      </Card.Text>
                    </Card.Body>
                    <span className="card-price">{`$${item?.price}`}</span>
                    <div className="card-buttons">
                      <Button onClick={() => handleDetails(item)}>
                        Details
                      </Button>
                      <Button
                        onClick={() => {
                          const copyItem = {
                            ...item,
                            quantity: 1,
                            totalproductprice: item.price,
                          };
                          dispatch(productList(copyItem));
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          <ModalModule
            isOpen={isDetailModal}
            setIsOpen={setIsDetailModal}
            heading="Detail"
          >
            <ProductDetail item={product} />
          </ModalModule>
        </React.Fragment>
      )}
    </>
  );
}

export { Dashboard };
