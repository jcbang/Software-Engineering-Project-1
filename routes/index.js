const { postUserLogin, postUserRegister, postUserLogout } = require('./user');
const { postContactsGetAllContacts, postContactsAdd, postLogout } = require('./contacts');

// User
exports.postUserLogin = async (req, res) => {
  await postUserLogin(req, res);
};
exports.postUserRegister = async (req, res) => {
	await postUserRegister(req, res);
};
exports.postUserLogout = async (req, res) => {
	await postUserLogout(req, res);
};

// Contacts
exports.postContactsGetAllContacts = async (req, res) => {
	await postContactsGetAllContacts(req, res);
};
  exports.postContactsAdd = async (req, res) => {
	  await postContactsAdd(req, res);
};