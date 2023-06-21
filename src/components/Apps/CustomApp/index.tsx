'use client'

import { CustomAppConfig, SpaceConfig } from "@/space-config/types";
import Modal from "@/src/ui/Modal";
import React from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    app: CustomAppConfig;
    space: SpaceConfig;
}

export default function CustomApp({ isOpen, onClose, app, space }: Props): JSX.Element {

    return <Modal isOpen={isOpen} onClose={onClose} animated>
        <iframe
            src="http://localhost:3004"
            title="Example Iframe"
            style={{ minWidth: 400, minHeight: 687 }}
            allowFullScreen
      ></iframe>
    </Modal>;
}