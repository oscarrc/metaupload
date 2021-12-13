import { useEffect, useState } from 'react'

const usePWA = () => {
    const [installation, setInstallation] = useState(null);  
    const [mode, setMode] = useState(null);

    const getLaunchMode = () => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (document.referrer.startsWith('android-app://')) {
            setMode('twa');
        } else if (navigator.standalone || isStandalone) {
            setMode('standalone');
        }
        setMode('browser');
    }
    
    const catchInstallPrompt = (e) => {
        e.preventDefault();
        setInstallation(e);
    }
    
    useEffect(() =>  {
        getLaunchMode();
        if(mode === 'browser') window.addEventListener('beforeinstallprompt', catchInstallPrompt)
    }, [mode]);

    return { installation, mode }
}

export { usePWA };