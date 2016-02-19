var deviceMasterKey, wundergroundKey;

$.ajax({
  url: "/apiKey",
  type: "GET",
  contentType: "application/json",
  async: false,
  success: function (data) {
    deviceMasterKey = data.deviceMasterKey;
    wundergroundKey = data.wundergroundKey;
  },
  error: function (data) {
    console.error('Failed to get key');
  }
});
