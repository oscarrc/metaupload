import { useEffect } from "react"
import { useTheme } from "../hooks/useThemeContext";

const Privacy = () => {
    const { themeDispatch } = useTheme();

    useEffect(() => {
        themeDispatch({type: "setWaves", payload: true});
    }, [themeDispatch])

    return (
        <div>
            <section id="policy">
                <div className="container">   
                    <h2>Privacy policy</h2>
                    <p className="prose">METAUPLOAD&trade; (from now on "the software") does not store any user personal data, nor will collect and / or share any information with third parties</p>
                    <p className="prose">All the information is stored on the user's computer and, due to the decentralized nature of the software, it's also stored on other users' computers.
                       Those users are not aware of the data stored on their computers since it's encrypted. They're merely seeders for your content.
                    </p>
                    <p className="prose"><strong>Although all the information is encrypted, the software hasn't been audited, so use it at your own risk.</strong></p>
                </div>
            </section>
        </div>
    )
}

export default Privacy