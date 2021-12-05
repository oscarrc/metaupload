import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext();

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'setTheme': {
            return {
                ...state,
                theme: action.payload
            } 
        }
        case 'toggleTheme': {
          return {
              ...state,
              theme: state.theme === 'dark' ? 'light' : ' dark'
          }          
        }
        case 'toggleWaves': {
            return {
                ...state,
                waves: !state.waves
            }          
        }
        default:
            break
    }
}

const ThemeProvider = ({children}) => {
    const [state, dispatch] = useState(themeReducer, { theme: 'dark', waves: false});
    const value = {state, dispatch}

    return <ThemeContext.Provider value={value}>{ children }</ ThemeContext.Provider>
}

const useTheme = () => {
    const context = useContext(ThemeContext);
    if(context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
    return context;
}

export { ThemeProvider, useTheme }