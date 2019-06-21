import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDom from 'react-dom';
import { App } from './routes/App/App.component';

const render = Component => {
    ReactDom.render(
        <Component />,
        document.getElementById('root'),
    )
}

render(hot(App));

if (module.hot) {
    module.hot.accept('./routes/App/App.component.jsx', () => {
        render(hot(App));
    });
}
