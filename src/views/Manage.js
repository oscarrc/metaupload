import { useIPFS } from '../hooks/useIPFS';
import { useEffect, useCallback, useState } from 'react';
import Manager from '../components/partials/Manager';

const Manage = () => {    
    const { ipfs, isIpfsReady } = useIPFS();
    const [files, setFiles] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const getPins = useCallback(async () => {
        setIsLoading(true);
        for await (const {cid} of ipfs.pin.ls()) {
            for await (const file of ipfs.ls(cid)) {
                setFiles(files.concat(file));
            }
        }
        setIsLoading(false);
    },[ipfs, files]);

    useEffect(() => {
        if(isIpfsReady) getPins();
    }, [getPins, isIpfsReady]);

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
                        <li>Upload</li>
                    </ul>    
                </nav>          
                <Manager files={files} />
            </div>
        </section>
    )
}

export default Manage;