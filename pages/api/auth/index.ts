import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookie from 'cookie';
import dbConnect from '@/utils/db-connect';
import User from '@/models/Users';

const JWT_KEY = process.env.JWT_KEY as string;

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    if (!token)
      return res.status(401).json({ message: 'Not authenticated' });

    const decodedToken = await jwt.verify(token, JWT_KEY);
    const { email } = decodedToken as JwtPayload;

    await dbConnect();
    let user;

    // Check whether user exists or not
    try {
      user = await User.findOne({ email: email });
    } catch (error) {
      return Promise.reject(error);
    }

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });

    res
      .status(200)
      .json({
        user: { id: user.naem, name: user.name, email: user.email },
      });
  } else {
    res
      .status(422)
      .json({ success: false, message: 'Method not allowed' });
  }
};

export default handler;
