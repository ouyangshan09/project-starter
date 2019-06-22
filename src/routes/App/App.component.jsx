import './App.scss';
import React from 'react';
import {
    Router,
    Route
} from 'react-router';
import { browerHistory } from '../../utils/history';
import { Bussiness1 } from '../../components/Business1/Bussiness1.component';
import '../../utils/test1';
import '../../utils/test2';

const AsyncComponent = React.lazy(() => import(/* webpackChunkName: "Login" */ '../../components/Login/Login.component'));

const Test = () => {
    return (
        <React.Suspense fallback={() => <div>111</div>}>
            <AsyncComponent />
        </React.Suspense>
    )
}


/**
 * App路由
 * @param {object} props
*/
export const App = props => {
    return (
        <Router history={browerHistory}>
            {/* 授权验证 */}
            <Route exact path='/' component={Bussiness1} />
            <Route path='/login' component={Test} />
        </Router>
    )
}

export default App;
