import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navv from "./Components/Navv";
import { Carousell } from "./Components/Carousell";
import GetData from "./HomePage";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "./actionCreator/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const thunkLoading = useSelector((state) => state.ApiReducer.loading);
  let [color, setColor] = useState("#ffffff");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <>
      {thunkLoading ? (
        <ClipLoader
          color={color}
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <React.Fragment>
          {/* <Navv /> */}
          <GetData />
        </React.Fragment>
      )}

      {/* <Carousell/> */}
    </>
  );
}

export default App;
