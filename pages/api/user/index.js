import { ValidateProps } from '@/api-lib/constants';
import { findUserByApiKey, updateUserById } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { slugUsername } from '@/lib/user';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import nc from 'next-connect';

const upload = multer({ dest: '/tmp' });
const handler = nc(ncOpts);

if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

handler.use(database, ...auths);

handler.get(async (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
});

handler.patch(
  upload.single('profilePicture'),
  validateBody({
    type: 'object',
    properties: {
      username: ValidateProps.user.username,
      name: ValidateProps.user.name,
      bio: ValidateProps.user.bio,
      apiKey: ValidateProps.user.apiKey
    },
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }
    let profilePicture;
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: 'fill',
      });
      profilePicture = image.secure_url;
    }
    const { name, bio , apiKey} = req.body;

    let username;
    /** @todo add same mothod for username */
    if (req.body.apiKey) {
      username = slugUsername(req.body.username);
      
      if (
        username !== req.user.username &&
        (await findUserByApiKey(req.db, req.body.apiKey))
      ) {
       
        res
          .status(403)
          .json({ error: { message: 'The apikey has already been taken.' } });
        return;
      }
    }

    const user = await updateUserById(req.db, req.user._id, {
      ...(username && { username }),
      ...(name && { name }),
      ...(typeof bio === 'string' && { bio }),
      ...(profilePicture && { profilePicture }),
      ...(apiKey && { apiKey }),
    });

    res.json({ user });
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
