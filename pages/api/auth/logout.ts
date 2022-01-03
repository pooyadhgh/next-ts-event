import type {
  NextApiRequest,
  NextApiResponse,
  NextApiHandler,
} from 'next';
import cookie from 'cookie';

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    // Destroy cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/',
      })
    );

    res.status(200).json({ success: true });
  } else {
    res
      .status(422)
      .json({ success: false, message: 'Method not allowed' });
  }
};

export default handler;
