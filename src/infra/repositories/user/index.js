const { toEntity } = require("./transform");
const { comparePassword } = require("../../encryption");

module.exports = ({ model: Model }) => {
  const getAll = (...args) => {
    return Model.findAll(...args).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data;
        return toEntity(dataValues);
      })
    );
  };

  const create = async (...args) => {
    try {
      const result = await Model.create(...args);
      console.log(result._doc);

      return toEntity(result._doc);
    } catch (err) {
      throw err;
    }
  };

  const update = (...args) =>
    Model.update(...args).catch((error) => {
      throw new Error(error);
    });

  const findById = (...args) =>
    Model.findByPk(...args)
      .then(({ dataValues }) => toEntity(dataValues))
      .catch((error) => {
        throw new Error(error);
      });

  const findOne = async (...args) => {
    try {
      const result = await Model.findOne(...args);
      if (result) {
        return toEntity(result._doc);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const validatePassword = (endcodedPassword) => (password) =>
    comparePassword(password, endcodedPassword);

  const destroy = (...args) => Model.destroy(...args);

  return {
    getAll,
    create,
    update,
    findById,
    findOne,
    validatePassword,
    destroy,
  };
};
