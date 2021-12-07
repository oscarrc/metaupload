

import { useIPFS } from './../../hooks/useIPFS';
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react';

const Uploader = () => {
    const { ipfs, isIpfsReady } = useIPFS();
    const { cid } = useParams();
    const [ files, setFiles ] = useState(null);

    const getData = useCallback(async (cid) => {
        for await (const file of ipfs.ls(cid)) {
            console.log(file)
        }
    }, [ipfs]);

    useEffect(() => {
        if(isIpfsReady) getData(cid)
    }, [isIpfsReady, cid, getData])

    return (
        <article className="downloader" aria-busy={ !files || !isIpfsReady }>
        </article>
    )
}

export default Uploader;