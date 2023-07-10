import { Command } from "commander";
import { isEnv } from "@/src/environments";
import { uploadMetadata } from "./upload-metadata";

const program = new Command();

program
  .description("Upload zk drop template metadata to ipfs")
  .argument("<env>", "string to split")
  .argument("<spaces...>", "string to split")
  .action((env, spaces) => {
    console.log("env", env);
    console.log("spaces", spaces);
    uploadMetadata(spaces, env);
  });

program.parse();
