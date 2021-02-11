import React from 'react'

import { DataTextControl } from 'reactdatatable'
import 'reactdatatable/dist/index.css'

const App = () => {
  return <DataTextControl value='hello' editing={false} onChange={ () => {} } />
}

export default App
