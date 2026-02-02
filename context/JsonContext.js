"use client";

import React, { createContext, useState } from "react";

const JsonContext = createContext();

const JsonContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState(null);

  return (
    <JsonContext.Provider
      value={{
        contacts, setContacts
      }}
    >
      {children}
    </JsonContext.Provider>
  );
};

export { JsonContext, JsonContextProvider };