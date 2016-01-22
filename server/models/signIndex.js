module.exports = {
  signin: {
    get: function (callback) {
      console.log('+++line4: inside models get signIndex.js');
    },
    post: function (callback) {
      console.log('+++line7: inside models post signIndex.js');
    }
  },
  signup: {
    get: function (callback) {
      console.log('+++line12: inside models get signIndex.js');
    },
    post: function (callback) {
      console.log('+++line15: inside models post signIndex.js');
    }
  },
  logout: {
    get: function (callback) {
      console.log('+++line20: inside models get signIndex.js');
    },
    post: function (callback) {
      console.log('+++line23: inside models post signIndex.js');
    }
  }
}