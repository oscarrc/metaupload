import { Children, cloneElement, useCallback, useEffect, useState } from "react"
import { ReactComponent as CopyIcon } from '../../../assets/icons/copy.svg';

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

const File = ({ ipfs, file }) => {
    const [ progress, setProgress ] = useState(0);
    const [ cid, setCid ] = useState('');
    const copyToClipboard = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`${window.location.href}download/${cid}`)
    }

    const addFile = useCallback(async (file) => {
        const addedFile = await ipfs.add({
            path: file.name,
            content: file
        },{
            wrapWithDirectory: true,
            pin: true,
            progress: (bytesLoaded) => setProgress((bytesLoaded / file.size) * 100)
        })
    
        setCid(addedFile.cid)
    }, [ipfs])

    useEffect(() => addFile(file), [addFile, file])

    return (                                   
        <li data-type="file">
            <span>
                <i>{file.name}</i> 
                { cid ? 
                    <button onClick={copyToClipboard} className="outline"  data-tooltip="Copy link">
                        <CopyIcon />
                    </button> : 
                    null
                }
            </span>
            { progress <= 100 && !cid ? <progress { ...( progress === 100 ? {ideterminate: "true"} : {value: progress} ) } max="100" >Uploading</progress> : null}
        </li>
    )
}

export { List, File }
