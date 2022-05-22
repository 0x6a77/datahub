import * as QueryString from 'query-string';
import { NavigateFunction } from 'react-router-dom';

import filtersToQueryStringParams from './filtersToQueryStringParams';
import { EntityType, FacetFilterInput } from '../../../types.generated';
import { PageRoutes } from '../../../conf/Global';

export const navigateToSearchUrl = ({
    type: newType,
    query: newQuery,
    page: newPage = 1,
    filters: newFilters,
    navigate,
}: {
    type?: EntityType;
    query?: string;
    page?: number;
    filters?: Array<FacetFilterInput>;
    navigate: NavigateFunction;
}) => {
    const constructedFilters = newFilters || [];
    if (newType) {
        constructedFilters.push({ field: 'entity', value: newType });
    }

    const search = QueryString.stringify(
        {
            ...filtersToQueryStringParams(constructedFilters),
            query: encodeURIComponent(newQuery || ''),
            page: newPage,
        },
        { arrayFormat: 'comma' },
    );

    navigate({
        pathname: `${PageRoutes.SEARCH}`,
        search,
    });
};

export const navigateToSearchLineageUrl = ({
    entityUrl,
    query: newQuery,
    page: newPage = 1,
    filters: newFilters,
    navigate,
}: {
    entityUrl: string;
    query?: string;
    page?: number;
    filters?: Array<FacetFilterInput>;
    navigate: NavigateFunction;
}) => {
    const constructedFilters = newFilters || [];

    const search = QueryString.stringify(
        {
            ...filtersToQueryStringParams(constructedFilters),
            query: encodeURIComponent(newQuery || ''),
            page: newPage,
        },
        { arrayFormat: 'comma' },
    );

    navigate({
        pathname: entityUrl,
        search,
    });
};
