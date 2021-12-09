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
                </div>
            </section>
        </div>
    )
}

export default Privacy