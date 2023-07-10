import { Command } from "commander";
import { uploadMetadata } from "./upload-metadata";

const program = new Command();

program
  .description("Upload zk drop template metadata to ipfs")
  .argument("<spaces...>", "string to split")
  .action((spaces) => {
    console.log("spaces", spaces);
    let formattedSpaces = [];
    for (const space of spaces) {
      formattedSpaces.push(space.split(" "));
    }
    uploadMetadata(formattedSpaces);
  });

program.parse();
