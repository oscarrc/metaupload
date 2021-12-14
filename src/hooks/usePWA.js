import { createContext, useEffect, useState, useContext } from 'react';

const InstallPrompt = createContext();

const PWAProvider = ({children}) => {
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

        deferredEvent.userChoice.then((choiceResult) => {
            console.log(choiceResult);
        });
    }
    
    useEffect(() =>  {
        getLaunchMode();
        window.addEventListener('beforeinstallprompt', catchInstallPrompt)
    }, []);

    return (
        <InstallPrompt.Provider value={{ promptInstall, displayMode, installable }}>
            {children}
        </InstallPrompt.Provider>
    )
}

const usePWA = () => {
    const context = useContext(InstallPrompt);
    if(context === undefined) throw new Error("usePWA must be used within a PWAProvider")
    return context;
}

export { PWAProvider, usePWA };