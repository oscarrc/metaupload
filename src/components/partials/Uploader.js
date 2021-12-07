import {ReactComponent as DragAndDropIcon} from '../../assets/icons/draganddrop.svg';
import {useDropzone} from 'react-dropzone'
import { useState } from 'react';
import { useIPFS } from './../../hooks/useIPFS';

const Uploader = () => {
    const [ files, setFiles ] = useState([]);
    const { ipfs, isIpfsReady, ipfsInitError } = useIPFS();

    const onDrop =  async acceptedFiles => {
        // console.log(acceptedFiles)
        // const results = ipfs.addAll(acceptedFiles, {wrapWithDirectory: true});
        // for await (const result of results) {
        //     console.log(result)
        // }
        // setFiles(files.concat(acceptedFiles));
        let promises = [];

        for(const file of acceptedFiles) {
            let filePromise = new Promise(resolve => {
                let reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = () => resolve({path: file.path, content: reader.result});
            })

            promises.push(filePromise);
        }
        
        const files = await Promise.all(promises)
        const results = ipfs.addAll(files, {wrapWithDirectory: true});

        for await (const result of results) {
            ipfs.pin.addAll(results)
            console.log(result)
        }

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
                                    <li key={index} data-type="file">{file.path}</li>
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