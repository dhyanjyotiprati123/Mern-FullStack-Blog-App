
export const initialState= false;

const reducer=(state, action)=>{
   if(action.type === "User"){
       return action.payload;
   }
   return state
}

export default reducer