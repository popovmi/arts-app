import { useAppDispatch } from '@/app/store';
import { addTab } from '@/features/tabs';
import { Role, useWhoAmIQuery } from '@/graphql';
import { Menu } from 'antd';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

const { Item, SubMenu } = Menu;

export const AppNavigation: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { data } = useWhoAmIQuery();
    const isAdmin = data?.whoAmI?.role === Role.Admin;
    const selectedKeys = location.pathname.slice(1);

    const onItem = (path: string, label: string) => {
        dispatch(addTab({ path, label }));
    };

    return (
        <Menu
            style={{ height: '100%' }}
            theme="light"
            mode={'inline'}
            defaultSelectedKeys={[]}
            selectedKeys={[selectedKeys]}
            // inlineCollapsed={true}
        >
            <Item key={'projects'} onClick={() => onItem('projects', 'Проекты')}>
                Проекты
            </Item>
            <Item
                key={'arts'}
                onClick={() => {
                    onItem('arts', 'ART-ы');
                }}
            >
                ART-ы
            </Item>
            {isAdmin && (
                <SubMenu key="admin" title="Админ">
                    <Item
                        key={'admin/users'}
                        onClick={() => {
                            onItem('admin/users', 'Пользователи');
                        }}
                    >
                        Пользователи
                    </Item>
                    <Item
                        key={'admin/companies'}
                        onClick={() => {
                            onItem('admin/companies', 'Организации	');
                        }}
                    >
                        Организации
                    </Item>
                    <Item
                        key={'admin/attributes'}
                        onClick={() => {
                            onItem('admin/attributes', 'Теги');
                        }}
                    >
                        Теги
                    </Item>
                </SubMenu>
            )}
        </Menu>
    );
};
