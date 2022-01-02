import cookie from 'cookie';

const parseCookie = (req: any) => {
  return cookie.parse(req ? req.headers.cookie || '' : '');
};

export default parseCookie;
