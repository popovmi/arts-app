import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Tab = {
    label: string;
    path: string;
};

type TabsState = {
    currentTabPath: string;
    tabs: Tab[];
};

const tabsSlice = createSlice({
    name: 'tabs',
    initialState: {
        tabs: [{ path: 'projects', label: 'Проекты' }],
        currentTabPath: '',
    } as TabsState,
    reducers: {
        addTab: (state, action: PayloadAction<Tab>) => {
            const { path, label } = action.payload;
            const tabIndex = state.tabs.findIndex((tab) => tab.path === path);

            state.currentTabPath = path;
            if (tabIndex > -1) {
                state.tabs[tabIndex] = { path, label };
            } else {
                state.tabs.push({ path, label });
            }

            state.currentTabPath = path;
        },

        setTab: (state, action: PayloadAction<string>) => {
            state.currentTabPath = action.payload;
        },

        closeTab: (state, action: PayloadAction<string>) => {
            const tabIndex = state.tabs.findIndex((tab) => tab.path === action.payload);

            if (tabIndex > -1) {
                state.currentTabPath = state.tabs[tabIndex === 0 ? 1 : tabIndex - 1]?.path;
            }

            state.tabs.splice(tabIndex, 1);
        },
    },
});

export const { addTab, setTab, closeTab } = tabsSlice.actions;
export const tabsReducer = tabsSlice.reducer;
