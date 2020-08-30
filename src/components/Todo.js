import React, { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import tw from 'twin.macro';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

const dataTodos = [
   { id: 1, name: 'Build product in Side Hustle', completed: true },
   { id: 2, name: 'Run in the morning', completed: false },
   { id: 3, name: 'Learn Cooking', completed: false },
];


export default function Todo() {
   const [todos, setTodos] = useState(dataTodos);

   const addTodo = (payload) => {
      const item = {
         id: Math.floor(Math.random() * 20 + 5), // generate random id between 5 and 20
         name: payload,
         completed: false
      }
      const newTodo = [...todos, item];
      setTodos(newTodo);
   }

   const completedTodo = (id) => {
      const completedItem = todos.map(todo => {
         if (todo.id === id) {
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

   const editTodo = (payload, id) => {
      const editItem = todos.map(todo => {
         if (todo.id === id) {
            return { ...todo, id, name: payload };
         } else {
            return todo;
         }
      });
      setTodos(editItem);
   }

   const todoContainer = css`
      max-width: 550px;
      margin: 0 auto;
      padding: 10px;
   `;

   return (
      <div css={todoContainer}>
         <TodoForm addTodo={addTodo} />
         <div css={tw`flex justify-center`}>
            <ul css={tw`w-full`}>
               {todos.map((todo) => (
                  <TodoList
                     key={todo.id}
                     todo={todo}
                     deleteTodo={deleteTodo}
                     completedTodo={completedTodo}
                     editTodo={editTodo}
                  />
               ))}
            </ul>
         </div>
      </div>
   )
}