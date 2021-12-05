import FilesHero from '../components/heros/FilesHero'
import Uploader from '../components/partials/Uploader'
import About from '../components/sections/AboutSection'

const Home = () => {
    return (
        <div>
            <FilesHero title="DECENTRALIZED FILE SHARING" subtitle="Drag an drop files below and start sharing">
                <Uploader />
            </FilesHero>
            <About />
        </div>
    )
}

export default Home