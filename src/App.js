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
      cell: row => <div><input type="checkbox" checked={row.isDone} onChange={()=>{changeDone(row)}} /></div>
    },
    {
      // eslint-disable-next-line react/display-name
      cell: row => <div><button onClick={()=>{deleteRow(row)}}>Delete</button></div>
    }
  ];

 function changeDone(rowIndex){
   console.log(rowIndex)
   const indexOf = todos.indexOf(rowIndex);
   const newDone = todos.filter((index) => index !== indexOf);
   newDone[indexOf].isDone = !newDone[indexOf].isDone
   setTodos(newDone);
 }

 function deleteRow(rowIndex){
  const indexOf = todos.indexOf(rowIndex);
  const newTodos = todos.filter((_, index) => index !== indexOf);     
  setTodos(newTodos);
 }

  useEffect(() => {
    console.log(todos);
  }, [todos]);
  const paginationOptions = { rowsPerPageText: 'Rows per page: ', rangeSeparatorText: 'of'};
  // const [prios, setPrios] = useState("prio");
  return (
    <div id="container">
      <DataTable
        pagination
        paginationComponentOptions={paginationOptions}
        paginationPerPage={5}
         paginationRowsPerPageOptions={[5,10,15]}
        data={todos}

        columns={columns}>
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
