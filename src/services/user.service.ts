import { User } from "../entities/user/user.entity";
import { generateHash, verifyHash } from "../utilities/encryptionUtils";
import { sanitizeUser } from "../utilities/apiUtilities";
import { AppDataSource } from "../config/AppDataSource";

const getRepository = () => {
  return AppDataSource.getRepository(User);
};

const getUserById = async (id: number) => {
  try {
    const userRepository = getRepository();
    return sanitizeUser(await userRepository.findOne({ where: { id } }));
  } catch (e) {
    return null;
  }
};

const getUserByEmail = async (email: string, getHash: boolean = false) => {
  try {
    const userRepository = getRepository();
    return await userRepository.findOne({ where: { email } });
  } catch (e) {
    return null;
  }
};

const createUser = async (email: string, pass: string, name: string = "") => {
  const userRepository = getRepository();
  const newUser = new User();
  newUser.email = email;
  newUser.password = await generateHash(pass, 10);
  newUser.name = name;
  return sanitizeUser(await userRepository.save(newUser));
};

const updateUser = async (user: User) => {
  const userRepository = getRepository();
  return await userRepository.save(user);
};

const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email, true);
  if (user) {
    if (await verifyHash(password, user.password)) {
      user.lastLogin = new Date().toISOString();
      updateUser(user); // save user login time
      return sanitizeUser(user);
    }
  }

  return null;
};

export default {
  createUser,
  loginUser,
  getUserById,
};
