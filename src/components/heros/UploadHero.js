import Uploader from "../partials/Uploader"

const UploadHero = () => {
    return (
        <div class="hero background-image-container">
            <div class="fluid-container">
                <div class="grid">
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