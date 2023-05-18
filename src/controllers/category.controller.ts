import { StatusCodes } from "http-status-codes";
import Container from "typedi";
import locale from "../constants/locale";
import { CategoryService } from "../services/category.service";
import IController from "../types/IController";
import apiResponse from "../utilities/apiResponse";

const create: IController = (req, res) => {
  const service = Container.get(CategoryService);

  service
    .create(req.body)
    .then((response) => apiResponse.result(res, response, StatusCodes.OK))
    .catch((err) =>
      apiResponse.error(
        res,
        StatusCodes.BAD_REQUEST,
        err.code === "ER_DUP_ENTRY" ? "RECORD_ALREADY_EXISTS" : "UNKNOWN_ERROR"
      )
    );
};

const update: IController = async (req, res) => {
  const service = Container.get(CategoryService);

  try {
    const client = await service.update(Number(req.params.id), req.body);
    apiResponse.result(res, client, StatusCodes.OK);
  } catch (err) {
    apiResponse.error(
      res,
      StatusCodes.BAD_REQUEST,
      err.code === "ER_DUP_ENTRY" ? "RECORD_ALREADY_EXISTS" : "UNKNOWN_ERROR"
    );
  }
};

const get: IController = (req, res) => {
  const service = Container.get(CategoryService);
  service
    .findOneById(Number(req.params.id))
    .then((response) => {
      response
        ? apiResponse.result(res, response, StatusCodes.OK)
        : apiResponse.error(
            res,
            StatusCodes.NOT_FOUND,
            locale.RECORD_NOT_FOUND
          );
    })
    .catch((err) =>
      apiResponse.error(res, StatusCodes.NOT_FOUND, locale.RECORD_NOT_FOUND)
    );
};

const list: IController = (req, res) => {
  const service = Container.get(CategoryService);
  service
    .findAll()
    .then((response) => apiResponse.result(res, response, StatusCodes.OK))
    .catch((err) =>
      apiResponse.error(res, StatusCodes.BAD_REQUEST, locale.SOMETHIG_HAPPENED)
    );
};

const remove: IController = (req, res) => {
  const service = Container.get(CategoryService);
  service
    .delete(Number(req.params.id))
    .then(() => apiResponse.result(res, {}, StatusCodes.OK))
    .catch((err) =>
      apiResponse.error(res, StatusCodes.BAD_REQUEST, locale.SOMETHIG_HAPPENED)
    );
};

export default {
  create,
  update,
  remove,
  list,
  get,
};
