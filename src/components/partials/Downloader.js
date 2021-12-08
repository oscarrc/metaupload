

import { useIPFS } from './../../hooks/useIPFS';
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react';
import { List, File } from "./Lists/DownloaderList";

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
        }
        
        setFiles(files);
        setTimeout( () => setReady(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ipfs]);

    useEffect(() => {
        if(isIpfsReady) getData(cid)
    }, [isIpfsReady, cid, getData])

    return (
        <div className="downloader">
            <article aria-busy={ !isIpfsReady }>
                { isIpfsReady ? 
                    <div>
                        { files.length >= 1 && ready ?
                            <List ipfs={ipfs}>
                                { files.map( file => <File key={file.path} file={file} /> ) }
                            </List> :
                            <p>There are no files available for this CID</p>
                        }
                    </div> :
                    null }
            </article>
        </div>
    )
}

export default Downloader;