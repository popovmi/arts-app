import { useLoginMutation, useLazyArtsQuery } from '@/graphql';
import { useEffect } from 'react';
import { AttributeTable } from './attribute.table';

export function App() {
    const [login, { data, error }] = useLoginMutation();
    const [fetchArts, { data: artsData }] = useLazyArtsQuery();

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        console.log(data);
    }, [artsData]);

    return (
        <>
            <button onClick={() => login({ username: 'admin', password: 'USER' })}>VHOD</button>;
            <button onClick={() => fetchArts()}>ARTS</button>
            <div>{error && error.message}</div>
            <AttributeTable></AttributeTable>
        </>
    );
}

export default App;
