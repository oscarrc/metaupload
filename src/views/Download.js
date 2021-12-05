import FilesHero from '../components/heros/FilesHero'
import Downloader from '../components/partials/Downloader'
import About from '../components/sections/AboutSection'

const Download = () => {
    return (
        <div>
            <FilesHero title="DECENTRALIZED FILE SHARING" subtitle="Your files are ready below">
                <Downloader />
            </FilesHero>
            <About />
        </div>
    )
}

export default Download