import React, {createContext, useState, useEffect, useContext} from 'react';

const ThemeContext = createContext({});

const theme = {
  normal: {
    primary: '#3D0075',
    secondary: '#1E1240',
  },
  orange: {
    primary: '#FEA443',
    secondary: '#a1590b',
  },
  magenta: {
    primary: '#9e65b8',
    secondary: '#705E78',
  },
  fedora: {
    primary: '#A5AAA3',
    secondary: '#455c3c',
  },
  Red: {
    primary: '#cc666b',
    secondary: '#812F33',
  },
};

const Provider = ({children}) => {
  const [activeTheme, setActiveTheme] = useState('normal');
  return (
    <ThemeContext.Provider value={{activeTheme, setActiveTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeContext.ProviderWrapper = Provider;

const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  return {themeContext, theme};
};

module.exports = {
  useTheme,
  ThemeContext,
};

// export default theme;
