import axios from "axios";

export type GroupMetadata = {
  id: string;
  name: string;
  description: string;
  specs: string;
  accountsNumber: number;
  groupGeneratorName: string;
  lastGenerationTimestamp: number;
  generationFrequency: string;
  dataUrl: string;
};

export class GroupProvider {
  private hubApiUrl: string;

  constructor({ hubApiUrl }) {
    this.hubApiUrl = hubApiUrl;
  }

  public async getGroupMetadata(
    groupId: string,
    timestamp: "latest" | number
  ): Promise<GroupMetadata> {
    const data = await axios
      .get(
        `${this.hubApiUrl}/group-snapshots/${groupId}?timestamp=${timestamp}`
      )
      .then((res) => res.data.items);
    if (data.length !== 1)
      throw new Error(
        `Invalid groupId ${groupId} ${
          timestamp !== "latest" && `or timestamp ${timestamp}`
        }. Please make sure they are correct using the Factory Sismo Data Groups Explorer.`
      );
    const groupsSnapshotMetadata = data[0];

    const groupsQueryUrlAppendix =
      timestamp === "latest" ? `?latest=true` : `?timestamp=${timestamp}`;
    const groups = await axios
      .get(
        `${this.hubApiUrl}/groups/${groupsSnapshotMetadata.name}?${groupsQueryUrlAppendix}`
      )
      .then((res) => res.data.items[0]);
    const groupsGenerator = await axios
      .get(
        `${this.hubApiUrl}/group-generators/${groups.generatedBy}?latest=true`
      )
      .then((res) => res.data.items[0]);

    return {
      id: groups.id,
      name: groups.name,
      description: groups.description,
      specs: groups.specs,
      accountsNumber: groupsSnapshotMetadata.properties.accountsNumber,
      groupGeneratorName: groups.generatedBy,
      lastGenerationTimestamp: groupsSnapshotMetadata.timestamp,
      generationFrequency: groupsGenerator.generationFrequency,
      dataUrl: groupsSnapshotMetadata.dataUrl,
    };
  }
}
