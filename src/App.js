import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import RowForm from "./RowForm.js";
import DataTable from 'react-data-table-component';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { display } from '@material-ui/system';




const App = () => {

  const initialState =  JSON.parse(localStorage.getItem("todos") || "[]")
  const [todos, setTodos] = useState(initialState);
  
  function toggleHover(id){
    let element = document.getElementById('row-' + id).getElementsByTagName("button")[0];
    element.style.display == "none" ? element.style.display = "inline-flex" : element.style.display = "none"
}

  function penis() {
    console.log("XD")
  }

  
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos) )
   // console.log(document.getElementsByClassName("rdt_TableRow")[0])
    let RowArray = document.getElementsByClassName("rdt_TableRow")

    for (let item of RowArray) {
       item.setAttribute("onmouseover",'penis()')
      
  }
    
  
  }, [todos]);

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
        
      },

    },

  };

  
  const columns = [
    
    {
      name: 'Task name',
      selector: 'todo',
      sortable: true,
      maxWidth: "650px",
      // eslint-disable-next-line react/display-name
      cell: row => (
        <div style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "100%"
        }} onMouseEnter={()=>toggleHover(row.id)}
          // onMouseLeave={()=>toggleHover(row.id)}
            
        >
          {row.todo}
        </div>
      )
    },
    {
      name: 'Priority',
      selector: 'priority',
      sortable: true,
      right: false,
      maxWidth: "200px",
      
      
    },
    {
      name: "Done",
      selector: 'isDone',
      sortable: true,
      // eslint-disable-next-line react/display-name
      cell: row => <input type="checkbox" checked={row.isDone} onChange={()=>{changeDone(row)}} />,
      maxWidth: "50px",
      minWidth:"50px"
    },
    {
      // eslint-disable-next-line react/display-name
      cell: row => <IconButton style={
        {
          display: "none"
        }
      }
         onClick={()=>{deleteRow(row)}}>
         <DeleteIcon fontSize="small" />
         </IconButton>,
      maxWidth: "50px",
      minWidth:"50px"
    }
  ];

 
 function changeDone(row){
   const rowIndex = todos.indexOf(row);
   const newDone = todos.filter((index) => index !== rowIndex);
   newDone[rowIndex].isDone = !newDone[rowIndex].isDone
   setTodos(newDone);
 }

 function deleteRow(row){
  const rowIndex = todos.indexOf(row);
  const newTodos = todos.filter((_, index) => index !== rowIndex);     
  setTodos(newTodos);
 }


  const paginationOptions = { rowsPerPageText: 'Rows per page: ', rangeSeparatorText: 'of'};
  return (
    <div id="container">
      <DataTable
        pagination
        paginationComponentOptions={paginationOptions}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5,10,15]}
        highlightOnHover
        customStyles={customStyles}
        
        data={todos}

        columns={columns}>
  
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
