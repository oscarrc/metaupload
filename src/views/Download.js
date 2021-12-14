import FilesHero from '../components/heros/FilesHero'
import Downloader from '../components/partials/Downloader'
import About from '../components/sections/AboutSection'
import HowTo from '../components/sections/HowToSection'
import CallToAction from '../components/sections/CallToAction'

const Download = () => {
    return (
        <div>
            <FilesHero title="DECENTRALIZED FILE SHARING" subtitle="Your files are ready below">
                <Downloader />
            </FilesHero>
            <About />
            <HowTo />
            <CallToAction />
        </div>
    )
}

export default Download