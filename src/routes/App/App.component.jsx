import './App.scss';
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import { Bussiness1 } from '../../components/Business1/Bussiness1.component';

/**
 * App路由
 * @param {object} props
*/
export const App = props => {
    return (
        <Router>
            <Route exact path='/' component={Bussiness1} />
            <Route path='/login' component={() => <div>Login</div>} />
        </Router>
    )
}
