import { useState } from 'react';

const useModal = () => {
  const [isActive, setActive] = useState(false);

  const handleSwitchModal = () => {
    setActive(!isActive);
  };

  return { handleSwitchModal, isActive };
};
export default useModal;
