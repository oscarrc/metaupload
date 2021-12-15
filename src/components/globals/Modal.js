import { useEffect, useRef } from 'react';

const Modal = ({children, show, toggle}) => {
    const ref = useRef(null);

    useEffect(() => {
        if(show) document.body.classList.add('modal-open');
        else document.body.classList.remove('modal-open');
    }, [show])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) toggle()
        }

        const handleEscKey = (event) => {
            if (event.keyCode === 27) toggle()
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscKey);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [ref, toggle]);

    if(!show) return null;
    
    return (
        <div className="fluid-container" role="alertdialog">
            <div className="content" ref={ref}>
                { children }
            </div>
        </div>
    )
}

export default Modal;