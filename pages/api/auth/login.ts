import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import dbConnect from '@/utils/db-connect';
import User from '@/models/Users';

const JWT_KEY = process.env.JWT_KEY as string;

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
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

    // Check if user entered correct password

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, user.password);
    } catch (error) {
      return Promise.reject(error);
    }

    if (!isValidPassword) {
      return res
        .status(422)
        .json({ success: false, message: 'Invalid inputs' });
    }

    let token;

    try {
      token = await jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        JWT_KEY
      );
    } catch (error) {
      return Promise.reject(error);
    }

    res
      .status(200)
      .setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        })
      )
      .json({
        success: true,
        message: 'Logged in successfully',
        user: { name: user.name, email: user.email },
      });
  } else {
    res
      .status(422)
      .json({ success: false, message: 'Method not allowed' });
  }
};

export default handler;
