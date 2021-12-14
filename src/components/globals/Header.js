import { useTheme } from "../../hooks/useThemeContext";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const Header = () => {
    const { themeState, themeDispatch } = useTheme();
    const location = useLocation();
    const toggleTheme = () => themeDispatch({type:"toggleTheme"})
   
    return (
        <header className={ themeState.waves ? 'waves' : '' }>
            <nav className="container-fluid">
                <ul>
                    <li>
                        <Link to="/">
                            <img src="/img/logo.svg" width="300" height="80" alt="metaupload" />
                        </Link>
                    </li>
                </ul>
                <ul>
                    { location.pathname !== '/manage' ?
                        <li><Link to="/manage" className="contrast">Manage</Link></li> :
                        null
                    }
                    <li><button onClick={toggleTheme} className="round">{ themeState.dark ? '☀' : '🌙'}</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;