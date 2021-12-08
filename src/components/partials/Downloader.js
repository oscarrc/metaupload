

import { useIPFS } from './../../hooks/useIPFS';
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react';
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg';

const Downloader = () => {
    const { ipfs, isIpfsReady } = useIPFS();
    const { cid } = useParams();
    const [ files, setFiles ] = useState([]);
    const [ ready, setReady ] = useState(false)

    const getData = useCallback(async (cid) => {
        const data = ipfs.ls(cid);
        let files = [];
        
        for await (const file of data) {
            files.push(file)
            console.log(file)
        }
        
        setFiles(files);
        setTimeout( () => setReady(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ipfs]);

    const getFile = async (file) => {
        let chunks = []

        for await (const chunk of ipfs.cat(file.path)) {              
            chunks = chunks.concat(chunk)
        }

        const blob = new Blob(chunks, { type: 'application/octet-stream' });
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = file.name;
        a.click();
    }

    useEffect(() => {
        if(isIpfsReady) getData(cid)
    }, [isIpfsReady, cid, getData])

    return (
        <div className="downloader">
            <article aria-busy={ !isIpfsReady }>
                { isIpfsReady ? 
                    <div>
                        { files.length >= 1 && ready ?
                            <ul>
                                {files.map( (file,index) => 
                                    <li role="button" key={index} data-type="file">
                                        <span>
                                            <i>{file.name}</i>
                                            <button onClick={ () => getFile(file) } className="outline">
                                                <DownloadIcon />
                                            </button>
                                        </span>
                                    </li>
                                )}
                            </ul> :
                            <p>There are no files available for this CID</p>
                        }
                    </div> :
                    null }
            </article>
        </div>
    )
}

export default Downloader;