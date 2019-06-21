import React from 'react';
import { Button } from 'antd';
import renderer from 'react-test-renderer';

describe('Snapshot Testing with Jest', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<Button>Antd Button</Button>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});