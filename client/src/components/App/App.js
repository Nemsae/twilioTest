import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import Layout from 'react-toolbox/lib/layout/Layout';

import theme from '../../assets/react-toolbox/theme';
import Enigma from '../Enigma';

import style from './styles';

const App = () => (
  <ThemeProvider theme={theme}>
    <Layout style={style.wrapper}>
      <Switch>
        <Route path='/' component={Enigma} />
      </Switch>
    </Layout>
  </ThemeProvider>
);

export default App;
