import { readFile, writeFile } from "fs/promises";

import { IPTV2M3U } from "../src/main.ts";
// import { IPTV2M3U } from "iptv2m3u";

readFile("./test/getAllChannel.json", { encoding: "utf-8" }).then((str) => {
  const iptv2m3u = new IPTV2M3U(str, { platform: "hw", sort: true });

  iptv2m3u.getM3uStringAsync().then(async (m3uStr) => {
    await writeFile(`./output/cmcc-iptv-${iptv2m3u.length} rtp.m3u`, m3uStr, {
      encoding: "utf-8",
    });
  });

  iptv2m3u
    .getM3uStringAsync({
      proxyPrefix: "http://127.0.0.1:4022/udp/",
    })
    .then(async (m3uStr) => {
      await writeFile(
        `./output/cmcc-iptv-${iptv2m3u.length} http.m3u`,
        m3uStr,
        { encoding: "utf-8" },
      );
    });
});
