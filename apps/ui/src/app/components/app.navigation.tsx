import { Role, useWhoAmIQuery } from '@/graphql';
import { Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const AppNavigation: FC = () => {
    const { data, isSuccess } = useWhoAmIQuery();
    const user = data?.whoAmI;
    const isAdmin = user?.role === Role.Admin;

    const location = useLocation();
    const selectedKeys = location.pathname
        .split('/')
        .reduce(
            (selected: string[], current) =>
                selected.length
                    ? [...selected, `${selected.join('/')}/${current}`]
                    : current
                    ? [current]
                    : [],
            []
        );

    if (!isSuccess) return <div></div>;

    const menuItems: ItemType[] = [
        { label: <Link to={'projects'}>Проекты</Link>, key: 'projects' },
        { label: <Link to={'arts'}>ART-ы</Link>, key: 'arts' },
    ];

    if (isAdmin) {
        menuItems.push({
            label: 'Админ',
            key: 'admin',
            children: [
                { label: <Link to={'admin/users'}>Пользователи</Link>, key: 'admin/users' },
                { label: <Link to={'admin/companies'}>Организации</Link>, key: 'admin/companies' },
                { label: <Link to={'admin/attributes'}>Теги</Link>, key: 'admin/attributes' },
            ],
        });
    }

    return (
        <Menu
            style={{ flex: '1 1 auto' }}
            theme="dark"
            mode={'horizontal'}
            defaultSelectedKeys={[]}
            selectedKeys={selectedKeys}
            triggerSubMenuAction={'click'}
            items={menuItems}
        />
    );
};
