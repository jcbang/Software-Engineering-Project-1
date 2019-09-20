const { postLogin } = require('./user');

// Login
exports.postLogin = async (req, res) => {
  await postLogin(req, res);
};
