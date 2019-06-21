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

describe('Normal Example', () => {
    it('two plus two is four', () => {
        const value = 2 + 2;
        expect(value).toBeGreaterThan(3);
        expect(value).toBeGreaterThanOrEqual(3.5);
        expect(value).toBeLessThan(5);
        expect(value).toBeLessThanOrEqual(4.5);

        expect(value).toBe(4);
        expect(value).toEqual(4);
    });

    it('object assignent', () => {
        const data = { one: 1 };
        data['two'] = 2;
        expect(data).toEqual({one: 1, two: 2});
    });

    it('adding positive numbers is not zero', () => {
        for (let a = 1; a < 10; a++) {
            for (let b = 1; b < 10; b++) {
                expect(a + b).not.toBe(0);
            }
        }
    });

    it('null', () => {
        const n = null;
        expect(n).toBeNull();
        expect(n).toBeDefined();
        expect(n).not.toBeUndefined();
        expect(n).not.toBeTruthy();
        expect(n).toBeFalsy();
    });

    it('zero', () => {
        const z = 0;
        expect(z).not.toBeNull();
        expect(z).toBeDefined();
        expect(z).not.toBeUndefined();
        expect(z).not.toBeTruthy();
        expect(z).toBeFalsy();
    });

    it('两个浮点数字相加', () => {
        const value = 0.1 + 0.2;
        expect(value).toBeCloseTo(0.3);
    });

    it('there is no I in team', () => {
        expect('team').not.toMatch(/I/);
    });

    it('but there is a "stop" in Christoph', () => {
        expect('Christoph').toMatch(/stop/);
    });

    it('the shopping list has beer on it', () => {
        const shoppingList = [
            'diapers',
            'kleenex',
            'trash bags',
            'paper towels',
            'beer',
        ];

        expect(shoppingList).toContain('beer');
        expect(new Set(shoppingList)).toContain('beer');
    });

    it('compiling android goes as expected', () => {
        function compilingAndroidCode () {
            throw new Error('you are using the wrong JDK');
        }

        expect(compilingAndroidCode).toThrow();
        expect(compilingAndroidCode).toThrow(Error);

        expect(compilingAndroidCode).toThrow('you are using the wrong JDK');
        expect(compilingAndroidCode).toThrow(/JDK/);
    });
});
