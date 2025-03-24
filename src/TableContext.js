import React, { createContext, useState } from 'react';

export const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <TableContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </TableContext.Provider>
  );
};