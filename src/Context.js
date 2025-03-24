import { useContext, useState, createContext } from "react";

const TableContext = createContext({}); // ✅ Default value to avoid errors

export function TableProvider({ children }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeModal, setActiveModal] = useState(null);

    return (
        <TableContext.Provider value={{ selectedItem, setSelectedItem, activeModal, setActiveModal }}>
            {children}
        </TableContext.Provider>
    );
}

export function useTableContext() {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error("useTableContext must be used within a TableProvider");
    }
    return context;
}
