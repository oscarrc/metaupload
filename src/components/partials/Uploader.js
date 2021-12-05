import {ReactComponent as DragAndDropIcon} from '../../assets/icons/draganddrop.svg';


const Uploader = () => {
    return (
        <article className="uploader">
            <span>                
                <DragAndDropIcon />
                <small>Click or drag to upload</small>
            </span>
        </article>
    )
}

export default Uploader;