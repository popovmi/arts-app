import { useState } from 'react';

export const useToggle = () => {
    const [toggle, setToggled] = useState(false);

    const setToggle = (isToggled?: boolean): void => {
        if (isToggled !== null && isToggled !== undefined) {
            setToggled(isToggled);
        } else {
            setToggled(!toggle);
        }
    };

    return { toggle, setToggle };
};
