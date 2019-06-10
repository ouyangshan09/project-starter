import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDom from 'react-dom';

const App = () => <div>Hello world!222</div>
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
