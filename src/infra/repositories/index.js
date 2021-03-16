const User = require("./user");
// const Company = require("./company");

module.exports = ({ database }) => {
  const userModel = database.modelFactory("User");
  // const companyModel = database.modelFactory("Companies");

  return {
    userRepository: User({ model: userModel }),
    // companyRepository: Company({ model: companyModel }),
  };
};
