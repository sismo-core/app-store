import { AppConfig, Field, SpaceConfig } from "@/space-config/types";
import { MockedRequest } from "@/src/libs/helper";
import { AuthType, SismoConnectResponse } from "@sismo-core/sismo-connect-server";

export const mockZkFormTestSpaceType = (
  appSlug: string = "zkFormAppSlug",
  spaceSlug: string = "zkFormSpaceSlug"
): SpaceConfig => {
  return {
    metadata: {
      slug: spaceSlug,
      description: "description",
      name: "name",
      profileImage: "",
      coverImage: "",
    },
    apps: [mockZkFormTestApp(appSlug)],
  };
};

export const mockZkFormTestApp = (appSlug: string = "zkFormAppSlug"): AppConfig => {
  return {
    type: "zkForm",
    metadata: {
      name: appSlug,
      description: "Test Description",
      tags: ["Artwork"],
      image: "",
      ctaText: "claim",
      slug: "test-claim",
      createdAt: new Date("2022-07-01T00:00:00.000Z"),
    },
    sismoConnectRequest: {
      appId: "0x1941996d7a0245ccc2b203847d682298",
      authRequests: [{ authType: AuthType.VAULT }],
      claimRequests: [{ groupId: "0xa199ee8b75688035fb40f8660adbcdac" }],
    },
    templateConfig: {
      fields: [
        {
          type: "short-text",
          label: "Email",
          isRequired: true,
        },
        {
          type: "short-text",
          label: "Street address",
          isRequired: false,
        },
        {
          type: "short-text",
          label: "Apartment, unit, suite, etc",
          placeholder: "Optional",
          isRequired: true,
        },
      ],
      congratulationsMessage: {
        title: "Congratulations!",
        description: "Congrats tests",
      },
      output: {
        destination: {
          type: "google_sheet",
          spreadsheetId: "TEST_ID",
        },
      },
    },
  };
};

export type MockZkFormRequest = {
  spaceSlug: string;
  appSlug: string;
  fields: Field[];
  response: SismoConnectResponse;
};

export const mockZkFormTestAppRequest = (request?: Partial<MockZkFormRequest>): any => {
  return MockedRequest({
    spaceSlug: "zkFormSpaceSlug",
    appSlug: "zkFormAppSlug",
    fields: [
      {
        name: "Email",
        value: "test@sismo.io",
      },
      {
        name: "Street address",
        value: "test address",
      },
      {
        name: "Apartment, unit, suite, etc",
        value: "test apartment",
      },
    ],
    response: mockResponse,
    ...request,
  });
};

const mockResponse = {
  appId: "0xd21d9ab6eaf8bcc16eff8d9a76764eab",
  namespace: "main",
  version: "sismo-connect-v1.1",
  proofs: [
    {
      auths: [
        {
          authType: 4,
          userId: "0x1003000000000000000000000000006232426394",
          extraData: "",
          isSelectableByUser: true,
        },
      ],
      proofData:
        "0x1013cffe8548f831e753c2713edf351ef8450629f23515f485322306d68dbcd229bf87f4b208d1861339439117fca3046feb7e9ff7cdd2b1990399979846f95b1461b5f41138a006dfd33a46d1ee36cc99b716a1fb3e24ef2bd2be951e29e2f5015b76630f49eaf19ae229cc91130e95e654c9ae975d0c7a787c0d8d07d998af2ca98610c3bf3b248701eb22088c8651c5c9dbc7a90a3b332c09b427c7564146079f197fbde99cf215855e9099fb17d7f0f29b84fcc01d53f8c11dd40e48d5790e36e83b63e339b522e8085357d4fa5455150a0730c082b52e01337b36900aff25bdffebaebaae9787726cd21ab5e788d1f2249b66cdd0b700f7aa9981ba9e940000000000000000000000001003000000000000000000000000006232426394000000000000000000000000000000000000000000000000000000000000000007f6c5612eb579788478789deccb06cf0eb168e457eea490af754922939ebdb920706798455f90ed993f8dac8075fc1538738a25f0c928da905c0dffd81869fa00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000029f6a8ec2fbcafee0ef1776935c662aa1c223e94983db106046e128d260d21d828c5df3e7720b1d2f6693ebdbba8b0b3866e0a65276bdf16e64a372ce716915100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
      extraData: "",
      provingScheme: "hydra-s3.1",
    },
  ],
};
