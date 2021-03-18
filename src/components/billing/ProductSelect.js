import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { addLineItems } from "../../redux/actions/billActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: "20px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ProductSelect = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [productID, setProductID] = useState(
      localStorage.getItem("productID")? localStorage.getItem("productID") : ""
  );
  const [qty, setQty] = useState(
      localStorage.getItem('qty')? parseInt(localStorage.getItem("qty")): 1
  );

  const handleProductID = (e) => {
    setProductID(e.target.value);
  };

  const handleClick = () => {
    if (productID.length > 0 && qty) {
      const data = {
        product: productID,
        quantity: qty,
      };
      console.log(data)
      dispatch(addLineItems(data));
      setProductID("");
      setQty(1);
    } else {
      swal("Ohh..", "You are missing some fields", "error");
    }
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Product</InputLabel>
        <Select
          native
          value={productID}
          onChange={handleProductID}
          label="Product"
          inputProps={{
            name: "product",
            id: "outlined-product-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          {products.map((product) => {
            return (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <Button
        style={{ marginTop: "30px" }}
        variant="contained"
        onClick={() => {
          setQty(qty === 1 ? 1 : qty - 1);
          localStorage.setItem("qty", qty - 1);
        }}
      >
        {" "}
        -{" "}
      </Button>
      <Typography
        style={{ display: "inline", marginLeft: "10px", marginRight: "10px" }}
      >
        {qty}
      </Typography>
      <Button
        style={{ marginTop: "30px" }}
        variant="contained"
        onClick={() => {
          setQty(qty + 1);
          localStorage.setItem("qty", qty + 1);
        }}
      >
        {" "}
        +{" "}
      </Button>
      <Button
        style={{ marginTop: "30px", marginLeft: "10px" }}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {" "}
        ADD{" "}
      </Button>
    </div>
  );
};

export default ProductSelect;
