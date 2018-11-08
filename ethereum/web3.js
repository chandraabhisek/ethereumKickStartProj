import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined' ){
  web3 = new Web3(window.web3.currentProvider); // we are in browser and metamask in installed
} else{
  // We are on server or user not running metamask
  const provider =  new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/cfed26ef54a2434293fba9758466c591'
  );
  web3  = new Web3(provider);
}
// const web3 = new Web3(window.web3.currentProvider);

export default web3;
