import React, { Suspense } from 'react';
import './App.css';
import { Route, HashRouter, Redirect } from 'react-router-dom'
import route from './router/index'
import List from './commponents/list/index'

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div></div>}>
        <HashRouter>
          {
            route.map((item: any, index: number) => {
              return (
                <Route exact={item.exact} path={item.path} component={item.component} key={index}></Route>
              )
            })
          }
          <Redirect to="/floatMenu"></Redirect>
        </HashRouter>
      </Suspense>
    </div>
  );
}

export default App;
