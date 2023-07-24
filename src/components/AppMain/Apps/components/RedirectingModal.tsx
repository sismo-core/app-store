import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 340px;
  width: 600px;

  @media (max-width: 900px) {
    width: calc(100vw - 105px);
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-family: ${(props) => props.theme.fonts.semibold};
  line-height: 38px;
  text-align: center;
  margin-bottom: 16px;
`;

const Subtitle = styled.div`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.regular};
  line-height: 22px;
  color: ${(props) => props.theme.colors.neutral4};
  margin-bottom: 40px;
  text-align: center;
`;

const SvgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

const  scale = keyframes`
    0% {
      transform: scale(1);
    }
    10%{
      transform: scale(1);
    }
    25% {
      transform: scale(1.3);
    }
    40% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
`;

const Svg1 = styled.svg`
  animation: ${scale} 1.2s ease-in-out infinite ;

`;
const Svg2 = styled.svg`
  animation: ${scale} 1.2s ease-in-out infinite;
  animation-delay: .4s;
`;
const Svg3 = styled.svg`
  animation: ${scale} 1.2s ease-in-out infinite;
  animation-delay: .8s;
`;

export default function RedirectingModal() {
  return (
    <Container>
      <Title>
        Redirecting to
        <br />
        Sismo Connect
      </Title>
      <Subtitle>You will return after completing verification.</Subtitle>
      <SvgWrapper>
        <Svg1
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7039 6.37381C11.8515 4.3532 10.4628 2.3443 8.58656 1.96832C6.67726 1.58572 4.88695 1.76888 3.34183 3.01528C2.77593 3.47178 2.42765 4.21302 2.13204 4.86297C1.71 5.79094 1.47484 7.00581 1.58736 8.02207C1.76858 9.65893 3.34503 10.9547 4.88466 11.2843C7.85768 11.9208 11.5287 9.58692 11.7826 6.47019C11.8613 5.50454 11.6003 4.43518 11.2101 3.55512C10.7643 2.5497 9.78505 1.96652 8.73381 1.74276C7.69103 1.5208 6.48313 1.69379 5.4569 1.94636C4.54526 2.17072 3.87308 2.54627 3.18683 3.18236C1.52009 4.72728 1.07012 7.06404 2.34977 9.02809C3.04445 10.0943 4.42347 10.7921 5.643 11.0428C6.89558 11.3003 8.49147 11.0448 9.57061 10.3467C10.6507 9.64799 11.4157 8.82078 11.6068 7.51703C11.6918 6.93701 11.7061 6.34519 11.7257 5.75963C11.7417 5.28125 11.8119 4.70439 11.4676 4.41991"
            stroke="#64D7C0"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </Svg1>
        <Svg2
          width="13"
          height="15"
          viewBox="0 0 13 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.46699 11.8662C6.18095 12.844 8.52942 12.4668 9.64744 10.9756C10.7851 9.45811 11.3757 7.80775 10.9288 5.92659C10.7651 5.23761 10.2598 4.62037 9.81269 4.08774C9.17426 3.32729 8.20524 2.61067 7.26483 2.28298C5.75016 1.75518 3.94958 2.59678 3.01363 3.81159C1.20632 6.15737 1.71659 10.3634 4.34926 11.8949C5.16494 12.3693 6.21433 12.5888 7.15159 12.6153C8.22237 12.6455 9.14595 12.0297 9.78387 11.1997C10.4167 10.3763 10.7716 9.24213 10.9804 8.23418C11.1659 7.33877 11.118 6.59036 10.847 5.72022C10.1888 3.60686 8.32395 2.23053 6.06064 2.53077C4.83195 2.69376 3.63987 3.61288 2.9076 4.57947C2.15549 5.57224 1.71015 7.08209 1.87074 8.32358C2.03147 9.56611 2.43736 10.5857 3.503 11.3009C3.9771 11.6191 4.49122 11.8801 4.99763 12.1431C5.41135 12.358 5.88889 12.6618 6.28346 12.4786"
            stroke="#C08AFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </Svg2>
        <Svg3
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.80075 11.5883C7.40785 12.4127 8.55893 11.9189 9.88252 10.8165C11.5205 9.45239 12.2649 7.74694 11.9154 5.67631C11.3323 2.22191 6.75154 1.00382 4.15203 3.33774C1.66066 5.57457 2.24751 9.40288 4.7603 11.3105C6.49091 12.6243 9.83364 11.8166 10.8429 9.92124C11.8216 8.08342 12.1192 5.85332 11.1311 3.94747C9.93636 1.64327 7.92134 1.60077 5.72872 2.69714C3.58798 3.76757 1.46976 6.06741 2.11915 8.60917C2.60194 10.4989 5.15893 11.5778 6.95325 11.8662"
            stroke="#EE526E"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </Svg3>
      </SvgWrapper>
    </Container>
  );
}
