import tw from 'twin.macro';

export const Button = tw`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm`;

export const BtnCircle = tw`w-6 h-6 rounded-full border-2 border-solid leading-none text-xs`;
export const BtnCircleOutline = tw`border-blue-500 hover:bg-blue-500`;
export const BtnCircleActive = tw`bg-blue-500 text-white`;
export const BtnCircleAction = tw`border-transparent hover:bg-gray-300 hover:border-gray-300`;
export const BtnCenter = tw`flex justify-center items-center`;

export const Badge = tw`bg-blue-500 text-white w-5 h-5 inline-block leading-normal text-xs rounded-full`;

export const FormWrapper = tw`bg-white flex justify-center items-center mb-4 border-blue-500 h-12 border-solid border-2 rounded px-3`;
export const Input = tw`bg-white focus:outline-none block w-full appearance-none leading-normal`;
export const InputOutline = tw`bg-white focus:outline-none border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal`