import { useEffect, useState } from "react"
import { useTheme } from "../hooks/useThemeContext";

import Manager from '../components/partials/Manager';
import Modal from '../components/globals/Modal';
import Uploader from '../components/partials/Uploader';

import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';

const Manage = () => {
    const { themeDispatch } = useTheme();
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const toggle = () => setIsModalOpen(!isModalOpen);

    useEffect(() => {
        themeDispatch({type: "setWaves", payload: true});
    }, [themeDispatch])

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
                            <button className="outline icon" onClick={toggle} ><UploadIcon /></button>
                        </li>
                    </ul>    
                </nav>          
                <Manager />
            </div>
            <Modal show={isModalOpen} toggle={toggle}>
                <Uploader />
            </Modal>
        </section>
    )
}

export default Manage;