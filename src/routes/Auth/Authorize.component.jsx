import React, { useState, useEffect } from 'react';
import {
    Route,
    Redirect
} from 'react-router';
import {
    getCookie
} from '../../utils/util';

// 路由分为2中，公共路由、私有路由
// 公共路由是指不需要token, cookies等信息就可以访问的路由, 不需要保密，任何用户，在任何状态都可以访问
// 私有路由是指用户需要某个信息才可以访问的路由组件
// 私有路由

/**
 * 授权路由判断
 * @param {object} props
 * @param {string} props.path
 * @param {object} props.component
*/
export const AuthorizeRoute = props => {
    const [pending, setPending] = useState(true);
    const [logged, setLogged] = useState(false);;

    useEffect(() => {
        if (getCookie('token') === null) {
            setLogged(false);
        }
    }, [props]);
    

    if (pending) {
        return (
            <div>Loading...</div>
        )
    }

    if (logged === false) {
        <Redirect to='/login' />
    }

    return (
        <Route {...props} component={props.component} path={props.path} />
    )
}