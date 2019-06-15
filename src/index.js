import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDom from 'react-dom';
import { App } from './routes/App/App.component';

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
