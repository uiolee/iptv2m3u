import { M3uPlaylist, M3uMedia } from "m3u-parser-generator";

import type { GetAllChannelJson, channel, Option } from "./types.js";

const defaultOption: Option = {
  platform: "hw",
  includeIcon: false,
  proxyPrefix: false,
};

class IPTV2M3U {
  jsonStr: string;
  jsonObj: GetAllChannelJson;
  option: Option;
  m3uStr?: string;
  playlist = new M3uPlaylist();
  constructor(jsonStr: string, userOption?: Option) {
    this.jsonStr = jsonStr;
    this.option = { ...defaultOption, ...userOption };
    console.info(`json string lenth: ${this.jsonStr.length}`);
    try {
      this.jsonObj = JSON.parse(jsonStr);
    } catch (err) {
      const msg = "fail to parse json string:" + err;
      console.error(msg);
      throw msg;
    } finally {
    }
    console.info(`channels in json: ${this.length}`);
  }
  get length() {
    return this.jsonObj.channels.length;
  }

  getProxyUrl(url: string) {
    if (this.option.proxyPrefix) {
      const prefix = this.option.proxyPrefix;
      return new URL(url.replace("rtp://", ""), prefix).toString();
    }
    return url;
  }

  checkKwIn(array: string[]) {
    return (kw: string) => {
      for (const item of array) {
        if (item.includes(kw)) {
          return true;
        } else {
          return false;
        }
      }
    };
  }
  groupByName(chan: channel) {
    const checkKw = this.checkKwIn([chan.title, chan.subTitle]);
    const groupMap = {
      超清: ["超清"],
      高清: ["高清"],
    };
    for (const [groupName, groupKw] of Object.entries(groupMap)) {
      for (const kw of groupKw) {
        if (checkKw(kw)) {
          return groupName;
        }
      }
    }
  }
  includeIcon(media: M3uMedia, chan: channel) {
    media.attributes["tvg-logo"] = chan.icon;
  }
  _item(chan: channel) {
    const url = this.getProxyUrl(
      chan.params[`${this.option.platform ?? "hw"}url`],
    );

    const media = new M3uMedia(url);
    media.attributes = {};
    media.duration = -1;
    media.name = chan.subTitle;

    if (this.option.includechannelnum) {
      media.attributes["tvg-id"] = chan.channelnum;
    }
    if (this.option.includeIcon) {
      media.attributes["tvg-logo"] = chan.icon;
    }

    this.playlist.medias.push(media);
  }
  getM3uString(option?: Option) {
    this.option = { ...this.option, ...option };

    this.playlist = new M3uPlaylist();
    this.playlist.title =
      this.option.playlistName ?? `IPTV Platlist ${this.length}`;

    const channels = this.jsonObj.channels;
    channels.forEach((chan) => {
      this._item(chan);
    });

    if (this.option.sort) {
      this.playlist.medias.sort((media1, media2) => {
        return media1.name?.localeCompare(media2.name ?? "") ?? -1;
      });
    }

    const m3uString = this.playlist.getM3uString();
    console.log("m3u string length:", m3uString.length);
    this.m3uStr = m3uString;
    return m3uString;
  }
  getM3uStringAsync(option?: Option): Promise<string> {
    return new Promise((resolve) => {
      resolve(this.getM3uString(option));
    });
  }
}

export { IPTV2M3U, defaultOption };
