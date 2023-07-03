import styled from "styled-components";
import { Info } from "phosphor-react";
import { useRef } from "react";
import { ClaimRequest, ClaimType } from "@sismo-core/sismo-connect-react";
import colors from "@/src/themes/colors";
import { textShorten } from "@/src/utils/textShorten";
import { GroupMetadata } from "@/src/libs/group-provider";

const OuterContainer = styled.div<{ fullWidth: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 4px;
  ${(props) =>
    props.fullWidth &&
    `
    flex-grow: 1;
  `}
`;

const Container = styled.div`
  position: relative;
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.color};
  padding: 2px 8px;
  background: ${(props) => props.theme.colors.neutral9};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  flex-grow: 1;
  cursor: "pointer";
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Right = styled.div``;

const Svg = styled.svg`
  flex-shrink: 0;
`;

const GroupName = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
  ${textShorten(1)};
`;

const ValueComparator = styled.div`
  padding: 0px 6px;
  height: 18px;
  background: ${(props) => props.theme.colors.neutral10};
  border-radius: 20px;
  font-size: 12px;
  line-height: 18px;
  flex-shrink: 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

type Props = {
  claimRequest: ClaimRequest;
  groupMetadata: GroupMetadata;
  fullWidth?: boolean;
  onModal?: (isOpen: boolean) => void
};

export default function ShardTag({
  claimRequest,
  groupMetadata,
  fullWidth,
  onModal
}: 
Props) {
  const ref = useRef(null);
  const color = colors.neutral1;

  const requestedValue = claimRequest?.value ?? 1;
  const claimType = claimRequest?.claimType ?? ClaimType.GTE;

  const humanReadableGroupName = groupMetadata?.name
    ?.replace(/-/g, " ")
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

  return (
    <>
      <OuterContainer fullWidth={fullWidth}>
        <Container color={color} ref={ref}>
          <Left>
            <Svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.00083 0.594749L13.334 5.53932L7.00083 13.2671L0.666871 5.53933L7.00083 0.594749Z"
                fill="#C08AFF"
                stroke="#C08AFF"
                strokeWidth="0.937557"
              />
            </Svg>
            <GroupName>{humanReadableGroupName}</GroupName>
          </Left>
          <Right>
            {claimType === ClaimType.GTE && requestedValue > 1 ? (
              <ValueComparator>
                {">="} {requestedValue}
              </ValueComparator>
            ) : claimType === ClaimType.GT ? (
              <ValueComparator>
                {">"} {requestedValue}
              </ValueComparator>
            ) : claimType === ClaimType.EQ ? (
              <ValueComparator>{requestedValue}</ValueComparator>
            ) : claimType === ClaimType.LT ? (
              <ValueComparator>
                {"<"} {requestedValue}
              </ValueComparator>
            ) : claimType === ClaimType.LTE ? (
              <ValueComparator>
                {"<="} {requestedValue}
              </ValueComparator>
            ) : null}
          </Right>
        </Container>
        <InfoWrapper
           onClick={(e) => {
              onModal(true);
              e.stopPropagation();
            }
          }
        >
          <Info size={18} color={color} />
        </InfoWrapper>
      </OuterContainer>
    </>
  );
}
