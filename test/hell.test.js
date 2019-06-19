// test('add 1 + 2 to equal 3', () => {
//     expect(1).toBe(1);
// });

import React from 'react';
import { shallow } from 'enzyme';
import Page404 from '../src/components/404/NotFount.component';

describe('Page404', () => {
    it('Page404 shows 404', () => {
        const app = shallow(<Page404 />);
        expect(app.find('div').text()).toEqual('404');
    })
})
