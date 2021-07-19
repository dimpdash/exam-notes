import logo from './logo.svg';
import './App.css';

import PageView from './components/PageView';
import Page from './components/Page';
import { useState } from 'react';
import styles from './components/styles.module.css';
import Toolbar from './components/Toolbar';
import { PageContextProvider } from './contexts/PageContext';
import { PenContextProvider } from './contexts/PenContext';

function App() {
  return (
    <div className="App">
      <PageContextProvider>
        <PenContextProvider>
          <Toolbar/>
          <PageView />
        </PenContextProvider>
      </PageContextProvider>
      {/* <Page tool={tool}/> */}
    </div>
  );
}

export default App;
