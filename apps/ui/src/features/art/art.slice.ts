import { RootState } from '@/app/store';
import { Art, ArtFilterQuery, ArtOrderQuery, ArtResponse, ArtTypeEdge, ConnectionArgs } from '@/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ArtsState = {
  data: ArtTypeEdge[];
  filter: ArtFilterQuery;
  order: ArtOrderQuery;
  pagination: ConnectionArgs;
  hasMore: boolean;
  doFetch: boolean;
  showColumns: string[];
};

const artSlice = createSlice({
  name: 'art',
  initialState: {
    data: [],
    filter: {},
    order: {},
    pagination: { first: 50 },
    hasMore: true,
    doFetch: true,
    showColumns: [
      'name',
      'internal',
      'artClass',
      'bottomForm',
      'form',
      'height',
      'nominalVolume',
      'productionMethod',
      'productType',
      'ringType',
      // 'project',
    ],
  } as ArtsState,
  reducers: {
    artsLoaded: (state, action: PayloadAction<ArtResponse>) => {
      const data = action.payload.page?.edges || [];
      const lastItem = data?.[data?.length - 1];
      const partial = !!(state.pagination?.after || state.pagination?.before);

      state.pagination.after = lastItem?.cursor || '';
      state.data = partial ? [...state.data, ...data] : data;
      state.hasMore = action.payload.page.pageInfo?.hasNextPage || false;
      state.doFetch = false;
    },
    updateFilter: (state, action: PayloadAction<ArtFilterQuery & { shouldFetch: boolean }>) => {
      const { shouldFetch, ...payload } = action.payload;
      let filter = state.filter;

      filter = {
        ...filter,
        ...payload,
        project: { ...(filter.project || {}), ...(payload.project || {}) },
      };

      state.filter = filter;
      state.pagination.before = null;
      state.pagination.after = null;
      if (shouldFetch === true) {
        state.doFetch = true;
      }
    },
    clearFilter: (state) => {
      state.filter = {};
      state.pagination.before = null;
      state.pagination.after = null;
      state.doFetch = true;
    },

    shouldFetch: (state, action) => {
      state.doFetch = action.payload;
    },
    setShowColumns: (state, action) => {
      state.showColumns = action.payload;
    },
  },
});

export const artReducer = artSlice.reducer;
export const { artsLoaded, updateFilter, shouldFetch, clearFilter, setShowColumns } = artSlice.actions;

export const selectArts = (state: RootState) => {
  const { data, filter, hasMore, order, pagination, doFetch, showColumns } = state.art;
  const arts: Art[] = data!.map((edge) => edge!.node!);

  const showDataIndexes = showColumns.map((column) => {
    let dataIndex: string | string[] = column;

    if (column.indexOf('.') > -1) {
      dataIndex = column.split('.');
    }

    return dataIndex;
  });

  return { arts, filter, hasMore, order, pagination, doFetch, showColumns, showDataIndexes };
};
