import { Switch, Redirect, Route, useLocation } from 'react-router-dom';
import Layout from './screens/Layout.jsx';
import Home from './screens/Home.jsx';

//How to change variable colors from outside
// const root = document.documentElement;
// root.style.setProperty('--color-primary', '#FFCB05');

const App = ({ props }) => {
  const location = useLocation();
  return (
    <Switch>
            <Layout>
              <Route exact path='/'>
                  <Home/>
              </Route>
            </Layout>
    </Switch>
  );
};

export default App;
