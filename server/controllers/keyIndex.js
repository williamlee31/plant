module.exports = {
  get: function (req, res) {
    var apiKey = {};
    if(process.env.deviceMasterKey && process.env.wundergroundKey){
      apiKey.deviceMasterKey = process.env.deviceMasterKey;
      apiKey.wundergroundKey = process.env.wundergroundKey;
    } else {
      apiKey.deviceMasterKey = "<YOUR KEY HERE>";
      apiKey.wundergroundKey = "<YOUR KEY HERE>";
    }
    res.send(apiKey);
  }
}
