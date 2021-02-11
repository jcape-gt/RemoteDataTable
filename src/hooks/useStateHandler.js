import { useState } from 'react';

export default function useStateHandler(initialStates) {
  const [stateEngine, setStateEngine] = useState({currentState: null, states: initialStates})

  const setState = (state) => {
    console.log(state);
    console.log(stateEngine);
    setStateEngine({...stateEngine, currentState: state})
    stateEngine.states[state]()
  }
  
  return [setState];
}