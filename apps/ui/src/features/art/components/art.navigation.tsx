import { Menu } from 'antd';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

const { Item } = Menu;

export const ArtNavigation: FC = () => {
    const location = useLocation();

    return (
        <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[]}
            selectedKeys={[location.pathname.split('/', 3)[2] || '']}
        >
            <Item key={''}>
                <Link to={''}>Все ART-ы</Link>
            </Item>
            <Item key={'create'}>
                <Link to={'create'}>Новый ART</Link>
            </Item>
        </Menu>
    );
};
