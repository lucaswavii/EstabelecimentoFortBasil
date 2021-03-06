import React from 'react';
import {BrowserRouter, PrivateRoute, Redirect, Route, Switch} from 'react-router-dom';
import { isAuthenticated } from "./service/auth";
import Content from './page/template/Content'
import Login from './page/login';
import Esqueci from './page/esqueci';
import Registro from './page/registro';
import Home from './page/home';
import Estabelecimento from './page/estabelecimento'
import Usuario from './page/usuario';

function Routes() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
          {...rest}
          render={props =>
            isAuthenticated() ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
          }
        />
    );

    return (       
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login} />
                <Route path="/registro" component={Registro} />
                <Route path="/esqueci" component={Esqueci} />
                <Content>
                  <PrivateRoute path="/home" component={Home} />
                  <PrivateRoute path="/estabelecimento" component={Estabelecimento} />
                  <PrivateRoute path="/usuario" component={Usuario} />
                </Content>  
            </Switch>
        </BrowserRouter> )

}

export default Routes;