import logo from './logo.svg';
import './App.css';

import Page from './components/Page';
import { useState } from 'react';
import styles from './components/styles.module.css';

function App() {

  const [tool, setTool] = useState("pen");

  const onMouseDown = (e) => {
    console.log(e);
    if(tool == "pen"){
      setTool("eraser")
    } else {
      setTool("pen");
    }
  }

  return (
    <div className="App">
      <h1 className={styles.tool}>{tool}</h1>
      <button onMouseDown={onMouseDown}></button>
      <Page tool={tool}></Page>
    </div>
  );
}

export default App;
