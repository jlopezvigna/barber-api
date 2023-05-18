import { StatusCodes } from "http-status-codes";

import userService from "../services/user.service";
import IController from "../types/IController";
import apiResponse from "../utilities/apiResponse";
import { generateCookie } from "../utilities/encryptionUtils";
import constants from "../constants";
import locale from "../constants/locale";

const login: IController = async (req, res) => {
  const user = await userService.loginUser(req.body.email, req.body.password);
  if (user) {
    const cookie = await generateUserCookie(user.id);
    apiResponse.result(res, user, StatusCodes.OK, cookie);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST, locale.INVALID_CREDENTIALS);
  }
};

const register: IController = async (req, res) => {
  let user;
  try {
    user = await userService.createUser(
      req.body.email,
      req.body.password,
      req.body.name
    );
  } catch (e) {
    if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
      apiResponse.error(
        res,
        StatusCodes.BAD_REQUEST,
        locale.EMAIL_ALREADY_EXISTS
      );
      return;
    }
  }
  if (user) {
    const cookie = await generateUserCookie(user.id);
    apiResponse.result(res, user, StatusCodes.CREATED, cookie);
  } else {
    apiResponse.error(res, StatusCodes.BAD_REQUEST);
  }
};

const self: IController = async (req, res) => {
  const cookie = await generateUserCookie(req.user.id);
  apiResponse.result(res, req.user, StatusCodes.OK, cookie);
};

const generateUserCookie = async (userId: number) => {
  return {
    key: constants.Cookie.COOKIE_USER,
    value: await generateCookie(
      constants.Cookie.KEY_USER_ID,
      userId.toString()
    ),
  };
};

export default {
  login,
  register,
  self,
};
