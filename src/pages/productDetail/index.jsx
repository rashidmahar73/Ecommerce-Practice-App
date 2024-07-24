import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Row,
  Container,
  Col,
  Image,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { Navv } from "../../component";

import { increment, perProductTotalPrice, productIncrement, productQuantiIncrement } from "../../reducer/addProductsReducer";

function ProductDetail() {
  const { state = {} } = useLocation();

  const product = state?.item;

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
        <Row>
          <Col>
            <Image src={product?.thumbnail} alt="productImage" />
            <Row style={{ height: "10px" }} />
            <Row key={`product-images-${product?.id}`}>
              {product?.images?.map((item, index) => (
                <Col key={index}>
                  <Card style={{ width: "5rem" }} key={index}>
                    <Card.Img variant="top" src={item} />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col>
            <Table responsive borderless key={`product-detail-${product?.id}`}>
              <thead>
                <tr>
                  <td>Product Name : {product?.title}</td>
                </tr>
                <tr>
                  <td>Brand : {product?.brand}</td>
                </tr>
                <tr>
                  <td>Category : {product?.category}</td>
                </tr>
                <tr>
                  <td>Description : {product?.description}</td>
                </tr>
                <tr>
                  <td>Rating : {product?.rating}</td>
                </tr>
                <tr>
                  <td>Stock : {product?.stock}</td>
                </tr>
                <tr>
                  <td>Price : {product?.price}</td>
                </tr>
                <tr>
                  <td> Discount Percentage : {product?.discountPercentage}</td>
                </tr>
                <tr>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        dispatch(increment(product));
                        dispatch(productIncrement(`${product?.title}`));
                        dispatch(perProductTotalPrice(`${product.title}`));
                        dispatch(
                          productQuantiIncrement(`${Number(product.price)}`)
                        );
                      }}
                    >
                      Cart
                    </Button>
                  </td>
                </tr>
              </thead>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export { ProductDetail };
