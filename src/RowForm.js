import React, { useState } from "react";
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

const RowForm = ({ saveTodo }) => {
  const [rowValue, setRowValue] = useState({
    id: 0, //OSTATNI ID Z LOCALSTORAGE
    todoValue: "",
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
    <form id="main-form"
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
      <Input
      required
        placeholder="Enter task"
        type="text"
        name="todoValue"
        onChange={handleChange}
        value={rowValue.todoValue}
      ></Input>

      <Select
      native
        onChange={handleChange}
        value={rowValue.priorityValue}
        name="priorityValue"
        label= "Priority"
        
      >
        <option value={"Low"}>Low</option>
        <option value={"Medium"}>Medium</option>
        <option value={"High"}>High</option>
      </Select>
     
      <Input type="submit" value="Add"></Input>
    </form>
  );
};

export default RowForm;
