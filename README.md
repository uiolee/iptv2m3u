# iptv2m3u

convert getAllChannel.json to m3u format.

[![GitHub Tag](https://img.shields.io/github/v/tag/uiolee/iptv2m3u?logo=github)](https://github.com/uiolee/iptv2m3u/tags)
[![GitHub Release](https://img.shields.io/github/v/release/uiolee/iptv2m3u?logo=github)](https://github.com/uiolee/iptv2m3u/releases)
[![GitHub commits since latest release](https://img.shields.io/github/commits-since/uiolee/iptv2m3u/latest?include_prereleases&sort=semver&logo=github)](https://github.com/uiolee/iptv2m3u/compare/...main)
[![GitHub top language](https://img.shields.io/github/languages/top/uiolee/iptv2m3u?logo=github)](#iptv2m3u)
[![CI](https://github.com/uiolee/iptv2m3u/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/uiolee/iptv2m3u/actions/workflows/ci.yml)
[![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/uiolee/iptv2m3u?logo=librariesdotio)](https://libraries.io/github/uiolee/iptv2m3u#dependencies)

## npmjs

[![NPM Version](https://img.shields.io/npm/v/iptv2m3u?logo=npm)](https://www.npmjs.com/package/iptv2m3u)
[![NPM License](https://img.shields.io/npm/l/iptv2m3u)](./LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dm/iptv2m3u?logo=npm)](#iptv2m3u)
[![NPM Downloads](https://img.shields.io/npm/dt/iptv2m3u?logo=npm)](#iptv2m3u)
[![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iptv2m3u?logo=librariesdotio)](https://libraries.io/npm/iptv2m3u/tree)

## an examlple run in Node.JS

```bash
npm i iptv2m3u
```

```javascript example.mjs
// node example.mjs
import { readFile, writeFile } from "fs/promises";
import { IPTV2M3U } from "iptv2m3u";

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
        { encoding: "utf-8" }
      );
    });
});
```

## run in browser

Maybe it will works in the browser too, but I haven't tested it yet.
