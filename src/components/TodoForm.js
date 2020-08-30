import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import tw from 'twin.macro';
import { Input, FormWrapper } from 'ui/Styles';
import { IconPlusCircle } from 'ui/Icons';


export default function TodoForm({ addTodo }) {
   const [term, setTerm] = useState('');

   const handleSubmit = ev => {
      ev.preventDefault();
      if (!term) return;
      addTodo(term);
      setTerm('');
   }

   return (
      <div css={FormWrapper}>
         <form onSubmit={handleSubmit} css={tw`flex items-center w-full h-full`}>
            <button type="submit" css={tw`w-8 h-8 flex justify-center items-center bg-transparent mr-2`}>
               <IconPlusCircle />
            </button>
            <input type="text" placeholder="Type something..."
               value={term}
               onChange={ev => setTerm(ev.target.value)}
               css={[Input, tw`h-full`]}
            />
         </form>
      </div>
   )
}