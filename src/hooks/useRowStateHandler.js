import useDataState from './useDataState'

const dataState = {
  unmodified: 0,
  modified: 1,
  updating: 2, 
  updateSuccess: 3,
  updateFailed: 4
}

export default function useRowStateHandler() {

  const modified = (row) => {
    row.setState({...row.state, dataState: dataState.modified});
  }

  const stateUpdater = useDataState();


  const getInitialRowHandlerState = () => {
    return {dataState: dataState.unmodified};
  }

  const modified = (row) => {
    row.setState({...row.state, dataState: dataState.modified});
    stateUpdater.modified();
  }

  const unmodified = (row) => {
    row.setState({...row.state, dataState: dataState.unmodified});
    stateUpdater.unmodified();
  }

  const updating = (row) => {
    row.setState({...row.state, dataState: dataState.updating});
    stateUpdater.updating();
  }

  const updateSuccess = (row) => {
    row.setState({...row.state, dataState: dataState.updateSuccess});
    stateUpdater.success();
  }

  const updateFailed = (row) => {
    row.setState({...row.state, dataState: dataState.updateFailed});
    stateUpdater.failure();
  }

  return [getInitialRowHandlerState, modified, unmodified, updating, updateSuccess, updateFailed];
}