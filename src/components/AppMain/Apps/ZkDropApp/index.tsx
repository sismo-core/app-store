'use client'

import { ZkDropAppType } from "@/src/services/spaces-service";
import Modal from "@/src/ui/Modal";
import React from "react";
import { styled } from "styled-components";

const Content = styled.div`
    width: 100px;
    height: 50px;
`

type Props = {
    isOpen: boolean;
    onClose: () => void;
    app: ZkDropAppType;
}

export default function ZkDropApp({ isOpen, onClose, app }: Props): JSX.Element {

    return <Modal isOpen={isOpen} onClose={onClose} animated>
        <Content>
            {app?.name}
        </Content>
    </Modal>;
}
