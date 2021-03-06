import { ReactComponent as DragAndDropIcon } from '../../../assets/icons/draganddrop.svg';
import { useDropzone } from 'react-dropzone'
import { useState } from 'react';
import { useIPFS } from '../../../hooks/useIPFS';
import { List, File } from "./List";

const Uploader = () => {
    const [ files, setFiles ] = useState([]);
    const { ipfs, isIpfsReady, ipfsInitError } = useIPFS();
    const onDrop =  async acceptedFiles => setFiles(files.concat(acceptedFiles))
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className="uploader">   
            <article {...getRootProps()} aria-busy={!isIpfsReady}>
                { isIpfsReady && !ipfsInitError ? 
                    <div className={ isDragActive ? 'active' : ''}>                        
                        <input {...getInputProps()} disabled={!isIpfsReady} />                            
                        { files.length ?
                            <List ipfs={ipfs}>
                                { files.map( file => <File key={file.path} file={file} /> ) }
                            </List> :          
                            <>
                                <DragAndDropIcon className="action" />
                                <small>{isDragActive ? 'Drop files here' : 'Click or drag to upload'}</small>
                            </>
                        }
                    </div> :
                    null
                }
            </article>
        </div>
    )
}

export default Uploader;