import logo from './logo.svg';
import './App.css';

import PageView from './components/PageView';
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
      <PageView tool={tool}/>
      {/* <Page tool={tool}/> */}
    </div>
  );
}

export default App;
