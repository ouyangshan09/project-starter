import React from 'react';
import { Bussiness1 } from './components/Business1/Bussiness1.component';

const routes = [{
    path: '/',
    childRoutes: [{
        path: 'about',
        getComponent (nextstate, callback) {
            import('./components/Business1/Bussiness1.component').then(value => {
                console.log('value:', value);
            }).catch(e => console.log('getComponent error:', e));
        }
        // component: Bussiness1,
    }, {
        path: 'book',
        component: () => <div>book</div>
    }],
}];

export default routes;