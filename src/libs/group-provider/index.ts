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

  public async getGroupMetadata({
    groupId,
    timestamp = "latest",
    revalidate,
  }: {
    groupId: string;
    timestamp?: "latest" | number;
    revalidate?: number;
  }): Promise<GroupMetadata> {
    const fetchOptions: RequestInit = {};

    if (revalidate) {
      fetchOptions.next = {
        revalidate,
      };

      const data = await fetch(
        `${this.hubApiUrl}/group-snapshots/${groupId}?timestamp=${timestamp}`,
        fetchOptions
      )
        .then((res) => res.json())
        .then((res) => res.items);
      if (data.length !== 1)
        throw new Error(
          `Invalid groupId ${groupId} ${
            timestamp !== "latest" && `or timestamp ${timestamp}`
          }. Please make sure they are correct using the Factory Sismo Data Groups Explorer.`
        );
      const groupsSnapshotMetadata = data[0];

      const groupsQueryUrlAppendix =
        timestamp === "latest" ? `?latest=true` : `?timestamp=${timestamp}`;
      const groups = await fetch(
        `${this.hubApiUrl}/groups/${groupsSnapshotMetadata.name}?${groupsQueryUrlAppendix}`,
        fetchOptions
      )
        .then((res) => res.json())
        .then((res) => res.items[0]);

      const groupsGenerator = await fetch(
        `${this.hubApiUrl}/group-generators/${groups.generatedBy}?latest=true`,
        fetchOptions
      )
        .then((res) => res.json())
        .then((res) => res.items[0])
        .catch((err) => {
          console.log(err);
        });

      return {
        id: groups.id,
        name: groups.name,
        description: groups.description,
        specs: groups.specs,
        accountsNumber: groupsSnapshotMetadata.properties.accountsNumber,
        groupGeneratorName: groups.generatedBy,
        lastGenerationTimestamp: groupsSnapshotMetadata.timestamp,
        generationFrequency: groupsGenerator?.generationFrequency ?? "once",
        dataUrl: groupsSnapshotMetadata.dataUrl,
      };
    }
  }
}
