import FilesHero from '../components/heros/FilesHero'
import Uploader from '../components/partials/Uploader'
import About from '../components/sections/AboutSection'
import HowTo from '../components/sections/HowToSection'
import PoweredBy from '../components/sections/PoweredBy'

const Home = () => {
    return (
        <div>
            <FilesHero title="DECENTRALIZED FILE SHARING" subtitle="Drag an drop files below and start sharing">
                <Uploader />
            </FilesHero>
            <About />
            <HowTo />
            <PoweredBy />
        </div>
    )
}

export default Home