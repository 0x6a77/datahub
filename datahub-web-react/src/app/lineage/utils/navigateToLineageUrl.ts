import * as QueryString from 'query-string';
import { NavigateFunction } from 'react-router-dom';

export const navigateToLineageUrl = ({
    location,
    navigate,
    isLineageMode,
}: {
    location: {
        search: string;
        pathname: string;
    };
    navigate: NavigateFunction;
    isLineageMode: boolean;
}) => {
    const parsedSearch = QueryString.parse(location.search, { arrayFormat: 'comma' });
    const newSearch = {
        ...parsedSearch,
        is_lineage_mode: isLineageMode,
    };
    const newSearchStringified = QueryString.stringify(newSearch, { arrayFormat: 'comma' });

    navigate({
        pathname: location.pathname,
        search: newSearchStringified,
    });
};
