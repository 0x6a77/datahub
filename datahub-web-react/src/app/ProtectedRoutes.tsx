import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { BrowseResultsPage } from './browse/BrowseResultsPage';
import { EntityPage } from './entity/EntityPage';
import { PageRoutes } from '../conf/Global';
import { useEntityRegistry } from './useEntityRegistry';
import { HomePage } from './home/HomePage';
import { SearchPage } from './search/SearchPage';
import { AnalyticsPage } from './analyticsDashboard/components/AnalyticsPage';
import { PoliciesPage } from './policy/PoliciesPage';
import AppConfigProvider from '../AppConfigProvider';
import { ManageIdentitiesPage } from './identity/ManageIdentitiesPage';
import { SettingsPage } from './settings/SettingsPage';
import { ManageIngestionPage } from './ingest/ManageIngestionPage';
import { ManageDomainsPage } from './domain/ManageDomainsPage';

/**
 * Container for all views behind an authentication wall.
 */
export const ProtectedRoutes = (): JSX.Element => {
    const entityRegistry = useEntityRegistry();
    return (
        <AppConfigProvider>
            <Layout style={{ height: '100%', width: '100%' }}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        {entityRegistry.getEntities().map((entity) => (
                            <Route
                                key={entity.getPathName()}
                                path={`${entity.getPathName()}/urn`}
                                element={<EntityPage entityType={entity.type} />}
                            />
                        ))}
                        <Route path={PageRoutes.SEARCH_RESULTS} element={<SearchPage />} />
                        <Route path={PageRoutes.BROWSE_RESULTS} element={<BrowseResultsPage />} />
                        <Route path={PageRoutes.ANALYTICS} element={<AnalyticsPage />} />
                        <Route path={PageRoutes.POLICIES} element={<PoliciesPage />} />
                        <Route path={PageRoutes.IDENTITIES} element={<ManageIdentitiesPage />} />
                        <Route path={PageRoutes.DOMAINS} element={<ManageDomainsPage />} />
                        <Route path={PageRoutes.INGESTION} element={<ManageIngestionPage />} />
                        <Route path={PageRoutes.SETTINGS} element={<SettingsPage />} />
                    </Routes>
                </Layout>
            </Layout>
        </AppConfigProvider>
    );
};
