'use client'

import { styled } from "styled-components";

export const PageContent = styled.div`
    // Take the full height minus Navbar + Footer
    min-height: calc(100vh - 92px - 183px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
`;