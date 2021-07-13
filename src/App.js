import logo from './logo.svg';
import './App.css';

import PageView from './components/PageView';
import Page from './components/Page';
import { useState } from 'react';
import styles from './components/styles.module.css';
import Toolbar from './components/Toolbar';

function App() {

  const [tool, setTool] = useState("pen");

  return (
    <div className="App">
      <Toolbar setTool={setTool} tool={tool}/>
      <PageView tool={tool}/>
      {/* <Page tool={tool}/> */}
    </div>
  );
}

export default App;
