import useInView from "react-cool-inview";
import { useTheme } from "../../contexts/themeContext";

const FilesHero = ({title, subtitle, children}) => {
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
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                        <br />  
                        { children }     
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default FilesHero;