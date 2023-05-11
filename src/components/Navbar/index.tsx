'use client'

//import Button3D from "@/src/ui/Button3D";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 92px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default function Navbar(): JSX.Element {
    return <Container>
        <Link href={"/"}>
            <Image 
                src={"/logo.svg"}
                width={35}
                height={58}
                alt="Spaces logo"
            />
        </Link>
        {/* <Button3D>
            Apply for your space
        </Button3D> */}
    </Container>;
}
