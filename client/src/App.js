import React from 'react';
import { Switch, Route } from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';

import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Faq from './pages/Faq';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ItemsProvider from './components/context/Provider';

function App() {
  return (
    <ItemsProvider>
      <AppProvider i18n={enTranslations}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/faq'>
            <Faq />
          </Route>
          <Route path='/privacy'>
            <Privacy />
          </Route>
          <Route path='/terms'>
            <Terms />
          </Route>
        </Switch>
      </AppProvider>
    </ItemsProvider>
  );
}

export default App;
