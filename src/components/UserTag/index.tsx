import styled from "styled-components";
import { AuthType } from "@sismo-core/sismo-connect-react";
import colors from "@/src/themes/colors";
import { TwitterRounded } from "../SismoReactIcon/components/TwitterRounded";
import { GithubRounded } from "../SismoReactIcon";
import { EthRounded } from "../SismoReactIcon/components/EthRounded";
import { textShorten } from "@/src/utils/textShorten";
import { TelegramRounded } from "../SismoReactIcon/components/TelegramRounded";

const Container = styled.div<{fullWidth: boolean}>`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  line-height: 20px;
  padding: 2px 8px;
  background: ${(props) => props.theme.colors.neutral9};
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  ${(props) =>
    props.fullWidth &&
    `
    flex-grow: 1;
  `}
`;

const Text = styled.div`
  ${textShorten(1)};
`;

type Props = {
  authType: AuthType;
  fullWidth?: boolean;
};

export default function UserTag({ authType, fullWidth }: Props) {
  return (
    <Container fullWidth={fullWidth}>
      {authType === AuthType.TWITTER ? (
        <TwitterRounded size={14} color={colors.neutral1} />
      ) : authType === AuthType.GITHUB ? (
        <GithubRounded size={14} color={colors.neutral1} />
      ) : authType === AuthType.TELEGRAM ? (
        <TelegramRounded size={14} color={colors.neutral1} />
      ) : (
        <EthRounded size={14} color={colors.neutral1} />
      )}
      <Text>
        {authType === AuthType.TWITTER
          ? "Twitter account"
          : authType === AuthType.GITHUB
          ? "Github account"
          : authType === AuthType.TELEGRAM
          ? "Telegram account"
          : "Vault id"}
      </Text>
    </Container>
  );
}
