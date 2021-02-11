import useStateHandler from './useStateHandler'

export default function useDataState(
  unmodifiedHandler, 
  modifiedHandler, 
  updatingHandler, 
  successHandler,
  failureHandler) {

  const initialStates = {
    unmodified: unmodifiedHandler,
    modified: modifiedHandler,
    updating: updatingHandler,
    success: successHandler,
    failure: failureHandler
  }
  const [setState] = useStateHandler(initialStates);
  
  const stateUpdater = {
    unmodified: () => {
      setState('unmodified');
    },
    
    modified: () => {
      setState('modified');
    },

    updating: () => {
      setState('updating');
    },

    success: () => {
      setState('success')
    },
    
    failure: () => {
      setState('failure')
    },
  }

  return stateUpdater;
}