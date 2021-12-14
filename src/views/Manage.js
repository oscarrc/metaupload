import Manager from '../components/partials/Manager';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';

const Manage = () => {
    return (
        <section id="manage">
            <div className="container"> 
                <nav>
                    <ul>
                        <li>
                            <h3>Your files</h3> 
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <button className="outline icon"><UploadIcon /></button>
                        </li>
                    </ul>    
                </nav>          
                <Manager />
            </div>
        </section>
    )
}

export default Manage;