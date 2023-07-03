'use client'

import React, { useContext, useState } from "react";

type Modals = {
    setRequirementsIsOpen: (isOpen: boolean) => void;
    requirementsIsOpen: boolean;
    setZkFormAppIsOpen: (isOpen: boolean) => void;
    zkFormAppIsOpen: boolean;
    setZkBotAppIsOpen: (isOpen: boolean) => void;
    zkBotAppIsOpen: boolean;
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
  const [zkFormAppIsOpen, setZkFormAppIsOpen] = useState<string>(null);
  const [zkBotAppIsOpen, setZkBotAppIsOpen] = useState<string>(null);

  return (
    <ModalsContext.Provider
      value={{
        setRequirementsIsOpen,
        requirementsIsOpen,
        setZkFormAppIsOpen,
        zkFormAppIsOpen,
        setZkBotAppIsOpen,
        zkBotAppIsOpen
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
