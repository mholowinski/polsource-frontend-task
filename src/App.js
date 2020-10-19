import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import RowForm from "./RowForm.js";
import DataTable from 'react-data-table-component';

const App = () => {
  
  const [todos, setTodos] = useState([]);
  const columns = [
    
    {
      name: 'Todo',
      selector: 'todo',
      sortable: true,
    },
    {
      name: 'Priority',
      selector: 'priority',
      sortable: true,
      right: true,
    },
    {
      name: "Done",
      selector: 'isDone',
      sortable: true,
      // eslint-disable-next-line react/display-name
      cell: row => <div><input type="checkbox" checked={row.isDone} onChange={()=>{changeDone(row.id)}} /></div>
    }
  ];

 function changeDone(rowIndex){
  const newDone = todos.filter((index) => index !== rowIndex);
  newDone[rowIndex-1].isDone = !newDone[rowIndex-1].isDone
  setTodos(newDone);
 }

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  // const [prios, setPrios] = useState("prio");
  return (
    <div id="container">
      <DataTable data={todos} columns={columns}>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </DataTable>

      <RowForm
        saveTodo={(todoText) => {
          const trimmedText = todoText.todoValue.trim();
          const prioValue = todoText.priorityValue;
          const doneValue = todoText.isDone;
          const idValue = todoText.id;
          
          if (trimmedText.length > 0) {
            let todoArray = {id:idValue, todo: trimmedText, priority: prioValue, isDone: doneValue };
            setTodos([...todos, todoArray]);
          }
        }}
      ></RowForm>
    </div>
  );
};

render(<App />, document.getElementById("root"));
