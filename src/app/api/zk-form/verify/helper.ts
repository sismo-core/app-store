import { Claim, ClaimRequest } from "@sismo-core/sismo-connect-server";

export const isClaimEquals = (claim: Claim, claimRequest: ClaimRequest): boolean => {
  return (
    claim.groupId === claimRequest.groupId &&
    claim.claimType === claimRequest.claimType &&
    claim.groupTimestamp === claimRequest.groupTimestamp &&
    claim.isSelectableByUser === claimRequest.isSelectableByUser &&
    (claim.isSelectableByUser === false ? claim.value === claimRequest.value : true)
  );
};
