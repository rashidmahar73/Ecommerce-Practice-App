import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import {
  productQuantiIncrement,
  productQuantiDecrement,
  productIncrement,
  removeElement,
  productDecrement,
  perProductTotalPrice,
} from "./Reducer/AddProductsReducer";
import Navv from "./Components/Navv";
import "../src/BookedCart.css";

export function BookedCartProducts() {
  const data = useSelector((state) => state.productQuantity.ary);
  const cart = useSelector((state) => state.productQuantity.value);
  const summaryItems = useSelector(
    (state) => state.productQuantity.summaryItem
  );
  const pricee = useSelector((state) => state.productQuantity.total);

  const dispatch = useDispatch();
  return (
    <>
      <Navv />
      <Container style={{ backgroundColor: "lightblue" }}>
        <Row style={{ height: "70px" }}>
          <Col>
            {" "}
            <h1 style={{ textAlign: "center" }}> Products</h1>
          </Col>
        </Row>
        <Row style={{ backgroundColor: "white" }}>
          <Col lg={9} sm={6} style={{display:"flex", justifyContent:"space-evenly"}}>
            <div style={{width: "100%"}}>
            <h5 style={{ color: "black"}}>Shopping cart </h5>
            <hr/>
            </div>
            <div style={{    alignSelf: "flex-end",width: "100%"}}>
            <h5 style={{ color: "black",textAlign:"end"}}>{cart} Items</h5>
            <hr/>
            </div>
          </Col>
          <Col lg={3} sm={6} style={{backgroundColor:"lightblue"}}>
          <div style={{width: "100%"}}>
            <h5 style={{ color: "black",textAlign:"center" }}>Order Summary</h5>
            <hr/>
            </div>
          </Col>
        </Row>
        <Row style={{ backgroundColor: "white" }}>
          <Col lg={9}>
            {data &&
              data.map((item) => {
                const {
                  id,
                  title,
                  price,
                  thumbnail,
                  quantity,
                  brand,
                  category,
                  totalproductprice,
                } = item;
                return (
                  <>
                    <Table striped hover key={id}>
                      <thead>
                        <tr>
                          <th>Product Details</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key={id}>
                          <td>
                            <Row>
                              <Col>
                                <Card className="cardDesign">
                                  <Card.Img variant="top" src={thumbnail} />
                                </Card>
                              </Col>
                              <Col>
                                <h5>{title}</h5>
                                <p style={{ fontSize: "15px" }}>
                                  <span style={{ fontWeight: "bold" }}>
                                    Brand :
                                  </span>{" "}
                                  {brand}
                                </p>
                                <p style={{ fontSize: "15px" }}>
                                  <span style={{ fontWeight: "bold" }}>
                                    Category :
                                  </span>{" "}
                                  {category}
                                </p>
                              </Col>
                            </Row>
                          </td>
                          <td>
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => {
                                dispatch(
                                  productQuantiDecrement(`${Number(price)}`)
                                );
                                dispatch(productDecrement(`${title}`));
                              }}
                            >
                              -
                            </Button>
                            {quantity}
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => {
                                dispatch(productIncrement(`${title}`));
                                dispatch(
                                  productQuantiIncrement(`${Number(price)}`)
                                );
                                dispatch(
                                  perProductTotalPrice(`${title}`)
                                );
                              }}
                            >
                              +
                            </Button>
                          </td>
                          <td>{`$${price}`}</td>
                          <td>{`$${totalproductprice}`}</td>
                          <td>
                            <Button
                              onClick={() => {
                                dispatch(removeElement(`${title,quantity}`));
                              }}
                            >
                              Remove Button
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </>
                );
              })}
          </Col>
          <Col lg={3} style={{backgroundColor:"lightblue"}}>
            <Table>
              <thead>
                <tr>
                  <th>{`Items ${summaryItems}`}</th>
                  <th>{`$${pricee}`}</th>
                </tr>
              </thead>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
