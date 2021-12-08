import { Children, cloneElement, useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom";

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
        <Wrapper cid={cid}>                                        
            <li data-type="file">
                {file.name}
                <progress className={ progress >= 100 && cid ? 'fadeOut' : ''} value={ progress } max="100"></progress>
            </li>
        </Wrapper>
    )
}

const Wrapper = ({cid, children}) => {
    if (cid) return (
        <Link to={`/download/${cid}`}> 
            { children }
        </Link>
    )

    return <>{ children }</>;
}

export { List, File }
