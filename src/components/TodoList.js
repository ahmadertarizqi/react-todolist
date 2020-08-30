import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import { BtnCircle, BtnCircleOutline, BtnCircleAction, InputOutline, BtnCenter, BtnCircleActive } from 'ui/Styles';
import { IconCheck, IconCancel, IconEditList, IconTrash } from 'ui/Icons';

export default function TodoList(props) {
   const { todo, deleteTodo, completedTodo, editTodo } = props;
   const [isEdit, setIsEdit] = useState(false);
   const [term, setTerm] = useState('');

   const showFormEdit = () => {
      setIsEdit(!isEdit);
   }

   const saveEdit = (id) => {
      editTodo(term, id);
      setIsEdit(false);
   }

   return (
      <React.Fragment>
         {isEdit ? (
            <li css={tw`mb-2`}>
               <div css={tw`flex flex-row items-center h-16 px-3 bg-white shadow rounded`}>
                  <input type="text"
                     placeholder="Edit Todo"
                     css={[InputOutline, tw`flex-auto`]}
                     value={term || todo.name}
                     onChange={ev => setTerm(ev.target.value)}
                     />
                  <button css={[BtnCircle, BtnCircleAction, tw`ml-2`]} onClick={() => saveEdit(todo.id)}>
                     <IconCheck />
                  </button>
                  <button css={[BtnCircle, BtnCircleAction, tw`ml-2`]} onClick={() => showFormEdit()}>
                     <IconCancel />
                  </button>
               </div>
            </li>
         ) : (
            <li css={tw`mb-2`}>
               <div css={tw`flex flex-row items-center h-16 px-3 bg-white shadow rounded`}>
                  <button 
                     css={[BtnCircle, BtnCircleOutline, todo.completed ? BtnCircleActive : null]} 
                     onClick={() => completedTodo(todo.id)}>
                     {todo.completed ? 'V' : ''}
                  </button>
                  <div css={tw`mx-2 flex-auto`} style={{ textDecoration: todo.completed ? 'line-through' : '' }}>{todo.name}</div>
                  <button css={[BtnCircle, BtnCircleAction, BtnCenter]} onClick={() => showFormEdit()}>
                     <IconEditList />
                  </button>
                  <button css={[BtnCircle, BtnCircleAction, BtnCenter, tw`ml-2`]} onClick={() => deleteTodo(todo.id)}>
                     <IconTrash />
                  </button>
               </div>
            </li>
            )}
      </React.Fragment>
   )
}