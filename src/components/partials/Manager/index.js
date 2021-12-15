
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
        for await (const { cid } of ipfs.pin.ls()) {
            for await (const file of ipfs.ls(cid)) {
                files.push(file);
            }
        }
        setIsLoading(false);
        setFiles(files);
    },[ipfs]);

    const onDelete = (index) => {
        const f = files;
        f.splice(index, 1);
        setFiles(f);
    }

    const renderFiles = (files) => {
        const rendered = []
        files.forEach((file, index) => (
            rendered.push(<File key={index} index={index} file={file} delCallback={onDelete} />)
        ))
        return rendered
    }

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
                    { renderFiles(files) }
                </List>
            </table>
        </figure>
    )
}

export default Manager;