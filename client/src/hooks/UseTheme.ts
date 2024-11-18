import { useContext, useEffect } from 'react';

import { AppContext } from '../app/context/AppContext';

export const UseTheme = () => {
  const { state, setAppState } = useContext(AppContext);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    } else {
      document.documentElement.classList.add(state.theme);
    }
  }, []);

  const toggleTheme = () => {
    if (state.theme === 'light') {
      setAppState('theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setAppState('theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  return { toggleTheme };
};
