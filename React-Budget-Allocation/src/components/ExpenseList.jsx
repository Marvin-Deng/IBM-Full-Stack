import React, { useContext } from "react";
import ExpenseItem from "@/components/ExpenseItem";
import { AppContext } from "@/context/AppContext";

const ExpenseList = () => {
  const { expenses } = useContext(AppContext);

  return (
    <div style={{ maxWidth: "1000px", width: "100%", margin: "auto" }}>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Department</th>
            <th scope="col">Allocated Budget</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseItem
              id={expense.id}
              key={expense.id}
              name={expense.name}
              quantity={expense.quantity}
              unitprice={expense.unitprice}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
