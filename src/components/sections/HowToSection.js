const HowTo = () => {
    return (
        <section id="howto" className="variation">
            <div className="container">                
                <h2>How it works</h2>
                <p>
                    Metaupload&trade; works like a classic p2p file sharing software, that means you run a instance of this page in your computer
                    in order to "seed" the contents to other users. The content will be available as long as it stays on someones computer and that computer is connected to the internet and
                    running an instance of Metaupload&trade;.
                </p>
                <p>
                    The content upload will be encrypted and thus it will be accesible only to others with the encryption key which by default is included in the link:
                </p>
                <p class="centered">https://metaupload.oscarrc.me/download/<mark>KEY</mark><strong>:</strong><mark>FILE ID</mark></p>
            </div>
        </section>
    )
}

export default HowTo;