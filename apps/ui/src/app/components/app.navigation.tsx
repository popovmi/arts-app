import { Role, useWhoAmIQuery } from '@/graphql';
import { Menu } from 'antd';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

const { Item, SubMenu } = Menu;

export const AppNavigation: FC = () => {
    const location = useLocation();
    const { data } = useWhoAmIQuery();
    const isAdmin = data?.whoAmI?.role === Role.Admin;
    const selectedKeys = location.pathname.slice(1);

    return (
        <Menu
            style={{ height: '100%' }}
            theme="light"
            mode={'inline'}
            defaultSelectedKeys={[]}
            selectedKeys={[selectedKeys]}
            inlineCollapsed={true}
        >
            <Item key={'projects'}>
                <Link to={'projects'}>Проекты</Link>
            </Item>
            <Item key={'arts'}>
                <Link to={'arts'}>ART-ы</Link>
            </Item>
            {isAdmin && (
                <SubMenu key="admin" title="Админ">
                    <Item key={'admin/users'}>
                        <Link to={'admin/users'}>Пользователи</Link>
                    </Item>
                    <Item key={'admin/companies'}>
                        <Link to={'admin/companies'}>Организации</Link>
                    </Item>
                    <Item key={'admin/attributes'}>
                        <Link to={'admin/attributes'}>Теги</Link>
                    </Item>
                </SubMenu>
            )}
        </Menu>
    );
};
