interface GetAllChannelJson {
  status: "200";
  channels: [
    {
      code: "32323232323232323232323232323232";
      title: "JCAV-69低清";
      subTitle: "JCAV-69低清";
      channelnum: "114";

      icon: "http://114.514.114.514:8081/fasfgghreh/fwgferagh.png";

      timeshiftAvailable: "true";
      lookbackAvailable: "true";
      isCharge: "0";
      params: {
        ztecode: "ch238190385093235";

        zteurl: "rtm://224.0.0.0:114";

        hwurl: "rtm://224.0.0.0:514";

        hwcode: "87590142375948037589376732489579";

        hwmediaid: "18756904768901376589143765891430";

        recommendPos: "fjioawefjwi_46973";

        playBackRecommendPos: "fjioawefjwi_32159";
      };
    },
  ];
}

type channel = GetAllChannelJson["channels"][0];
interface Option {
  playlistName?: string;
  platform?: "zte" | "hw";
  includeIcon?: boolean;
  includechannelnum?: boolean;
  sort?: boolean;
  proxyPrefix?: string | false;
}
export { GetAllChannelJson, channel, Option };
