import { useAppDispatch, useAppSelector } from '@/app/store';
import { Tabs } from 'antd';
import { closeTab, setTab } from './tabs.slice';

export const AppTabs = () => {
    const dispatch = useAppDispatch();
    const { tabs = [], currentTabPath } = useAppSelector((state) => state.tabs);
    const onEdit = (tabKey: any, action: string) => {
        if (action === 'remove') dispatch(closeTab(tabKey));
    };

    return (
        <Tabs
            type="editable-card"
            onChange={(key) => dispatch(setTab(key))}
            activeKey={currentTabPath}
            onEdit={onEdit}
            hideAdd={true}
        >
            {tabs.map((tab) => (
                <Tabs.TabPane key={tab.path} tabKey={tab.path} tab={tab.label} closable={tabs.length > 1} />
            ))}
        </Tabs>
    );
};
