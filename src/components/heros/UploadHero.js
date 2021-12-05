import Uploader from "../partials/Uploader"
import useInView from "react-cool-inview";
import { useTheme } from "../../contexts/themeContext";

const UploadHero = () => {
    const { themeDispatch } = useTheme();
    
    const { observe } = useInView({
        threshold: 0.25,
        onEnter: () => themeDispatch({type: "setWaves", payload: true}),
        onLeave: () => themeDispatch({type: "setWaves", payload: false})
    })

    return (
        <div ref={ observe } className="hero background-image-container">
            <div className="fluid-container">
                <div className="grid">
                    <div>
                        <h1>DECENTRALIZED FILE SHARING</h1>
                        <p>Drag an drop files below and start sharing</p>
                        <br />  
                        <Uploader />        
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default UploadHero;