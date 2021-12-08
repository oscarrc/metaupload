import { ReactComponent as DragAndDropIcon } from '../../assets/icons/draganddrop.svg';
import { useDropzone } from 'react-dropzone'
import { useState } from 'react';
import { useIPFS } from './../../hooks/useIPFS';
import { List, File } from "./Lists/UploaderList";

const Uploader = () => {
    const [ files, setFiles ] = useState([]);
    const { ipfs, isIpfsReady, ipfsInitError } = useIPFS();
    const onDrop =  async acceptedFiles => setFiles(files.concat(acceptedFiles))
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className="uploader">   
            <article {...getRootProps()} aria-busy={!isIpfsReady}>
                <input {...getInputProps()} disabled={!isIpfsReady} />
                { isIpfsReady && !ipfsInitError ? 
                    <span className={ isDragActive ? 'active' : ''}>                            
                        { files.length ?
                            <List ipfs={ipfs}>
                                { files.map( file => <File key={file.path} file={file} /> ) }
                            </List> :          
                            <>
                                <DragAndDropIcon />
                                <small>{isDragActive ? 'Drop files here' : 'Click or drag to upload'}</small>
                            </>
                        }
                    </span> :
                    null
                }
            </article>
        </div>
    )
}

export default Uploader;