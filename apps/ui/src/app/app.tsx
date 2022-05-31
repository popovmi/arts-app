import { FC } from 'react';
import { AppRouter } from './components';
import { ConfigProvider } from 'antd';
import ru from 'antd/lib/locale/ru_RU';

export const App: FC = () => {
    return (
        <ConfigProvider locale={ru}>
            <AppRouter />
        </ConfigProvider>
    );
};
