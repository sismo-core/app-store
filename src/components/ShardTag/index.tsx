import styled from "styled-components";
import {  Info } from "phosphor-react";
import {  useRef, useState } from "react";
// import useOnClickOutside from "../../../../utils/useClickOutside";
import { BigNumber } from "ethers";
import { ClaimType } from "@sismo-core/sismo-connect-react";
import colors from "@/src/themes/colors";

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-grow: 1;
  margin-left: 4px;
`;

const Container = styled.div`
  position: relative;
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.color};
  padding: 2px 8px;
  background: ${(props) => props.theme.colors.blue9};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  flex-shrink: 0;
  flex-grow: 1;
  cursor:  "pointer";
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const GroupName = styled.div`
  max-width: ${"170px"};
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    max-width: 100px;
  }
`;

const ValueComparator = styled.div`
  padding: 0px 6px;
  height: 18px;
  background: ${(props) => props.theme.colors.blue10};
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
`;

type Props = {
//  groupMetadataClaimRequestEligibility: GroupMetadataClaimRequestEligibility;

  initialValue: number;

  onModal?: (id: string) => void;
};

export default function ShardTag({
 // groupMetadataClaimRequestEligibility,
  initialValue,

  onModal,
}: Props) {
  const [selectedValue, setSelectedValue] = useState(initialValue || null);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const ref = useRef(null);


  const color = colors.neutral1;

  // const requestedValue = groupMetadataClaimRequestEligibility?.claim?.value;
  // const claimType = groupMetadataClaimRequestEligibility?.claim?.claimType;
  // const groupMetadata = groupMetadataClaimRequestEligibility?.groupMetadata;

  // const humanReadableGroupName = groupMetadata?.name
  //   ?.replace(/-/g, " ")
  //   .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));


  return (
    <OuterContainer>
      <Container
        color={color}
        ref={ref}
      >
        <Left>
          <svg
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
          </svg>
          {/* <GroupName>
            {humanReadableGroupName}
          </GroupName> */}
{/* 
          {claimType === ClaimType.GTE ? (
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
          ) : null} */}
        </Left>
      </Container>
      {/* <InfoWrapper onClick={() => onModal(groupMetadata.id)}>
        <Info size={18} color={color} />
      </InfoWrapper> */}
    </OuterContainer>
  );
}
