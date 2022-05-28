import { useAppDispatch, useAppSelector } from '@/app/store';
import { ArtResponse, useLazyArtsQuery } from '@/graphql';
import { useEffect } from 'react';
import { artsLoaded, clearFilter, selectArts } from '../art.slice';

export const useArtsData = () => {
    const dispatch = useAppDispatch();
    const { filter, order, pagination, arts, hasMore, doFetch, showColumns, preview } =
        useAppSelector(selectArts);
    const [load, { isLoading, isFetching }] = useLazyArtsQuery();
    const loading = isLoading || isFetching;

    useEffect(() => {
        if (doFetch) fetchArts();
    }, [doFetch]);

    const fetchArts = (): void => {
        load({ filter, order, pagination }).then((result) => {
            'data' in result && dispatch(artsLoaded(result.data!.arts as ArtResponse));
        });
    };

    const resetFilter = () => dispatch(clearFilter());

    return { arts, loading, hasMore, showColumns, fetchArts, resetFilter, preview };
};
