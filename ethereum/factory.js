import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xf66055fc3076829d52afc64ac101a886b8f8ae85"
);

export default instance;
