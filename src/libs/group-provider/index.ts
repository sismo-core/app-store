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

export type GroupSnapshotMetadata = {
  id: string;
  name: string;
  timestamp: number;
  accountsNumber: number;
  dataUrl: string;
};

export class GroupProvider {
  private hubApiUrl: string;

  constructor({ hubApiUrl }) {
    this.hubApiUrl = hubApiUrl;
  }

  public async getGroupSnapshotMetadata({
    groupId,
    timestamp = "latest",
    revalidate,
  }: {
    groupId: string;
    timestamp?: "latest" | number;
    revalidate?: number;
  }): Promise<GroupSnapshotMetadata> {
    const fetchOptions: RequestInit = {};

    if (revalidate) {
      fetchOptions.next = {
        revalidate,
      };
    } else {
      fetchOptions.cache = "force-cache";
    }

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

    return {
      id: data[0].groupId,
      name: data[0].name,
      accountsNumber: data[0].properties.accountsNumber,
      timestamp: data[0].timestamp,
      dataUrl: data[0].dataUrl,
    };
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
    } else {
      fetchOptions.cache = "force-cache";
    }

    const groupsSnapshotMetadata = await this.getGroupSnapshotMetadata({
      groupId,
      timestamp,
      revalidate,
    });

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

    const groupMetadata = {
      id: groups.id,
      name: groups.name,
      description: groups.description,
      specs: groups.specs,
      accountsNumber: groupsSnapshotMetadata.accountsNumber,
      groupGeneratorName: groups.generatedBy,
      lastGenerationTimestamp: groupsSnapshotMetadata.timestamp,
      generationFrequency: groupsGenerator?.generationFrequency ?? "once",
      dataUrl: groupsSnapshotMetadata.dataUrl,
    };

    return groupMetadata;
  }
}
