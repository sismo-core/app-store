'use client'

import React, { useContext, useState } from "react";

type Modals = {
    setRequirementsIsOpen: (isOpen: boolean) => void;
    requirementsIsOpen: boolean;
    setZkSubAppIsOpen: (isOpen: boolean) => void;
    zkSubAppIsOpen: boolean;
};

export const useModals = (): Modals => {
  return useContext(ModalsContext);
};

export const ModalsContext = React.createContext(null);

export default function ModalsProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [requirementsIsOpen, setRequirementsIsOpen] = useState<boolean>(false);
  const [zkSubAppIsOpen, setZkSubAppIsOpen] = useState<string>(null);

  return (
    <ModalsContext.Provider
      value={{
        setRequirementsIsOpen,
        requirementsIsOpen,
        setZkSubAppIsOpen,
        zkSubAppIsOpen
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
