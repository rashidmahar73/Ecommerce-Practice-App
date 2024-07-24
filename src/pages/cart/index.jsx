import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { Navv } from "../../component";
import { productIncrement,productDecrement,removeElement } from "../../redux";

function Cart() {
  const dispatch = useDispatch();

  const productItems = useSelector(
    (state) => state.productQuantity.productItems
  );

  function calculateTotal(dataArray) {
    return dataArray.reduce(
      (acc, item) => {
        acc.quantity += item.quantity;
        acc.totalproductPrice += item.totalproductprice;
        return acc;
      },
      { quantity: 0, totalproductPrice: 0 }
    );
  }

  const stats = calculateTotal(productItems);

  return (
    <>
      <Navv />
      <Container className="my-5">
        <h2 className="mb-4">Shopping Cart</h2>
        <Row>
          <Col md={8}>
            {productItems.length > 0 ? (
              productItems.map((item) => (
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
                              removeElement(`${item.id}`)
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
                          onClick={() => {
                            if (item.quantity === 1) return;
                            dispatch(productDecrement(`${item.id}`));
                          }}
                        >
                          -
                        </Button>
                        {item.quantity}
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => {
                            dispatch(productIncrement(`${item.id}`));
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
                    <span>{productItems?.length}</span>
                  </div>
                </Card.Title>
                <ListGroup variant="flush">
                  {productItems.map((item) => (
                    <ListGroup.Item key={item.id}>
                      {item.title} x {item.quantity} = $
                      {(item.price * item.quantity).toFixed(2)}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <hr />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Total Items {stats.quantity} </span>
                  <span>Total Price ${stats.totalproductPrice?.toFixed(2)}</span>
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
