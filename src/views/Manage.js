import { useIPFS } from '../hooks/useIPFS';
import { useEffect, useCallback, useState } from 'react';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import Manager from '../components/partials/Manager';

const Manage = () => {    
    const { ipfs, isIpfsReady } = useIPFS();
    const [files, setFiles] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const getPins = useCallback(async () => {
        setIsLoading(true);
        let files = [];
        for await (const {cid} of ipfs.pin.ls()) {
            for await (const file of ipfs.ls(cid)) {
                files.push(file);
            }
        }
        setIsLoading(false);
        setFiles(files);
    },[ipfs]);

    useEffect(() => {
        if(isIpfsReady) getPins();
    }, [isIpfsReady, getPins]);

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
                            <button className="transparent icon"><UploadIcon /></button>
                        </li>
                    </ul>    
                </nav>          
                { files.length ?
                    <Manager files={files} ipfs={ipfs} onDel={ (index) => { setFiles(files.splice(index, 1))}}/> :
                    <p>There aren't any files yet</p>
                }
            </div>
        </section>
    )
}

export default Manage;