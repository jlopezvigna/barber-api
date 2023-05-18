import { StatusCodes } from "http-status-codes";
import Container from "typedi";
import Constants from "../constants";
import locale from "../constants/locale";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import userService from "../services/user.service";
import IController from "../types/IController";
import apiResponse from "../utilities/apiResponse";
import { extractCookieFromRequest } from "../utilities/apiUtilities";
import { verifyCookie } from "../utilities/encryptionUtils";

const create: IController = async (req, res) => {
  const service = Container.get(TransactionService);

  const authorizationHeader = extractCookieFromRequest(
    req,
    Constants.Cookie.COOKIE_USER
  );
  const decoded = await verifyCookie(authorizationHeader);
  const user = await userService.getUserById(
    decoded.data[Constants.Cookie.KEY_USER_ID]
  );

  service
    .createTransaction(req.body, user.id)
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
  const service = Container.get(TransactionService);

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
  const service = Container.get(TransactionService);
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
  const service = Container.get(TransactionService);
  service
    .findAll()
    .then((response) => apiResponse.result(res, response, StatusCodes.OK))
    .catch((err) =>
      apiResponse.error(res, StatusCodes.BAD_REQUEST, locale.SOMETHIG_HAPPENED)
    );
};

const remove: IController = (req, res) => {
  const service = Container.get(TransactionService);
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
