import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { FaTimesCircle, FaPlus, FaMinus } from "react-icons/fa";

const ExpenseItem = (props) => {
  const { dispatch, Location } = useContext(AppContext);

  const handleDeleteItem = () => {
    const item = {
      name: props.name,
    };

    dispatch({
      type: "DELETE_ITEM",
      payload: item,
    });
  };

  const handleIncreaseQuantity = () => {
    const item = {
      name: props.name,
      quantity: 1,
    };

    dispatch({
      type: "ADD_QUANTITY",
      payload: item,
    });
  };

  const handleReduceQuantity = () => {
    const item = {
      name: props.name,
      quantity: 1,
    };

    dispatch({
      type: "RED_QUANTITY",
      payload: item,
    });
  };

  return (
    <tr>
      <td style={{ fontSize: "18px" }}>{props.name}</td>
      <td style={{ fontSize: "18px" }}>
        {Location}
        {parseInt(props.quantity) * parseInt(props.unitprice)}
      </td>
      <td style={{ fontSize: "18px" }}>
        {Location}
        {parseInt(props.unitprice)}
      </td>
      <td style={{ fontSize: "18px" }}>
        <FaPlus
          onClick={handleIncreaseQuantity}
          style={{ cursor: "pointer", marginRight: "5px" }}
        />
        {props.quantity}
        <FaMinus
          onClick={handleReduceQuantity}
          style={{ cursor: "pointer", marginLeft: "5px" }}
        />
      </td>
      <td style={{ fontSize: "18px" }}>
        <FaTimesCircle
          size="1.8em"
          color="red"
          onClick={handleDeleteItem}
          style={{ cursor: "pointer" }}
        />
      </td>
    </tr>
  );
};

export default ExpenseItem;
