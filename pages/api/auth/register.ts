import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/db-connect';
import User from '@/models/Users';

const JWT_KEY = process.env.JWT_KEY as string;

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    await dbConnect();

    // Check if user is registered before or not
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (error) {
      return Promise.reject(error);
    }

    if (existingUser) {
      return res
        .status(422)
        .json({ success: false, message: 'User Exists' });
    }

    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (error) {
      return Promise.reject(error);
    }

    const createdUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    try {
      await createdUser.save();
    } catch (error) {
      return Promise.reject(error);
    }

    let token;

    try {
      token = await jwt.sign(
        {
          id: createdUser._id,
          email: createdUser.email,
          name: createdUser.name,
        },
        JWT_KEY
      );
    } catch (error) {
      return Promise.reject(error);
    }

    res.status(201).json({
      success: true,
      message: 'User Signedup successfully',
      token,
    });
  } else {
    res
      .status(422)
      .json({ success: false, message: 'Method not allowed' });
  }
};

export default handler;
