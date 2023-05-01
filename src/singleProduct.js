import { useLocation } from "react-router-dom";
import Navv from "./Components/Navv";
import {
  Row,
  Container,
  Col,
  Image,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { increment } from "./Reducer/AddProductsReducer";
import { useDispatch } from "react-redux";

export function SingleProductt() {
  const object = useLocation();

  const item = object?.state?.item;
  const {
    id,
    brand,
    category,
    description,
    discountPercentage,
    images,
    price,
    rating,
    stock,
    thumbnail,
    title,
  } = item;
  const dispatch = useDispatch();
  return (
    <>
      <Navv />
      <Container>
        <Row style={{ height: "30px" }} />
        <Row>
          <Col>
            <h1 style={{ textAlign: "center" }}>Product Details</h1>
          </Col>
        </Row>
        <Row style={{ height: "30px" }} />
        {item && (
          <>
            <Row>
              <Col>
                <Image src={thumbnail} alt="productImage" />
                <Row style={{ height: "10px" }} />
                <Row key={id}>
                  {images &&
                    images.map((item, index) => {
                      return (
                        // Here is the key issue unique
                        <>
                          <Col key={index}>
                            <Card style={{ width: "5rem" }} key={index}>
                              <Card.Img variant="top" src={item} />
                            </Card>
                          </Col>
                        </>
                      );
                    })}
                </Row>
              </Col>
              <Col>
                <Table responsive borderless key={id}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>{title}</th>
                    </tr>
                    <tr>
                      <td>Brand : {brand}</td>
                    </tr>
                    <tr>
                      <td>Category : {category}</td>
                    </tr>
                    <tr>
                      <td>Description : {description}</td>
                    </tr>
                    <tr>
                      <td>Rating : {rating}</td>
                    </tr>
                    <tr>
                      <td>Stock : {stock}</td>
                    </tr>
                    <tr>
                      <td>Price : {price}</td>
                    </tr>
                    <tr>
                      <td> Discount Percentage : {discountPercentage}</td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            dispatch(increment(item));
                          }}
                        >
                          AddtoCart
                        </Button>
                      </td>
                    </tr>
                  </thead>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
