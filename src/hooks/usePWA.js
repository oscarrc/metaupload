import { useEffect, useState } from 'react';

const usePWA = () => {
    const [deferredEvent, setdeferredEvent] = useState(null);  
    const [displayMode, setDisplayMode] = useState(null);
    const [installable, setinstallable] = useState(false);

    const getLaunchMode = () => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (document.referrer.startsWith('android-app://')) {
            setDisplayMode('twa');
        } else if (navigator.standalone || isStandalone) {
            setDisplayMode('standalone');
        }
        setDisplayMode('browser');
    }
    
    const catchInstallPrompt = (e) => {
        e.preventDefault();
        setinstallable(true);
        setdeferredEvent(e);
    }

    const promptInstall = () => {
        if(deferredEvent) deferredEvent.prompt();

        deferredEvent.userChoice.then(({outcome}) => {
            if(outcome === 'accepted') setinstallable(false)
        });
    }
    
    useEffect(() =>  {
        getLaunchMode();
        window.addEventListener('beforeinstallprompt', catchInstallPrompt)
    }, []);

    return  { promptInstall, displayMode, installable }
}

export { usePWA };