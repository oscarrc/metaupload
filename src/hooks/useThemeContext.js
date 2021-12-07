import { createContext, useContext, useEffect, useReducer } from 'react'

const ThemeContext = createContext();

const themeReducer = (state, action) => {
    switch (action?.type) {
        case 'setTheme': {
            return {
                ...state,
                dark: action.payload === 'dark'
            } 
        }
        case 'toggleTheme': {
          return {
              ...state,
              dark: !state.dark
          }          
        }
        case 'setWaves': {
            return {
                ...state,
                waves: !action.payload
            }          
        }
        default:
            return state;
    }
}

const ThemeProvider = ({children}) => {
    const [themeState, themeDispatch] = useReducer(themeReducer, { dark: true, waves: false});
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeState.dark ? 'dark' : 'light')
    }, [themeState.dark])

    return <ThemeContext.Provider value={{themeState, themeDispatch}}>{ children }</ ThemeContext.Provider>
}

const useTheme = () => {
    const context = useContext(ThemeContext);
    if(context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
    return context;
}

export { ThemeProvider, useTheme }