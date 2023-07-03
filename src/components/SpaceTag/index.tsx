import styled from "styled-components";
import Image from "next/image";
import { textShorten } from "@/src/utils/textShorten";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppFront } from "@/src/utils/getSpaceConfigsFront";

const SpaceLine = styled.div`
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  cursor: pointer;
`;

const SpaceName = styled.div<{ $isHovered: boolean }>`
  color: ${({ theme }) => theme.colors.neutral5};
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: 18px;
  ${textShorten(1)}
  text-decoration: ${(props) => (props.$isHovered ? "underline" : "none")};
`;

const SpaceImageContainer = styled.div<{ $isDisabled: boolean }>`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
`;

const StyledSpaceImage = styled(Image)`
  object-fit: cover;
`;

type Props = {
  app: AppFront;
  isDisabled?: boolean;
};

export default function SpaceTag({
  app, 
  isDisabled,
}: Props): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <SpaceLine
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(event) => {
        event.stopPropagation();
        router.push(`/${app.spaceSlug}`)}}
    >
      <SpaceImageContainer $isDisabled={isDisabled}>
        <StyledSpaceImage
          src={app.configImage}
          alt={app.space}
          fill={true}
          placeholder="blur"
          sizes="10vw"
        />
      </SpaceImageContainer>
      <SpaceName $isHovered={isHovered}>{app.space}</SpaceName>
    </SpaceLine>
  );
}
