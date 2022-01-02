import jwt from 'jsonwebtoken';
import {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from 'next';

const JWT_KEY = process.env.JWT_KEY as string;

const checkAuth =
  (fn: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers?.authorization?.split(' ')[1]; // Bearer Token

    if (!token)
      return res.status(401).json({ message: 'Not authenticated' });

    jwt.verify(token, JWT_KEY, async function (error, decodedToken) {
      if (!error && decodedToken) {
        return await fn(req, res);
      }

      res.status(401).json({ message: 'Not authenticated' });
    });
  };

export default checkAuth;
