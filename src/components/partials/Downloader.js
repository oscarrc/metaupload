

import { useIPFS } from './../../hooks/useIPFS';
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react';

const Uploader = () => {
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
        setTimeout( () => setReady(true), 500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ipfs]);

    const getFile = async (file) => {
        console.log(file)
        let chunks = []

        for await (const chunk of ipfs.get(file.path)) {              
            chunks.push(chunk)
        }

        const blob = new Blob([chunks], { type: 'application/octet-stream' });
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'test.txt';
        a.click();
    }

    useEffect(() => {
        if(isIpfsReady) getData(cid)
    }, [isIpfsReady, cid, getData])

    return (
        <div className="downloader">
            <article aria-busy={ !isIpfsReady }>
                { isIpfsReady ? 
                    <span>
                        { files.length > 0 && ready ?
                            <ul>
                                {files.map( (file,index) => 
                                    <li onClick={ () => getFile(file) } role="button" key={index} data-type="file">{file.name}</li>
                                )}
                            </ul> :
                            <p>There are no files available for this CID</p>
                        }
                    </span> :
                    null }
            </article>
        </div>
    )
}

export default Uploader;