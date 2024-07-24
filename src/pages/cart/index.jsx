import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";
import {
  productQuantiIncrement,
  productQuantiDecrement,
  productIncrement,
  removeElement,
  productDecrement,
  perProductTotalPrice,
} from "../../reducer/addProductsReducer";
import { Navv } from "../../component";
import "./styles.css";

function Cart() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.productQuantity.ary);
  const cart = useSelector((state) => state.productQuantity.value);
  const summaryItems = useSelector(
    (state) => state.productQuantity.summaryItem
  );
  const pricee = useSelector((state) => state.productQuantity.total);
  return (  
    <>
      <Navv />
      <Container className="my-5">
        <h2 className="mb-4">Shopping Cart</h2>
        <Row>
          <Col md={8}>
            {data.length > 0 ? (
              data.map((item) => (
                <Card key={item.id} className="mb-3">
                  <Card.Body>
                    <Row>
                      <Col md={4}>
                        <Card.Img
                          variant="top"
                          src={item.thumbnail}
                          alt={item.title}
                        />
                      </Col>
                      <Col md={4}>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>
                          ${item.price}
                          <p style={{ fontSize: "15px" }}>
                            <span style={{ fontWeight: "bold" }}>Brand :</span>{" "}
                            {item.brand}
                          </p>
                          <p style={{ fontSize: "15px" }}>
                            <span style={{ fontWeight: "bold" }}>
                              Category :
                            </span>{" "}
                            {item.category}
                          </p>
                        </Card.Text>
                        <Col></Col>
                        <Button
                          variant="danger"
                          onClick={() => {
                            dispatch(
                              removeElement(`${(item.title, item.quantity)}`)
                            );
                          }}
                        >
                          Remove
                        </Button>
                      </Col>
                      <Col md={4}>
                        <Button
                          variant="light"
                          size="sm"
                          onClick={
                            summaryItems > 0
                              ? () => {
                                  dispatch(
                                    productQuantiDecrement(
                                      `${Number(item.price)}`
                                    )
                                  );
                                  dispatch(productDecrement(`${item.title}`));
                                }
                              : () => {}
                          }
                        >
                          -
                        </Button>
                        {item.quantity}
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => {
                            dispatch(productIncrement(`${item.title}`));
                            dispatch(
                              productQuantiIncrement(`${Number(item.price)}`)
                            );
                            dispatch(perProductTotalPrice(`${item.title}`));
                          }}
                        >
                          +
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <h4>Your cart is empty</h4>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Order Summary</span>
                    <span>{cart}</span>
                  </div>
                </Card.Title>
                <ListGroup variant="flush">
                  {data.map((item) => (
                    <ListGroup.Item key={item.id}>
                      {item.title} x {item.quantity} = $
                      {item.price * item.quantity}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <hr />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Total Items {summaryItems} </span>
                  <span>Total Price {pricee}</span>
                </div>
                <Button variant="success" className="mt-3" block>
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export { Cart };
