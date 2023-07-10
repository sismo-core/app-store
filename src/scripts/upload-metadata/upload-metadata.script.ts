import { isEnv } from "@/src/environments";
import { uploadMetadata } from "./upload-metadata";


uploadMetadata(["sismo"], isEnv("demo") ? "demo" : "main");
