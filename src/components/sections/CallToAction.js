import { usePWA } from '../../hooks/usePWA';

const CallToAction = () => {
    const { promptInstall, installable } = usePWA();

    return (
        <section id="callToAction">
            <div className="container">  
                <h2>Do you like Metaupload?</h2>                                
                <div className="grid">                    
                    { installable ?
                        <button onClick={ promptInstall }>
                            <img src="/img/icon.svg" alt="Install Metaupload"/>
                            Install the app
                        </button> :
                        null
                    }
                    <a role="button" target="_BLANK" rel="noreferrer" className="contrast" href="https://ko-fi.com/oscarrc">
                        <img src="/img/kofi.png" alt="Support on Ko-fi"/>
                        Support on Ko-fi
                    </a>
                    <a role="button" target="_BLANK" rel="noreferrer" className="secondary" href="https://github.com/oscarrc/metaupload">
                        <img src="/img/github.png" alt="Contribute on Github"/>
                        Contribute on Github
                    </a>
                </div>
            </div>
        </section>
    )
}

export default CallToAction;