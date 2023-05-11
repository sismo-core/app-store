import styled from "styled-components";
import { ArrowUUpLeft, ArrowUUpRight } from "phosphor-react";
import { DateTime } from "luxon";
import colors from "@/src/themes/colors";

const Container = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${colors.blue0};
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 900px) {
    gap: 5px;
  }
`;

const Title = styled.div`
  font-family: "Inter-SemiBold";
  font-size: 14px;
  line-height: 20px;
`;

const GenerationGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 900px) {
    gap: 3px;
  }
`;

const GenerationLine = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const GenerationDescription = styled.div`
  font-family: "Inter-Regular";
  font-size: 14px;
  line-height: 20px;

  @media (max-width: 900px) {
    font-size: 12px;
    line-height: 18px;
  }
`;

const IconContainer = styled.div`
  width: 16px;
  height: 16px;

  @media (max-width: 900px) {
    width: 14px;
    height: 14px;
  }
`;

type EligibilityProps = {
  lastGeneration: number;
  generationFrequency: any;
};

export default function Generation({
  lastGeneration,
  generationFrequency,
}: EligibilityProps): JSX.Element {
  const formatNextGeneration = (
    generationFrequency: string,
    rawDate: number
  ) => {
    if (!generationFrequency) return;
    if (!rawDate) return;

    const lastDate = DateTime.fromSeconds(rawDate);

    switch (generationFrequency) {
      case "daily":
        return lastDate.plus({ days: 1 }).toJSDate().toUTCString();
      case "weekly":
        return lastDate.plus({ weeks: 1 }).toJSDate().toUTCString();
      case "monthly":
        return lastDate.plus({ months: 1 }).toJSDate().toUTCString();
      case "once":
        return "No more generations";
      default:
        return "No more generations";
    }
  };

  return (
    <Container>
      <Title>Group of eligible accounts generation</Title>
      <GenerationGroup>
        <GenerationLine>
          <IconContainer>
            <ArrowUUpLeft size={"100%"} />
          </IconContainer>
          <GenerationDescription>
            Last:{" "}
            {lastGeneration &&
              DateTime.fromSeconds(lastGeneration).toJSDate().toUTCString()}
          </GenerationDescription>
        </GenerationLine>
        <GenerationLine>
          <IconContainer>
            <ArrowUUpRight size={"100%"} />
          </IconContainer>
          <GenerationDescription>
            Next: {formatNextGeneration(generationFrequency, lastGeneration)}
          </GenerationDescription>
        </GenerationLine>
      </GenerationGroup>
    </Container>
  );
}
