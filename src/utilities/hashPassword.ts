import bcrypt from 'bcrypt';
import env from '../middlewares/config';

const hash = (pass: string): string => {
  return bcrypt.hashSync(
    `${pass}${env.pepper}`,
    bcrypt.genSaltSync(parseInt(env.salt as string, 10))
  );
};

export default hash;
