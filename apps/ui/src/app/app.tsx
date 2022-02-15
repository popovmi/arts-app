import { useLoginMutation, useLazyArtsQuery } from 'generated';
import { useEffect } from 'react';

export function App() {
    const [login, { data }] = useLoginMutation();
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
        </>
    );
}

export default App;
