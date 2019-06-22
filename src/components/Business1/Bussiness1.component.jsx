import './Bussiness1.scss';
import React from 'react';
import '../../utils/test1';
import  '../../utils/test2';

/**
 * @param {object} props
 * @param {object} props.history
 * @param {object} props.location
 * @param {object} props.match
*/
export const Bussiness1 = props => {
    return (
        <div styleName='Bussiness1' className='Bussiness1'>
            <div className='title'>标题央视</div>
            <section className='content' onClick={() => props.history.push('/login')}>
                Bussiness1 React Component
            </section>
        </div>
    )
}

export default Bussiness1;
