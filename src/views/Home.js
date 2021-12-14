import FilesHero from '../components/heros/FilesHero'
import Uploader from '../components/partials/Uploader'
import About from '../components/sections/AboutSection'
import HowTo from '../components/sections/HowToSection'
import CallToAction from '../components/sections/CallToAction'

const Home = () => {
    return (
        <div>
            <FilesHero title="DECENTRALIZED FILE SHARING" subtitle="Drag and drop files below and start sharing">
                <Uploader />
            </FilesHero>
            <About />
            <HowTo />
            <CallToAction />
        </div>
    )
}

export default Home