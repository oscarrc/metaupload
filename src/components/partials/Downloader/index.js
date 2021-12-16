import { useIPFS } from '../../../hooks/useIPFS';
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react';
import { List, File } from "./List";

const useFileParams = () => {
    let { file } = useParams();
    const params = file.split(':')
    const cid = params.length === 1 ? params[0] : params[1];
    const key = params.length === 1 ? '' : params[0];
    return { cid, key }
}

const Downloader = () => {
    const { ipfs, isIpfsReady, ipfsInitError } = useIPFS();
    const { cid, key } = useFileParams();
    const [ files, setFiles ] = useState([]);
    const [ ready, setReady ] = useState(false)

    const getData = useCallback(async (cid) => {
        const data = ipfs.ls(cid);
        let files = [];
        
        for await (const file of data) {
            files.push(file)
        }
        
        setFiles(files);
        setReady(true)
    }, [ipfs]);

    useEffect(() => {
        if(isIpfsReady && cid) getData(cid)
    }, [isIpfsReady, cid, getData])

    return (
        <div className="downloader">
            <article aria-busy={ !isIpfsReady || !ready }>
                { isIpfsReady && !ipfsInitError && ready ? 
                    <div>
                        { files.length >= 1 ?
                            <List ipfs={ipfs}>
                                { files.map( file => <File key={file.path} pass={key} file={file} /> ) }
                            </List> :
                            <p>There are no files available for this CID or they are no longer available</p>
                        }
                    </div> :
                    null 
                }
            </article>
        </div>
    )
}

export default Downloader;