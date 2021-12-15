import { Children, cloneElement, useCallback, useState } from "react"
import { convertSize } from '../../../utils/sizes';
import { decryptFile } from "../../../utils/crypto";
import { ReactComponent as DownloadIcon } from '../../../assets/icons/download.svg';
import { ReactComponent as TrashIcon } from '../../../assets/icons/trash.svg';
import { ReactComponent as CopyIcon } from '../../../assets/icons/copy.svg';

const List = ({ ipfs, children }) => {
    return (
        <tbody>
            {  Children.map(children, (child, index) => {
                    return cloneElement(child, {
                        key: index,
                        ipfs: ipfs
                    })
                })}
        </tbody>
    )
}

const File = ({ ipfs, index, file, delCallback }) => {    
    const [ downloading, setDownloading ] = useState(false);
    const [ progress, setProgress ] = useState(0);

    const onCopy = (cid) => {
        const url = window.location.href.split('/');
        const downloadURL = `${url[0]}//${url[2]}/download/${cid}`;
        navigator.clipboard.writeText(downloadURL);
    }
    const onDelete = (index, cid) => {
        console.log(ipfs)
        ipfs.pin.rm(cid);    
        delCallback(index);
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
        <tr>
            <td>
                {file.name}                    
                { progress <= 100 && downloading ? 
                    <progress { ...( progress === 100 ? {ideterminate: "true"} : {value: progress} ) } max="100" ></progress>:
                    null
                }
            </td>
            <td>{convertSize(file.size)}</td>
            <td>{file.type}</td>
            <td>
                <button onClick={() => { onCopy(file.cid) }} className="transparent icon"><CopyIcon /></button>
                <button disabled={downloading} onClick={() => { onDownload(file) }} className="transparent icon"><DownloadIcon /></button>
                <button onClick={() => { onDelete(index, file.cid) }} className="transparent icon"><TrashIcon /></button>
            </td>
        </tr>
    )
}

export { List, File }
