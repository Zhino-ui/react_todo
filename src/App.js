import React, {useState, useEffect} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);

  useEffect(()=>{
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if(loadedTodos){
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(()=>{
    if(todos.length>0){
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);
  
  // Add the handlesubmit code here
  const handlesubmit = (e)=>{
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if(newTodo.text.length > 0){
      setTodos([...todos].concat(newTodo));
    }else{
      alert("Enter a valid task");
    }
    document.getElementById('todoAdd').value=""
  }
  
  // Add the deleteToDo code here
  const deleteToDo= (id)=>{
    let updatedTodods = [...todos].filter((todo)=> todo.id !== id);
    setTodos(updatedTodods);
  }
  
  // Add the toggleComplete code here
  const toggleComplete = (id)=>{
    let updatedTodods = [...todos].map((todo)=>{
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo
    });
    setTodos(updatedTodods);
  }

  
  // Add the submitEdits code here
  const submitEdits= (newTodo)=>{
    const updatedTodods = [...todos].map((todo)=>{
      if (todo.id === newTodo.id){
        todo.text = document.getElementById(newTodo.id).value;
      }
      return todo;
    });
    setTodos(updatedTodods);
    setTodoEditing(null);
  }

  
return(
<div className ="App">

<div id="todo-list">
  <h1>Todo List</h1>
  <form onSubmit={handlesubmit}>
    <input type="text" id="todoAdd" />
    <button type="submit">Add Todo</button>
    
  </form>
  {todos.map((todo)=>
    <div className="todo" key={todo.id}>
      <div className="todo-text">
        {/* toggle button added */}
        <input type="checkbox" id="completed" checked={todo.completed} onChange={()=> toggleComplete(todo.id)} />
        {/* edit todo enabled  */}
        {todo.id === todoEditing ? <input type="text" id={todo.id} defaultValue={todo.text} /> : (<div>{todo.text}</div>)}

        </div>
        <div className="todo-actions">
          {/* if its edit mode, allow submit edit, else allow edit */}
          {todo.id === todoEditing ? (<button onClick={()=>submitEdits(todo)}>submit Edits</button>)  : (<button onClick={()=>setTodoEditing(todo.id)}>Edit</button>)
        }
        <button onClick={()=> deleteToDo(todo.id)}>Delete</button>
        </div>
    </div>
  )}
</div>
</div>
);
};
export default App;
