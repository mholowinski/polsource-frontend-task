import React, { useState } from "react";

const RowForm = ({ saveTodo }) => {
  const [rowValue, setRowValue] = useState({
    id: 1,
    todoValue: "todo",
    priorityValue: "low",
    isDone: false
  });

  function handleChange(evt) {
    //setRowValue(evt.target.value);
    const value = evt.target.value;
    setRowValue({
      ...rowValue,
      [evt.target.name]: value,
    });
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault(); //?
        saveTodo(rowValue); //?
        setRowValue(prevState =>{
          return {
          id: prevState.id +1,
          todoValue: "",
          priorityValue: "low",
          isDone: false}
          

        });
        
      }}
    >
      <input
        placeholder="enter task"
        type="text"
        name="todoValue"
        onChange={handleChange}
        value={rowValue.todoValue}
      ></input>

      <select
        onChange={handleChange}
        value={rowValue.priorityValue}
        name="priorityValue"
      >
       
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
     
      <input type="submit" placeholder="Priority"></input>
    </form>
  );
};

export default RowForm;
