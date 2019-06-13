import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { Bussiness1 } from './components/Business1/Bussiness1.component';

const App = () => {
    return (
        <Router>
            <ul className='nav-list'>
                <li><Link to='/'>首页</Link></li>
                <li><Link to='/about'>关于</Link></li>
                <li><Link to='/users'>用户</Link></li>
            </ul>

            <Route path='/' exact component={Bussiness1} />
            <Route path='/about' component={() => <div>关于路由</div>} />
            <Route path='/users' component={() => <div>用户路由</div>} />
        </Router>
    )
}
const HotApp = hot(App);

ReactDom.render(
    <HotApp />,
    document.getElementById('root'),
)

// const render = Component => {
//     ReactDom.render(
//         hot(),
//         document.getElementById('root')
//     )
// }

// const Name = () => <div>OUYANG</div>

// render(Name);
