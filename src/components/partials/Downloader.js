

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
        console.log(files)
        setFiles(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ipfs]);

    const getFile = async (path, name) => {
        console.log(path)
        const chunks = []

        for await (const chunk of ipfs.get(path)) {              
            console.log(chunk.content)
            chunks.push(chunk)
        }

        const blob = new Blob([chunks], { type: 'application/octet-stream' });
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = name;
        a.click();

        console.log(blob)
    }

    useEffect(() => {
        if(isIpfsReady) getData(cid)
    }, [isIpfsReady, cid, getData])

    return (
        <div className="downloader">
            <article aria-busy={ !files.length || !isIpfsReady }>
                { isIpfsReady ? 
                    <span>
                        { files.length ?
                            <ul>
                                {files.map( (file,index) => 
                                    <li onClick={ () => getFile(file.path, file.name) } role="button" key={index} data-type="file">{file.name}</li>
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