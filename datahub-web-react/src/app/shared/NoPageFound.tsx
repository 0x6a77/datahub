import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { isLoggedInVar } from '../auth/checkAuthStatus';
import { PageRoutes } from '../../conf/Global';

export const NoPageFound = () => {
    const isLoggedIn = useReactiveVar(isLoggedInVar);

    if (!isLoggedIn) {
        return <Navigate to={PageRoutes.LOG_IN} replace />;
    }

    return (
        <div>
            <p>Page Not Found!</p>
        </div>
    );
};
