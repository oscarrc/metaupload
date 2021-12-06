import FilesHero from '../components/heros/FilesHero'
import Downloader from '../components/partials/Downloader'
import About from '../components/sections/AboutSection'
import HowTo from '../components/sections/HowToSection'
import PoweredBy from '../components/sections/PoweredBy'

const Download = () => {
    return (
        <div>
            <FilesHero title="DECENTRALIZED FILE SHARING" subtitle="Your files are ready below">
                <Downloader />
            </FilesHero>
            <About />
            <HowTo />
            <PoweredBy />
        </div>
    )
}

export default Download