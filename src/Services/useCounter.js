import React, { useState } from 'react'

function useCounter(start,step) {

  const[result,setResult]=useState(start);

function increament(){
  setResult(result+step);

}
function decreament(){
  setResult(result-step);

}
  return {result,increament,decreament}; 
  
}

export default useCounter