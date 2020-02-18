const CONSTANTS = {};
CONSTANTS.ENDPOINT = {};

CONSTANTS.PORT = process.env.PORT || "3001";
CONSTANTS.ENDPOINT.GRID = "/grid";

CONSTANTS.ENDPOINT.LIST = "/list";

CONSTANTS.ENDPOINT.REGISTRATION = "/registration";

CONSTANTS.ENDPOINT.LOGIN = "/login";

CONSTANTS.ENDPOINT.LOGINMIDDLE = "/loginmiddle";

CONSTANTS.ENDPOINT.DASHBOARD = "/dashboard";

CONSTANTS.ENDPOINT.LOGOUT = "/logout";

CONSTANTS.ENDPOINT.MASTERDETAIL = "/masterdetail";

CONSTANTS.ENDPOINT.MONGO_URI = "mongodb+srv://jeussantiago:jeusadmin5687@cluster0-ewyhf.mongodb.net/test?retryWrites=true&w=majority";

module.exports = CONSTANTS;
