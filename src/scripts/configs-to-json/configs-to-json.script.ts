import { SpaceConfig } from "@/space-configs/types";
import fs from "fs";

for (const env of ["main", "demo"]) {
  let configs: SpaceConfig[] = [];
  fs.readdirSync(`${__dirname}/../../../space-configs/${env}`).forEach((filename) => {
    const config = require(`${__dirname}/../../../space-configs/${env}/${filename}`).default;
    config.metadata.slug = filename.replace(".ts", "");
    configs.push(config);
  });

  fs.writeFileSync(
    `${__dirname}/../../../.space-configs/${env}.json`,
    JSON.stringify(configs, null, 2)
  );
}
