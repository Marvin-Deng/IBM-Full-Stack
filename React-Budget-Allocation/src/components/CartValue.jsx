import React, { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { toast, Toaster } from "react-hot-toast";

const CartValue = () => {
  const { expenses, dispatch, Location } = useContext(AppContext);
  const [budget, setBudget] = useState("");
  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.unitprice * item.quantity);
  }, 0);
  const remaining = budget - totalExpenses;

  const changeLocation = (val) => {
    dispatch({
      type: "CHG_LOCATION",
      payload: val,
    });
  };

  const backgroundStyle = {
    backgroundColor: "#add8e6",
    padding: "10px",
    borderRadius: "15px",
    margin: "10px",
    color: "#1E90FF",
    fontWeight: "bold",
  };

  const handleBudgetChange = (event) => {
    const newBudget = event.target.value;

    if (newBudget > 20000) {
      toast.error("Budget cannot exceed 20000");
    } else if (newBudget < totalExpenses) {
      toast.error("Budget cannot be lower than total spending");
    } else {
      setBudget(newBudget);
    }
  };

  return (
    <>
      <h2 style={{ marginTop: "80px" }}>Expense Tracker</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{ ...backgroundStyle, display: "flex", alignItems: "center" }}
        >
          <label htmlFor="cost" style={{ marginRight: "10px" }}>
            Budget: {Location}
          </label>
          <input
            required="required"
            type="number"
            id="cost"
            value={budget}
            style={{ fontWeight: "bold" }}
            onChange={handleBudgetChange}
          />
        </div>
        <div style={{ ...backgroundStyle, width: "300px" }}>
          Remaining: {Location}
          <span style={{ fontWeight: "bold" }}>{remaining}</span>
        </div>
        <div style={{ ...backgroundStyle, width: "300px" }}>
          Spent: {Location}
          <span style={{ fontWeight: "bold" }}>{totalExpenses}</span>
        </div>
        <div style={{ ...backgroundStyle, width: "300px" }}>
          <select
            name="Location"
            id="Location"
            onChange={(event) => changeLocation(event.target.value)}
            style={{ height: "30px" }}
          >
            <option disabled value="" selected>
              Currency
            </option>
            <option value="£">Uk(£)</option>
            <option value="₹">India(₹)</option>
            <option value="€">Europe(€)</option>
            <option value="CAD">Canada(CAD)</option>
          </select>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default CartValue;
