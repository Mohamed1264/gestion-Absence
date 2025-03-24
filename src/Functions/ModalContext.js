import { useContext,useState,createContext } from "react";
const ModalContext = createContext();
export function ModalProvider ({children}){
    const [selectedItem,setSelectedItem] = useState(null)
    const [activeModal,setActiveModal] = useState(null)
    return <ModalContext.Provider value={{selectedItem,setSelectedItem,activeModal,setActiveModal}}>
        {children}
    </ModalContext.Provider>

}

export function useModalContext (){
    return useContext(ModalContext);
}