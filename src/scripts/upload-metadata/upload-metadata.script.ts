import { Command } from "commander";
import { uploadMetadata } from "./upload-metadata";

const program = new Command();

program
  .description("Upload zk drop template metadata to ipfs")
  .argument("<spaces...>", "string to split")
  .action(async (spaces) => {
    let formattedSpaces = [];
    for (const space of spaces) {
      formattedSpaces.push(...space.split(" "));
    }
    const res = await uploadMetadata(formattedSpaces);
    console.log(res);
  });

program.parse();
