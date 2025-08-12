import { createContext, useState, useEffect } from 'react'

export const Contexto = createContext()

export const Proveedor = ({ children }) => {
    
    // AUTOS
    /*
    const [autos, setAutos] = useState(null)

    //GET
    useEffect(() => {
        fetch('http://localhost:8080/autos/disponible')
        .then(response => response.json())
        .then(data => setAutos(data))
    },[])

    }*/

    const [historial, setHistorial] = useState(null)

    return (
        <Contexto.Provider value={{
            //Pasar estados
            historial,
            setHistorial
        }}>
            { children }
        </Contexto.Provider>
    )
}
