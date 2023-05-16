'use client'

import { SpaceConfig } from "@/space-config/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled(Link)`
    display: flex;
    flex-direction: column;
    height: 250px;
    cursor: pointer;
    border: 1px solid #525C8F;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: ${(props) => props.theme.colors.neutral10};
        border: 1px solid ${(props) => props.theme.colors.neutral4};
    }
`;

const ProfileImage = styled(Image)`
  width: 98px;
  height: 98px;
  border-radius: 50%;
  object-fit: cover;
  overflow: hidden;
`;

const Name = styled.div`
  font-size: 24px;
  font-family: ${props => props.theme.fonts.semibold};
  color: ${props => props.theme.colors.neutral1};
  display: inline-block;
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NumberOfApps = styled.div`
    margin-top: 16px;

    font-family: ${props => props.theme.fonts.medium};
    font-size: 16px;
    color: ${props => props.theme.colors.neutral5};
`

type Props = {
    config: SpaceConfig;
    image: string;
}

export default function SpaceCard({ config, image }: Props): JSX.Element {

    return <Container href={`/${config.slug}`}>
        <ProfileImage src={image} alt={"Space profile image"} placeholder="blur" style={{marginBottom: 8}}/>
        <Name>
            {config.name}
        </Name>
        <NumberOfApps>
            {config.apps.length} app{config.apps.length > 1 && "s"}
        </NumberOfApps>
    </Container>;
}
