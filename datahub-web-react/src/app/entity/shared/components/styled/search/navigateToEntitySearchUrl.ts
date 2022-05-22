import { NavigateFunction } from 'react-router-dom';
import * as QueryString from 'query-string';
import { EntityType, FacetFilterInput } from '../../../../../../types.generated';
import filtersToQueryStringParams from '../../../../../search/utils/filtersToQueryStringParams';

export const navigateToEntitySearchUrl = ({
    baseUrl,
    type: newType,
    query: newQuery,
    page: newPage = 1,
    filters: newFilters,
    navigate,
}: {
    baseUrl: string;
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
            query: newQuery,
            page: newPage,
        },
        { arrayFormat: 'comma' },
    );

    navigate({
        pathname: `${baseUrl}`,
        search,
    });
};
