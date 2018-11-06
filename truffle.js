let ropstenProvider;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*",
    },
    ropsten: {
      provider: ropstenProvider,
      network_id: "3",
      gas: 4465030
    }
  }
};
