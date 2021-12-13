import { useEffect } from 'react'

let installPrompt = null

const usePWAinstall = () => {
    const catchInstallPrompt = (e) => {
        e.preventDefault();
        installPrompt = e;
    }

    const getLaunchMode = () => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (document.referrer.startsWith('android-app://')) {
            return 'twa';
        } else if (navigator.standalone || isStandalone) {
            return 'standalone';
        }
        return 'browser';
    }

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', catchInstallPrompt);
        return window.removeEventListener('beforeinstallprompt', catchInstallPrompt);
    }, []);

    return { installPrompt, getLaunchMode }
}

export { usePWAinstall };