import styled from "styled-components";
import Loader from "../Loader";
import { useEffect, useRef, useState } from "react";
import TextInput from "../TextInput";
import useEthAccount, { EthAccount, isEns, isEthAddress } from "@/src/hooks/useEthAccount";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 32px;
`;

const Status = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 4px;
  bottom: -20px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #4f5b7e;
  margin-top: 4px;
`;

type Props = {
  onEthAccount: (ethAccount: EthAccount) => void;
};

export default function TextInputEthAccount({ onEthAccount }: Props) {
  const [userInput, setUserInput] = useState("");
  const [value, setValue] = useState(null);
  const ethAccount = useEthAccount(value);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    onEthAccount(ethAccount);
  }, [ethAccount])

  function onUserInput(value: string) {
    clearTimeout(timeoutRef.current);
    setUserInput(value);

    timeoutRef.current = setTimeout(() => {
      setValue(value ? value.toLowerCase().trim() : "");
    }, 320);
  }

  return (
    <Container>
      <TextInput placeholder="0x00 or ENS" value={userInput} onChange={(value) => onUserInput(value)} style={{ width: "100%"}}/>
      {value && ethAccount?.isError && !ethAccount?.isLoading && (
        <Status>✘ Invalid ethereum address or ENS name</Status>
      )}
      {value && ethAccount?.isLoading && (
        <Status>
          <Loader size={12} />
          Resolving EVM account
        </Status>
      )}
      {value && !ethAccount?.isLoading && !ethAccount?.isError && (
        <Status>
          {isEthAddress(value) && ethAccount?.ens
            ? `✓ ${ethAccount?.ens}`
            : isEns(value) && ethAccount?.address
            ? `✓ ${ethAccount?.address}`
            : ``}
        </Status>
      )}
    </Container>
  );
}