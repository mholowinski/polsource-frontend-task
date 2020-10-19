import React, { useState } from "react";

const RowForm = ({ saveTodo }) => {
  const [rowValue, setRowValue] = useState({
    id: 0,
    todoValue: "todo",
    priorityValue: "Low",
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
          priorityValue: "Low",
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
       
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
     
      <input type="submit" placeholder="Priority"></input>
    </form>
  );
};

export default RowForm;
