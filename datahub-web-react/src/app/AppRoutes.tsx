import React from 'react';
import { Routes, Route, RouteProps, Navigate, Outlet } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { LogIn } from './auth/LogIn';
import { NoPageFound } from './shared/NoPageFound';
import { PageRoutes } from '../conf/Global';
import { isLoggedInVar } from './auth/checkAuthStatus';
import { useTrackPageView } from './analytics';
import { ProtectedRoutes } from './ProtectedRoutes';

const ProtectedRoute = ({
    isLoggedIn,
    ...props
}: {
    isLoggedIn: boolean;
} & RouteProps) => {
    const currentPath = window.location.pathname + window.location.search;
    return isLoggedIn ? (
        <Outlet context={props} />
    ) : (
        <Navigate to={`${PageRoutes.AUTHENTICATE}?redirect_uri=${encodeURIComponent(currentPath)}`} />
    );
};

/**
 * Container for all top-level routes.
 */
export const AppRoutes = (): JSX.Element => {
    useTrackPageView();
    const isLoggedIn = useReactiveVar(isLoggedInVar);

    return (
        <Routes>
            <Route path={PageRoutes.LOG_IN} element={<LogIn />} />
            <Route path="*" element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                <Route path="*" element={<ProtectedRoutes />} />
            </Route>
            {/* Starting the react app locally opens ./assets by default. For a smoother dev experience, we'll redirect to the homepage */}
            <Route path={PageRoutes.ASSETS} element={<Navigate to="/" />} />
            <Route element={NoPageFound} />
        </Routes>
    );
};
