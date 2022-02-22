import { useLogoutMutation } from '@/graphql';
import { useUser } from '@/shared/hooks';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const { Item } = Menu;

export const AuthWidget: FC = () => {
  const navigate = useNavigate();
  const [doLogout] = useLogoutMutation({ fixedCacheKey: 'logout' });
  const { user } = useUser();

  const handleLogOut = async (evt: any) => {
    evt.preventDefault();
    doLogout();
  };

  const handleChangePassword = (evt: any) => {
    evt.preventDefault();
    navigate(`/update`);
  };

  return user ? (
    <Space align="center">
      <UserOutlined style={{ color: '#aaa', fontSize: '1.25rem' }} />
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu theme="dark">
            <Item key="changePassword">
              <a onClick={handleChangePassword} href="/">
                Сменить пароль
              </a>
            </Item>
            <Item key="logout">
              <a onClick={handleLogOut} href="/">
                Выход
              </a>
            </Item>
          </Menu>
        }
      >
        <a
          href="/"
          className="ant-dropdown-link"
          style={{ color: '#aaa' }}
          onClick={(e) => e.preventDefault()}
        >
          {user!.fullName} <DownOutlined />
        </a>
      </Dropdown>
    </Space>
  ) : null;
};
