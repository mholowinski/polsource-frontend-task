import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import RowForm from "./RowForm.js";
import DataTable from 'react-data-table-component';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { grey, yellow } from '@material-ui/core/colors';

const App = () => {
  const YellowCheckbox = withStyles({
    root: {
      color: grey,
      '&$checked': {
        color: yellow[900],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const initialState =  JSON.parse(localStorage.getItem("todos") || "[]")
  const [todos, setTodos] = useState(initialState);
  
  function toggleHover(id){
    let element = document.getElementById('row-' + id).getElementsByTagName("button")[0];
    element.style.display == "none" ? element.style.display = "inline-flex" : element.style.display = "none"
}
  
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos) )
    let localStor = JSON.parse(localStorage.getItem("todos") || "[]");
    if (localStor.length > 0 ){
      const maxId = localStor.reduce(
        (max, character) => (character.id > max ? character.id : max),
        localStor[0].id
      ); 
      localStorage.setItem("maxId", maxId);
    }}, [todos]);

  const paginationOptions = { rowsPerPageText: 'Rows per page: ', rangeSeparatorText: 'of'};
  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', 
      },
    },
    headRow:{
      style:{
        backgroundColor: '#494430',
        color: '#FFFFFF'
      }
    },
    headCells:{
      style:{
        color: '#FFFFFF'
      }
    },
    table:{
      style:{
        borderStyle: 'solid',
        borderColor: '#E8E8E8',
        borderWidth: '10px'
      }
    }
  };
  
  const columns = [
    {
      name: 'Task name',
      selector: 'todo',
      sortable: true,
      maxWidth: "650px",
      // eslint-disable-next-line react/display-name
      cell: row => (
        <div 
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "100%"
          }}
          onMouseEnter={()=>toggleHover(row.id)}
          onMouseLeave={()=>toggleHover(row.id)}
        >{row.todo}
          <div style={{position: 'absolute', right: '0'}}>
            <IconButton style={{display: "none"}}onClick={()=>{deleteRow(row)}}>
                <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>)
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
      cell: row => <YellowCheckbox  checked={row.isDone} onChange={()=>{changeDone(row)}} />,
      maxWidth: "50px",
      minWidth:"50px"
    },
    {
      // eslint-disable-next-line react/display-name
      cell: row => <IconButton style={{display: "none"}}onClick={()=>{deleteRow(row)}}>
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


  return (
    <div id="container">
      <DataTable
        pagination
        paginationComponentOptions={paginationOptions}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5,10,15]}
        highlightOnHover
        customStyles={customStyles} //Import styles
        data={todos} //Import data from state
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
