import { readFileSync } from "fs";
import path from "path";

export const getSiteData = () => {
  const dataPath = path.join(
    process.cwd(),
    "src",
    "app",
    "data",
    "siteData.json"
  );
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));
  return [data, dataPath];
};
