import { useIPFS } from '../hooks/useIPFS';
import { useEffect, useCallback, useState } from 'react';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import Manager from '../components/partials/Manager';
import Loading from '../views/Loading';

const Manage = () => {    
    const { ipfs, isIpfsReady } = useIPFS();
    const [files, setFiles] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const getPins = useCallback(async () => {
        setIsLoading(true);
        let files = [];
        for await (const { cid } of ipfs.pin.ls({type: 'recursive'})) {
            for await (const file of ipfs.ls(cid)) {
                console.log(file)
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
                            <button className="outline icon"><UploadIcon /></button>
                        </li>
                    </ul>    
                </nav>          
                { isLoading ?
                    <Loading /> :
                    files.length ?
                        <Manager files={files} ipfs={ipfs} onDel={ (index) => { setFiles(files.splice(index, 1))}}/> :
                        <p>You haven't uploaded any files yet</p>
                    
                }
            </div>
        </section>
    )
}

export default Manage;