import logo from './logo.svg';
import './App.css';

import PageView from './components/PageView';
import Page from './components/Page';
import { useState } from 'react';
import styles from './components/styles.module.css';
import Toolbar from './components/Toolbar';
import { PageContextProvider } from './contexts/PageContext';
import { PenContextProvider } from './contexts/PenContext';
import { ThemeProvider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: grey[100],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#282c34',
    },
    multilineColor:{
      color:'red'
    }
  },
});

function App() {
  return (
    <div className="App">
      <PageContextProvider>
        <PenContextProvider>
          <ThemeProvider theme={theme}>
            <Toolbar/>
            <PageView />
          </ThemeProvider>
        </PenContextProvider>
      </PageContextProvider>
      {/* <Page tool={tool}/> */}
    </div>
  );
}

export default App;
