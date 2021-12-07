import {ReactComponent as DragAndDropIcon} from '../../assets/icons/draganddrop.svg';
import {useDropzone} from 'react-dropzone'
import { useState } from 'react';
import { useIPFS } from './../../hooks/useIPFS';

const Uploader = () => {
    const [ files, setFiles ] = useState([]);
    const { ipfs, isIpfsReady, ipfsInitError } = useIPFS();

    const onDrop =  async acceptedFiles => {
        const results = await ipfs.add(acceptedFiles[0]);
        console.log(results)
        setFiles(files.concat(acceptedFiles));
    }
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className="uploader">   
            <article  {...getRootProps()} aria-busy={!isIpfsReady}>
                <input {...getInputProps()} />
                { isIpfsReady && !ipfsInitError ? 
                    <span className={ isDragActive ? 'active' : ''}>                            
                        { files.length ?
                            <ul>
                                {files.map( (file,index) => 
                                    <li key={index}>{file.path}</li>
                                )}
                            </ul> :            
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