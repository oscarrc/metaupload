const Header = () => {
    return (
        <header className="">
            <nav className="container-fluid">
            <ul>
                <li>
                    <img src="/img/logo.svg" width="300" height="80" alt="metaupload" />
                </li>
            </ul>
            <ul>
                <li><a href="#support" className="outline contrast" role="button">Support us</a></li>
            </ul>
            </nav>
        </header>
    )
}

export default Header;