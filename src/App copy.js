import React, { useReducer, useState } from "react";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "addTextBox":
      return [...state, action.result];

    case "updateFieldData":
      return [...action.result];

    default:
      return state;
  }
};

function App() {
  const [fieldData, dispatch] = useReducer(reducer, []);
  const [inputCount, setInputCount] = useState(1);
  const [allChecked, setAllChecked] = useState(false);

  const addTextBox = (e) => {
    e.preventDefault();
    for (let i = 0; i < inputCount; i++) {
      dispatch({
        type: "addTextBox",
        result: {
          value: "",
          check: false,
        },
      });
    }
  };

  const handleInputCount = (e) => {
    setInputCount(e.target.value);
  };

  const updateFieldData = (index, key, value) => {
    const field = fieldData;
    fieldData[index][key] = value;

    dispatch({
      type: "updateFieldData",
      result: field,
    });
  };

  const handleAllCheck = (e) => {
    setAllChecked(!allChecked);

    fieldData.forEach((item, index) => {
      updateFieldData(index, "check", !allChecked);
    });
  };

  // ***** PRINTING RESULT *****
  let totalNumber = 0;
  const selected = [];

  fieldData.forEach((elem, index) => {
    if (elem.check) {
      selected.push(index + 1);
      totalNumber += Number(elem.value);
    }
  });

  const selectedPosition =
    fieldData[0] && selected.length === fieldData.length
      ? `All ${selected.length} items `
      : `${selected.length} items, there position is ${selected.map(
          (item) => `${item}`
        )},`;

  return (
    <div className="App">
      {/* Adding Textbox */}
      <form onSubmit={addTextBox}>
        <input type="number" value={inputCount} onChange={handleInputCount} />

        <button onSubmit={addTextBox}>Add Textbox</button>
      </form>

      {/* Check All */}
      {fieldData[1] && (
        <div className="input-container">
          <input
            type="checkbox"
            id="allCheck"
            checked={allChecked}
            onChange={handleAllCheck}
          />
          <label htmlFor="allCheck">Check All</label>
        </div>
      )}

      {/* Input Boxes */}
      <div className="input-container">
        {fieldData.map((item, index) => (
          <div className="form-control" key={index}>
            <input
              type="checkbox"
              checked={item.check}
              onChange={(e) => updateFieldData(index, "check", !item.check)}
            />
            <input
              type="number"
              className="inputNumber"
              value={item.value}
              onChange={(e) =>
                updateFieldData(index, "value", e?.target?.value)
              }
            />
          </div>
        ))}
      </div>

      {/* Result Printing */}
      <p>
        Selected <b>{selectedPosition}</b> and Total Number is{" "}
        <b>{totalNumber}</b>
      </p>
    </div>
  );
}

export default App;
