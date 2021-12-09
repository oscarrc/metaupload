import { useEffect } from "react"
import { useTheme } from "../hooks/useThemeContext";

const Terms = () => {
    const { themeDispatch } = useTheme();

    useEffect(() => {
        themeDispatch({type: "setWaves", payload: true});
    }, [themeDispatch])

    return (
        <div>
            <section id="policy">
                <div className="container">   
                    <h2>Terms and conditions</h2>
                </div>
            </section>
        </div>
    )
}

export default Terms