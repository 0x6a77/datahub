import * as QueryString from 'query-string';
import { NavigateFunction } from 'react-router';

export const navigateToVersionedDatasetUrl = ({
    location,
    navigate,
    datasetVersion,
}: {
    location: {
        search: string;
        pathname: string;
    };
    navigate: NavigateFunction;
    datasetVersion: string;
}) => {
    const parsedSearch = QueryString.parse(location.search, { arrayFormat: 'comma' });
    const newSearch = {
        ...parsedSearch,
        semantic_version: datasetVersion,
    };
    const newSearchStringified = QueryString.stringify(newSearch, { arrayFormat: 'comma' });

    navigate({
        pathname: location.pathname,
        search: newSearchStringified,
    });
};
