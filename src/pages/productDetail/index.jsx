import { useDispatch } from "react-redux";
import { Col, Image, Card, Table, Button } from "react-bootstrap";

import { productList } from "../../redux";

function ProductDetail({ item }) {
  const product = item;
  
  const dispatch = useDispatch();

  return (
    <div>
      <Image src={product?.thumbnail} alt="productImage" />
      {product?.images?.map((item, index) => (
        <Col key={index}>
          <Card style={{ width: "5rem" }} key={index}>
            <Card.Img variant="top" src={item} />
          </Card>
        </Col>
      ))}
      <Table responsive borderless key={`product-detail-${product?.id}`}>
        <thead>
          <tr>
            <td>Product Name </td>
            <td>Brand</td>
            <td>Category</td>
            <td>Description</td>
            <td>Rating</td>
            <td>Stock</td>
            <td>Price</td>
            <td> Discount Percentage</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product?.title}</td>
            <td>{product?.brand}</td>
            <td>{product?.category}</td>
            <td>{product?.stock}</td>
            <td>{product?.price}</td>
            <td>{product?.discountPercentage}</td>
          </tr>
        </tbody>
      </Table>
      <Button
        variant="secondary"
        onClick={() => {
          dispatch(productList(product));
        }}
      >
        Cart
      </Button>
    </div>
  );
}

export { ProductDetail };
