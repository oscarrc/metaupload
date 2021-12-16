import { Children, cloneElement, useCallback, useEffect, useState, useRef } from "react"
import { ReactComponent as CopyIcon } from '../../../assets/icons/copy.svg';
import { encryptFile, deriveKey } from '../../../utils/crypto';
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
    const [ key, setKey ] = useState('');
    const [ wasCopied, setWasCopied ] = useState(false);
    const copyButton = useRef(null);

    const copyToClipboard = (e) => {
        e.stopPropagation();
        setWasCopied(true);
        setTimeout(() => {
            setWasCopied(false);
            copyButton.current?.blur();
        }, 3000);
        navigator.clipboard.writeText(`${window.location.href}download/${cid}:${key}`);
    }

    const addFile = useCallback(async (file) => {        
        const keys = await ipfs.key.list()
        const derivedKey = await deriveKey(file.name, keys[0].id); 
        const encryptedFile = await encryptFile(file, derivedKey);
        const addedFile = await ipfs.add({
            path: file.name,
            content: encryptedFile
        },{
            wrapWithDirectory: true,
            progress: (bytesLoaded) => setProgress((bytesLoaded / encryptedFile.size) * 100)
        })    
        setKey(derivedKey);
        setCid(addedFile.cid)
    }, [ipfs])

    useEffect(() => addFile(file), [addFile, file])

    return (                                   
        <li data-type="file">
            <span>
                <i>{file.name}</i> 
                { cid ? 
                    <button ref={copyButton} onClick={copyToClipboard} className="transparent icon"  data-tooltip={ wasCopied ? 'Copied !' : 'Copy link' }>
                        <CopyIcon />
                    </button> : 
                    null
                }
            </span>
            { progress <= 100 && !cid ? <progress { ...( (progress === 100 || progress === 0) ? {ideterminate: "true"} : {value: progress} ) } max="100" >{progress} / 100</progress> : null}
        </li>
    )
}

export { List, File }
