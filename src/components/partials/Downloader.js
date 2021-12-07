

import { useIPFS } from './../../hooks/useIPFS';
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react';

const Uploader = () => {
    const { ipfs, isIpfsReady } = useIPFS();
    const { cid } = useParams();
    const [ files, setFiles ] = useState([]);

    const getData = useCallback(async (cid) => {
        const data = ipfs.ls(cid);
        let files = [];
        for await (const file of data) {
            files.push(file)
        }
        setFiles(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ipfs]);

    useEffect(() => {
        if(isIpfsReady) getData(cid)
    }, [isIpfsReady, cid, getData])

    return (
        <article className="downloader" aria-busy={ !files.length || !isIpfsReady }>
            { files.length ?
                <ul>
                    {files.map( (file,index) => 
                        <li key={index}>{file.name}</li>
                    )}
                </ul> :
                null
            }
        </article>
    )
}

export default Uploader;