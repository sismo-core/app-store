import styled from "styled-components";
import { Info } from "phosphor-react";
import { useRef, useState } from "react";
// import useOnClickOutside from "../../../../utils/useClickOutside";
import { ClaimType } from "@sismo-core/sismo-connect-react";
import colors from "@/src/themes/colors";
import { ClaimRequestGroupMetadata } from "@/src/app/(space)/[slug]/page";
import { textShorten } from "@/src/utils/textShorten";
import EligibilityModal from "../EligibilityModal";

const OuterContainer = styled.div<{fullWidth: boolean}>`
  display: flex;
  align-items: center;
  gap: 4px;
  ${props => props.fullWidth && `
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
  justify-content: space-between;
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
  claimRequestGroupMetadata: ClaimRequestGroupMetadata;
  fullWidth?: boolean;
  // onModal?: (id: string) => void;
};

export default function ShardTag({
  // groupMetadataClaimRequestEligibility,
  claimRequestGroupMetadata,
  fullWidth
}: // onModal,
Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ref = useRef(null);
  const color = colors.neutral1;

  const requestedValue = claimRequestGroupMetadata?.value ?? 1;
  const claimType = claimRequestGroupMetadata?.claimType ?? ClaimType.GTE;
  const groupMetadata = claimRequestGroupMetadata?.groupMetadata;

  const humanReadableGroupName = groupMetadata?.name
    ?.replace(/-/g, " ")
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

  return (
    <>
      <EligibilityModal
        groupMetadata={groupMetadata}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></EligibilityModal>
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
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          <Info size={18} color={color} />
        </InfoWrapper>
      </OuterContainer>
    </>
  );
}
