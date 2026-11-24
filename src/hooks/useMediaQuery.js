import { useCallback, useSyncExternalStore } from "react"

// Devuelve true mientras la media query se cumpla (se actualiza al redimensionar)
export function useMediaQuery(consulta){
    const suscribir = useCallback((alCambiar) => {
        const mq = window.matchMedia(consulta)
        mq.addEventListener('change', alCambiar)
        return () => mq.removeEventListener('change', alCambiar)
    }, [consulta])

    return useSyncExternalStore(suscribir, () => window.matchMedia(consulta).matches)
}
