import useInView from "react-cool-inview";
import { useTheme } from "../../hooks/useThemeContext";

const FilesHero = ({title, subtitle, text, children}) => {
    const { themeDispatch } = useTheme();
    
    const { observe } = useInView({
        threshold: 0.25,
        onEnter: () => themeDispatch({type: "setWaves", payload: false}),
        onLeave: () => themeDispatch({type: "setWaves", payload: true})
    })

    return (
        <div ref={ observe } className="hero background-image-container">
            <div className="fluid-container">
                <div className="grid">
                    <div>
                        <h1>{title}</h1>
                        <h6 className="contrast">{subtitle}</h6>
                        { text ? <small><i>{text}</i></small> : null }
                        <br />  
                        { children }     
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default FilesHero;