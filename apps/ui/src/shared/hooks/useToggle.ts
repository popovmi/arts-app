import { useState } from 'react';

type UseToggleResult = [boolean, (isToggled?: boolean) => void];

export const useToggle = (): UseToggleResult => {
  const [toggle, setToggled] = useState<boolean>(false);

  const setToggle = (isToggled?: boolean): void => {
    if (typeof isToggled === 'boolean') {
      setToggled(isToggled);
    } else {
      setToggled(!toggle);
    }
  };

  return [toggle, setToggle];
};
