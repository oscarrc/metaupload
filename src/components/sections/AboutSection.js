const About = () => {
    return (
        <section id="about">
            <div className="container">                
                <h2>About</h2>
                <p>
                    Metaupload&trade; is an anonymous, fully <strong>decentralized</strong>, file sharing service based on IPFS. All files are hashed and encrypted on upload an a decryption key is needed to acces those files again.
                </p>
                <p>
                    <a href="https://ipfs.io" target="_BLANK" rel="noreferrer">IPFS</a> (Inter-Planetary File System) is a distributed system for storing and accesing files in a p2p enviroment. <br />
                    What that means is that IPFS makes it <strong>harder to censor</strong> content and supports a <strong>resilient internet</strong>.
                </p>
            </div>
        </section>
    )
}

export default About;