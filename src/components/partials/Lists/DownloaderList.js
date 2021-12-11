import { Children, cloneElement, useCallback, useState } from "react"
import { ReactComponent as DownloadIcon } from '../../../assets/icons/download.svg';
import { decryptFile } from "../../../utils/crypto";

const List = ({ ipfs, children }) => {
    return (
        <ul>
            {  Children.map(children, (child, index) => {
                    return cloneElement(child, {
                        key: index,
                        ipfs: ipfs
                    })
                })}
        </ul>
    )
}

const File = ({ ipfs, file, pass }) => {
    const [ progress, setProgress ] = useState(0);
    const [ downloading, setDownloading ] = useState(false);
    
    const getFile = useCallback(async (file) => {
        let chunks = []
        let donwloaded = 0;
        
        setDownloading(true);

        for await (const chunk of ipfs.cat(file.path)) {              
            chunks = chunks.concat(chunk)
            donwloaded += chunk.length;
            setProgress((donwloaded / file.size) * 100)
        }
        
        ipfs.pin.add(file.path);
        
        const decrypted = await decryptFile(chunks, pass);
       
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(decrypted);
        a.download = file.name;
        a.click();
        
        setDownloading(false);
    }, [ipfs, pass])

    return (                                   
        <li data-type="file">
            <span>
                <i>{file.name}</i>
                <button onClick={ () => getFile(file) } className="outline" disabled={ downloading }>
                    <DownloadIcon />
                </button>
            </span>
            { progress <= 100 && downloading ? <progress { ...( progress === 100 ? {ideterminate: "true"} : {value: progress} ) } max="100" ></progress> : null }
        </li>
    )
}

export { List, File }
