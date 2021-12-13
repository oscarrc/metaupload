import { convertSize } from '../../utils/sizes';
import { ReactComponent as DownloadIcon } from '../../assets/icons/download.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg';
import { useState, useCallback } from 'react';
import { decryptFile } from "../../utils/crypto";

const Manager = ({files, ipfs, onDel}) => {
    const [ downloading, setDownloading ] = useState(false);
    const [ progress, setProgress ] = useState(0);

    const onCopy = (cid) => {
        const url = window.location.href.split('/');
        const downloadURL = `${url[0]}//${url[2]}/download/${cid}`;
        navigator.clipboard.writeText(downloadURL);
    }
    const onDelete = (index, cid) => {
        ipfs.pin.rm(cid);    
        onDel(index);
    }
    const onDownload = useCallback(async (file, pass) => {
        let chunks = []
        let donwloaded = 0;
        
        setDownloading(true);

        for await (const chunk of ipfs.cat(file.path)) {              
            chunks = chunks.concat(chunk)
            donwloaded += chunk.length;
            setProgress((donwloaded / file.size) * 100)
        }
        
        ipfs.pin.add(file.path);
        
        const decrypted = await decryptFile(file, chunks, pass);
       
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(decrypted);
        a.download = file.name;
        a.click();
        
        setDownloading(false);
    }, [ipfs])

    return (
        <figure>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        files.map((file, index) => (
                            <tr key={index}>
                                <td>{file.name}</td>
                                <td>{convertSize(file.size)}</td>
                                <td>{file.type}</td>
                                <td>
                                    <button onClick={() => { onCopy(file.cid) }} className="transparent icon"><CopyIcon /></button>
                                    <button onClick={() => { onDownload(file) }} className="transparent icon"><DownloadIcon /></button>
                                    <button onClick={() => { onDelete(index, file.cid) }} className="transparent icon"><TrashIcon /></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </figure>
    )
}

export default Manager;