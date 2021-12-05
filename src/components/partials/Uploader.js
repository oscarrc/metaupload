import {ReactComponent as DragAndDropIcon} from '../../assets/icons/draganddrop.svg';
import {useDropzone} from 'react-dropzone'
import { useCallback, useState } from 'react';
import generateMD5 from '../../lib/md5';

const Uploader = () => {
    const [ files, setFiles ] = useState([]);

    const onDrop =  useCallback(acceptedFiles => {
        setFiles(files.concat(acceptedFiles))
        generateMD5(acceptedFiles[0])
    }, [files])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className="uploader">   
            <article  {...getRootProps()}>
                <input {...getInputProps()} />
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
                    </span>
            </article>
        </div>
    )
}

export default Uploader;