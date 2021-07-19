import logo from './logo.svg';
import './App.css';

import PageView from './components/PageView';
import Page from './components/Page';
import { useState } from 'react';
import styles from './components/styles.module.css';
import Toolbar from './components/Toolbar';
import {PenContextProvider} from './contexts/PenContext';

function App() {
  return (
    <div className="App">
      <PenContextProvider>
        <Toolbar/>
        <PageView />
      </PenContextProvider>
      {/* <Page tool={tool}/> */}
    </div>
  );
}

export default App;
