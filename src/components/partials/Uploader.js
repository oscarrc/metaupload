import {ReactComponent as DragAndDropIcon} from '../../assets/icons/draganddrop.svg';
import {useDropzone} from 'react-dropzone'
import { useCallback, useState } from 'react';

const Uploader = () => {
    const [ files, setFiles ] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles)
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div  className="uploader">            
            <article  {...getRootProps()}>
                <input {...getInputProps()} />
                {files ?
                    <ul>
                        {files.map( (file,index) => 
                            <li key={index}>{file.path}</li>
                        )}
                    </ul> :
                    <span className={ isDragActive ? 'active' : ''}>                
                        <DragAndDropIcon />
                        <small>{isDragActive ? 'Drop files here' : 'Click or drag to upload'}</small>
                    </span>
                }
            </article>
        </div>
    )
}

export default Uploader;