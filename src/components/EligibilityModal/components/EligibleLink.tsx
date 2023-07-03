import styled from "styled-components";
import { ArrowSquareOut } from "phosphor-react";
import colors from "@/src/themes/colors";
import formatNumberWithSpace from "@/src/utils/formatNumberWithSpace";
import env from "@/src/environments";

const UserIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="8.00741"
      cy="7.4039"
      r="2.03378"
      stroke="#E9ECFF"
      strokeWidth="0.75"
    />
    <path
      d="M4.82959 12.5812C4.82959 12.5812 4.91153 9.43617 8.0581 9.4375C11.2047 9.43883 11.1849 12.5815 11.1849 12.5815"
      stroke="#E9ECFF"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <path
      d="M9.52099 4.42695C10.4144 3.46666 12.2971 3.48456 12.9725 5.00675C13.6478 6.52893 12.1633 7.96689 11.1848 7.96695"
      stroke="#E9ECFF"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <path
      d="M11.1846 7.97314C14.5735 7.97448 14.5523 11.1172 14.5523 11.1172"
      stroke="#E9ECFF"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <path
      d="M6.47901 4.42695C5.58563 3.46666 3.70287 3.48456 3.02755 5.00675C2.35222 6.52893 3.83665 7.96689 4.81517 7.96695"
      stroke="#E9ECFF"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    <path
      d="M4.81543 7.97314C1.42647 7.97448 1.44775 11.1172 1.44775 11.1172"
      stroke="#E9ECFF"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
  </svg>
);

const Container = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${colors.blue0};
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DetailLine = styled.a`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: "Inter-Medium";
  gap: 5px;
  text-decoration: none;

  color: ${colors.blue0};
  line-height: 20px;
  display: flex;

  @media (max-width: 900px) {
    font-size: 12px;
    line-height: 18px;
  }
`;

const IconUserContainer = styled.div`
  width: 16px;
  height: 16px;

  @media (max-width: 900px) {
    width: 14px;
    height: 14px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 12px;
  height: 12px;
  align-self: flex-start;

  @media (max-width: 900px) {
    width: 10px;
    height: 10px;
  }
`;

type EligibilityProps = {
  accountsNumber: number;
  dataUrl: string;
};

export default function EligibleLink({
  accountsNumber,
  dataUrl,
}: EligibilityProps): JSX.Element {
  return (
    <Container>
      {accountsNumber ? (
        <DetailLine
          href={dataUrl}
          target="_bla
        <nk"
        >
          <IconUserContainer>{UserIcon}</IconUserContainer>
          {accountsNumber === 0
            ? 0
            : formatNumberWithSpace(accountsNumber)}{" "}
          eligible accounts
          <IconContainer>
            <ArrowSquareOut size={"100%"} weight="bold" />
          </IconContainer>
        </DetailLine>
      ) : (
        <DetailLine>
          <IconUserContainer>{UserIcon}</IconUserContainer>0 eligible account
        </DetailLine>
      )}
    </Container>
  );
}
