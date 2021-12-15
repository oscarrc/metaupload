
import { useIPFS } from '../../../hooks/useIPFS';
import { List, File } from "./List";
import { useEffect, useState, useCallback } from 'react';

const Manager = () => {
    const { ipfs, isIpfsReady } = useIPFS();
    const [ files, setFiles ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const getPins = useCallback(async () => {
        setIsLoading(true);
        let files = [];
        for await (const { cid } of ipfs.pin.ls({type: 'recursive'})) {
            for await (const file of ipfs.ls(cid)) {
                files.push(file);
            }
        }
        setIsLoading(false);
        setFiles(files);
    },[ipfs]);

    useEffect(() => {
        if(isIpfsReady && ipfs) getPins();
    }, [isIpfsReady, ipfs, getPins]);

    return (
        <figure>
            <table aria-busy={isLoading}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <List ipfs={ipfs}>
                    {
                        files.map((file, index) => (
                            <File key={index} index={index} file={file} onDel={ (index) => { setFiles(files.splice(index, 1))} } />
                        ))
                    }
                </List>
            </table>
        </figure>
    )
}

export default Manager;