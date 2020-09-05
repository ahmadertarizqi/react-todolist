import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import tw from 'twin.macro';
import { v4 as uuidv4 } from 'uuid';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Badge } from 'ui/Styles';

import DataTodos from './data';

export default function Todo() {
   const initialTodos = JSON.parse(window.localStorage.getItem('todolist')) || DataTodos;
   const [todos, setTodos] = useState(initialTodos);
   const [completed, setCompleted] = useState(true);

   useEffect(() => {
      window.localStorage.setItem('todolist', JSON.stringify(todos));
   }, [todos]);

   const addTodo = (payload) => {
      const item = {
         id: uuidv4(), // generate random id between 5 and 100
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

   const filterTodoCompleted = (status) => {
      const statusCompleted = (status === 'completed') ? true : false;
      switch(statusCompleted) {
         case true: {
            return todos.filter(todo => todo.completed === statusCompleted);
         }
         case false: { 
            return todos.filter(todo => todo.completed === statusCompleted);
         }
      }
   }

   const toggleCompleted = () => {
      setCompleted(!completed);
   }

   const todoContainer = css`
      max-width: 550px;
      margin: 0 auto;
      padding: 10px;
   `;

   const todoHeaderStyle = css`
      position: fixed;
      max-width: 550px;
      width: 100%;
      padding: 25px 10px 15px;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      background-color: #f5f6f7;
   `;

   return (
      <div css={tw`h-full py-10 px-1 sm:px-12`}>
         <div css={todoContainer}>
            <div css={todoHeaderStyle}>
               <h4 css={tw`text-lg sm:text-2xl mb-3 text-center`}>Hi Welcome, make your todo-list!!</h4>
               <TodoForm addTodo={addTodo} />
            </div>

            <div css={tw`pt-24`}>
               <h4 css={tw`mb-2 font-semibold`}>Doing</h4>
               <div css={tw`flex justify-center`}>
                  {filterTodoCompleted('doing').length > 0 ? (
                  <ul css={tw`w-full`}>
                     {filterTodoCompleted('doing').map((todo) => (
                           <TodoList
                              key={todo.id}
                              todo={todo}
                              deleteTodo={deleteTodo}
                              completedTodo={completedTodo}
                              editTodo={editTodo}
                              status='doing'
                           />
                        ))}
                  </ul> 
                  ) : (
                     <div css={tw`h-20 flex items-center`}>
                        <h4>Oopss... Task is Empty</h4>
                     </div>
                  )}
               </div>
               <br/>
               
               <button css={tw`flex items-center bg-gray-400 py-1 px-2 rounded mb-2`} onClick={() => toggleCompleted()}>
                  <h4 css={tw`font-semibold`}>Completed <span css={Badge}>{filterTodoCompleted('completed').length}</span></h4>
               </button>
               {completed && (
                  <div css={tw`flex justify-center`}>
                     {filterTodoCompleted('completed').length > 0 ? (
                        <ul css={tw`w-full`}>
                           {filterTodoCompleted('completed').map((todo) => (
                              <TodoList
                                 key={todo.id}
                                 todo={todo}
                                 deleteTodo={deleteTodo}
                                 completedTodo={completedTodo}
                                 editTodo={editTodo}
                                 status='completed'
                              />
                           ))}
                        </ul> 
                     ) : (
                        <div css={tw`h-20 flex items-center`}>
                           <h4>Oopss... Task completed is Empty</h4>
                        </div>
                     )}
                  </div>
               )} 
            </div>
         </div>
      </div>
   )
}