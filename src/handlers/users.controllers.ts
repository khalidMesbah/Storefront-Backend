import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';

// import gr from '../utilities/generateRandom';
import jwt from 'jsonwebtoken';
import env from '../middlewares/config';
const controller = new UserModel();
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

class Controller {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.index();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.show(req.params.id as string);
      if (typeof result === 'undefined') res.json("the user doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await controller.create(req.body);
      const token = jwt.sign({ user: newUser }, env.tokenSecret as string);
      res.json(token);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    // check if the user is the same user that will be updated
    try {
      const userInfo = await controller.authenticate(req.params.id);
      const tokenInfo = parseJwt(
        String(req.headers.authorization).split(' ')[1] as string
      );
      console.log(`🚀🔥👉 ⚡ Controller ⚡ update= ⚡ userInfo`, userInfo);
      console.log(
        `🚀🔥👉 ⚡ Controller ⚡ update= ⚡ tokenInfo.user`,
        tokenInfo.user
      );

      if (
        tokenInfo.user.firstname === userInfo.firstname &&
        tokenInfo.user.lastname === userInfo.lastname &&
        tokenInfo.user.password === userInfo.password
      ) {
        // update the user
        try {
          const result = await controller.update(req.params.id, req.body);
          const newUser = await controller.authenticate(req.params.id);
          const token = jwt.sign({ user: newUser }, env.tokenSecret as string);

          res.json({ ...result, newtoken: token });
          return;
        } catch (error) {
          next(error);
        }
        return;
      } else {
        res.json({
          msg: 'you are not the same user',
          token: tokenInfo.user,
          user: userInfo,
        });
        return;
      }
    } catch (error) {
      res.json(`🚀🔥👉 ⚡ Controller ⚡ update= ⚡ error => ${error}`);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.delete(req.params.id as string);
      if (typeof result === 'undefined') res.json("the user doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
