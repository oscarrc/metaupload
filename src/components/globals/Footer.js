import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="container-fluid grid">
            <div>
                <img src="/img/slogan.svg" width="400" height="100" alt="Decentralized file sharing" />
            </div>
            <div>
                <nav>
                    <ul>
                        <li><a className="contrast" href="https://ko-fi.com/oscarrc" target="_BLANK" rel="noreferrer">Buy me a coffee</a></li>
                        <li><Link className="contrast" to="/terms">Terms and conditions</Link></li>
                        <li><Link className="contrast" to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </nav>
            </div>
            </div>
            <div className="container-fluid">
            <p className="copy">Made with ❤️ by <a href="https://oscarrc.me" target="_BLANK" rel="noreferrer">Oscar R.C.</a></p>
            </div>
        </footer>
    )
}

export default Footer;