import * as React from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';

const { TabPane } = Tabs;

interface Props extends TabsProps {
    defaultPath: string;
    tabs: Array<{
        name: string;
        path: string;
        content: React.ReactNode;
        display?: {
            enabled: () => boolean;
        };
    }>;
    onTabChange?: (selectedTab: string) => void;
}

/**
 * A tab view where each tab is associated with a route mounted on top of the current path.
 * This permits direct navigation to a particular tab via URL.
 */
export const RoutedTabs = ({ defaultPath, tabs, onTabChange, ...props }: Props) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const subRoutes = tabs.map((tab) => tab.path.replace('/', ''));
    const trimmedPathName = pathname.endsWith('/') ? pathname.slice(0, pathname.length - 1) : pathname;
    const splitPathName = trimmedPathName.split('/');
    const providedPath = splitPathName[splitPathName.length - 1];
    const activePath = subRoutes.includes(providedPath) ? providedPath : defaultPath.replace('/', '');
    const isBasePath: boolean = subRoutes.filter((value) => pathname.includes(value)).length === 0;
    return (
        <div>
            {
                // because react-route v6 can't substring match datahub paths, we have to do some magic
                // FIXME?
                isBasePath === true && (
                    <Navigate to={`${pathname}${pathname.endsWith('/') ? '' : '/'}${defaultPath}`} replace />
                )
            }
            <Tabs
                defaultActiveKey={activePath}
                activeKey={activePath}
                size="large"
                onTabClick={(tab: string) => onTabChange && onTabChange(tab)}
                onChange={(newPath) => navigate(`${pathname.substr(0, pathname.lastIndexOf('/'))}/${newPath}`)}
                {...props}
            >
                {tabs.map((tab) => {
                    return (
                        <TabPane tab={tab.name} key={tab.path.replace('/', '')} disabled={!tab.display?.enabled()} />
                    );
                })}
            </Tabs>
            <Routes>
                {tabs.map((tab) => (
                    <Route path={`${tab.path.replace('/', '')}`} element={tab.content} key={tab.path} />
                ))}
            </Routes>
        </div>
    );
};
