import React, { useState } from 'react';

const dataTodos = [
   { id: 1, name: 'Build product in Side Hustle' , completed: true },
   { id: 2, name: 'Run in the morning' , completed: false },
   { id: 3, name: 'Learn Cooking' , completed: false },
];

function TodoForm({ addTodo }) {
   const [term, setTerm] = useState('');

   const handleSubmit = ev => {
      ev.preventDefault();
      if(!term) return;
      addTodo(term);
      setTerm('');
   }

   return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
         <form onSubmit={handleSubmit}>
            <input type="text" value={term} onChange={ev => setTerm(ev.target.value)} className="todo-input" />
            <button type="submit">Add List</button>
         </form>
      </div>
   )
}

function TodoList({ todo, deleteTodo, completedTodo }) {
   return (
      <li style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
         <span>{todo.name}</span>
         <button onClick={null}>Edit</button>
         <button onClick={() => deleteTodo(todo.id)}>X</button>
         <button onClick={() => completedTodo(todo.id)}>V</button>
      </li>
   )
}


function Todo() {
   const [todos, setTodos] = useState(dataTodos);

   const addTodo = (todo) => {
      const item = {
         id: Math.floor(Math.random() * 20 + 5), // generate random id between 5 and 20
         name: todo,
         completed: false
      }
      const newTodo = [...todos, item];
      setTodos(newTodo);
   }

   const completedTodo = (id) => {
      const completedItem = todos.map(todo => {
         if(todo.id === id) {
            return { ...todo, completed: !todo.completed };
         } else {
            return todo;
         }
      });
      setTodos(completedItem);
   }

   const deleteTodo = (id) => {
      const deletedItem = todos.filter(todo => todo.id !== id);
      setTodos(deletedItem);
   }

   const editTodo = (id) => {
      console.log(id)
   }

   return (
      <div className="todo-wrapper">
         <TodoForm addTodo={addTodo} />
         <div>
            <ul>
               {todos.map((todo) => (
                  <TodoList 
                     key={todo.id} 
                     todo={todo}
                     deleteTodo={deleteTodo}
                     completedTodo={completedTodo}
                  />
               ))}
            </ul>
         </div>
      </div>
   )
}

export default Todo;