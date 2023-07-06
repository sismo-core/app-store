/**
 * @jest-environment node
 */
import { POST, Field } from "./route";
import ServiceFactory from "@/src/services/service-factory/service-factory";
import {
  mockResponseUser1,
  mockResponseUser2,
  mockZkFormTestAppRequest,
  mockZkFormTestAppRequest2,
} from "@/src/app/api/zk-form/mocks";
import { MemoryTableStore } from "@/src/services/table-store";

describe("POST /api/zk-form/verify", () => {
  let memoryTableStore: MemoryTableStore;

  beforeEach(() => {
    ServiceFactory.reset();
    memoryTableStore = ServiceFactory.getZkFormTableStore() as MemoryTableStore;
  });

  afterAll(() => {
    globalThis.curve_bn128.terminate();
  });

  it("Should return error when app is not found", async () => {
    const response = await POST(
      mockZkFormTestAppRequest({
        appSlug: "non-existent-app",
      })
    );
    const data = await response.json();
    expect(data.status).toEqual("error");
    expect(data.message).toMatch(/App non-existent-app not found or not a zkForm app/);
  });

  it("Should create the table columns and save user information into the tableStore", async () => {
    const response = await POST(mockZkFormTestAppRequest());
    const data = await response.json();
    expect(data.status).toEqual("subscribed");
    // first row is the header
    expect(memoryTableStore.getTable("testSpreadsheetId1")).toEqual([
      ["VaultId", "Email", "Street address", "Apartment, unit, suite, etc"],
      [
        "0x170e88bf3a73ac848e13b42e09e8fcec33579e3b1fc74231a43379ad88daf34e",
        "test@sismo.io",
        "test address",
        "test apartment",
      ],
    ]);
  });

  it("Should be marked as already subscribe when doing the flow twice", async () => {
    const responseFirstCall = await POST(mockZkFormTestAppRequest());
    expect((await responseFirstCall.json()).status).toEqual("subscribed");

    const responseSecondCall = await POST(mockZkFormTestAppRequest());
    expect((await responseSecondCall.json()).status).toEqual("already-subscribed");
  });

  it("Should create the table columns and save two different users information into the tableStore", async () => {
    const responseUser1 = await POST(mockZkFormTestAppRequest());
    expect((await responseUser1.json()).status).toEqual("subscribed");

    const responseUser2 = await POST(
      mockZkFormTestAppRequest({
        fields: [
          {
            name: "Email",
            value: "test2@sismo.io",
          },
          {
            name: "Street address",
            value: "second address",
          },
          {
            name: "Apartment, unit, suite, etc",
            value: "other appartement",
          },
        ],
        response: mockResponseUser2,
      })
    );
    expect((await responseUser2.json()).status).toEqual("subscribed");
    expect(memoryTableStore.getTable("testSpreadsheetId1")).toEqual([
      // first row is the header
      ["VaultId", "Email", "Street address", "Apartment, unit, suite, etc"],
      [
        "0x170e88bf3a73ac848e13b42e09e8fcec33579e3b1fc74231a43379ad88daf34e",
        "test@sismo.io",
        "test address",
        "test apartment",
      ],
      [
        "0x0d1a01a9ebc87f219dcc27b16bcacdad103e5dbb1846d0a5c2acc96c881cac8e",
        "test2@sismo.io",
        "second address",
        "other appartement",
      ],
    ]);
  });

  it("Should try with an other more complex app", async () => {
    const response = await POST(mockZkFormTestAppRequest2());
    const data = await response.json();
    expect(data.status).toEqual("subscribed");
    expect(memoryTableStore.getTable("testSpreadsheetId2")).toEqual([
      // first row is the header
      [
        "VaultId",
        "TwitterId",
        "GithubId",
        "0xc9f8691713d04b33d498dd0ac67280ef",
        "0x1cde61966decb8600dfd0749bd371f12",
        "0xd630aa769278cacde879c5c0fe5d203c",
        "0xd630aa769278cacde879c5c0fe5d203c",
        "0xd630aa769278cacde879c5c0fe5d203c",
        "First Name",
        "Last Name",
        "Company (optional)",
        "Email",
        "Will you be in Paris on July 17, 7pm? Tickets are limited.",
      ],
      [
        "0x2f4c021c8cbcb18c38eb9b501889ac2f0d85b7427eadef6094726191ed1004d5",
        "1448915213877661696",
        "", // didn't provide github id
        1, // share 1
        24, // shared 24 score on gitcoin passport than 15
        1, // should be 1
        "", // didn't provide the optional claim requests
        3, // should be 3
        "test first name",
        "test last name",
        "", // optional one
        "teset@sismo.io",
        "yes",
      ],
    ]);
  });

  it("Should return error when proof is not valid", async () => {
    const response = await POST(
      mockZkFormTestAppRequest({
        response: {
          ...mockResponseUser1,
          proofs: [],
        },
      })
    );
    const data = await response.json();
    expect(data.status).toEqual("error");
    expect(data.message).toMatch(
      /Invalid ZK Proof A required proof is missing for the claimRequest with groupId 0x433ae0c1cb3793f0971f3bf2bbcff10e, groupTimestamp latest and claimType 0/
    );
  });
});
