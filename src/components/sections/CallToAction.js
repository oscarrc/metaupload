import { usePWA } from '../../hooks/usePWA';

const CallToAction = () => {
    const { installation } = usePWA();

    return (
        <section id="callToAction">
            <div className="container">  
                <h2>Do you like Metaupload?</h2>                                
                <div className="grid">                    
                    { installation ?
                        <button onClick={installation.prompt}>
                            <img src="/img/icon.svg" alt="Install Metaupload"/>
                            Install the app
                        </button> :
                        null
                    }
                    <a role="button" target="_BLANK" rel="noreferrer" className="contrast" href="https://ko-fi.com/oscarrc">
                        <img src="/img/kofi.png" alt="Support me on Ko-fi"/>
                        Support me on Ko-fi
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