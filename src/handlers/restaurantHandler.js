import ValidatorJs from 'validatorjs';
import {Restaurant} from '../infrastructure/sequelize.js';
import ValidationError from '../errors/ValidationError.js';
import ApiError from '../errors/ApiError.js';

export const getAll = () => {
  return Restaurant.findAll();
};

export const create = (req) => {
  const validator = new ValidatorJs(req.body, {
    name: "required|string",
    address: "required|string",
  });
  if (validator.fails()) {
    throw new ValidationError(validator.errors.all());
  }
  const payload = req.body;
  return Restaurant.create(payload);
};
export const update = async (req) => {
  const validator = new ValidatorJs(req.body, {
    name: "string",
    address: "string",
  });
  if (validator.fails()) {
    throw new ValidationError(validator.errors.all());
  }
  const payload = req.body;
  const restaurantId = req.params.id;
  await Restaurant.update(payload, {
    where: { id: restaurantId },
  });
  return Restaurant.findByPk(restaurantId);
};

export const destroy = async (req) => {
  const restaurantId = req.params.id;
  const restaurant = await Restaurant.findByPk(restaurantId);
  if (!restaurant) throw new ApiError("Restaurant not found", 404);

  await Restaurant.destroy({
    where: { id: restaurantId },
  });
  return restaurant;
};