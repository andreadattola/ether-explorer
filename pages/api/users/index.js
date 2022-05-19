/* 
import { database } from "@/api-lib/middlewares";
import nc from "next-connect";
import {validateBody} from '../../../api-lib/middlewares/ajv'
import bcrypt from "bcryptjs";

import slug from "slug";

const handler = nc();

handler.use(database); comment here we don't need auths in this case because we don't do authentication

comment here POST /api/users
handler.post(
  validateBody({
    type: "object",
    properties: {
      apiKey: { type: "string", minLength: 1, maxLength: 50 },
      password: { type: "string", minLength: 8 },
      email: { type: "string", minLength: 1 },
    },
    required: [ "apiKey", "password", "email"],
    additionalProperties: false,
  }),
  async (req, res) => {
    
    const { email, apiKey, password } = req.body;
   comment here const username = slug(req.body.username);
     comment here this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same

    comment here check if email existed
    if ((await req.db.collection("users").countDocuments({ email })) > 0) {
      res.status(403).send("The email has already been used.");
    }
    comment here check if username existed
 / comment    if ((await req.db.collection("users").countDocuments({ username })) > 0) {
      res.status(403).send("The username has already been taken.");
    } comment /
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      
      profilePicture : '',
      originalPassword : password,
      email,
      apiKey,
      username : '',
      name : '',
      bio : '',
    };

    const passwordHashed = await bcrypt.hash(password, 10);

    const { insertedId } = await req.db
      .collection("users")
      comment here notice how I pass the password independently and not right into the user object (to avoid returning the password later)
      .insertOne({ ...user, passwordHashed });

    user._id = insertedId; comment here we attach the inserted id (we don't know beforehand) to the user object

    req.login(user, (err) => {
      if (err) throw err;
      comment here when we finally log in, return the (filtered) user object
      res.status(201).json({
        user,
      });
    });
  }
);

export default handler; */



import { findUserByApiKey, findUserByEmail, insertUser } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { slugUsername } from '@/lib/user';
import nc from 'next-connect';


const handler = nc(ncOpts);

handler.use(database);

handler.post(
  validateBody({
    type: "object",
    properties: {
      apiKey: { type: "string", minLength: 1, maxLength: 50 },
      password: { type: "string", minLength: 8 },
      email: { type: "string", minLength: 1 },
      name : {type : "string", minLength : 1},
      username : {type : "string", minLength : 1},
      bio : {type : "string", minLength : 0}
    },
    required: [ "apiKey", "password", "email"],
    additionalProperties: false,
  }),
  ...auths,
  async (req, res) => {
    const { apiKey, email, password, name, bio, username } = req.body;
  
    if (!email) {
      res
        .status(400)
        .json({ error: { message: 'The email you entered is invalid.' } });
      return;
    }
    if (await findUserByEmail(req.db, email)) {
      res
        .status(403)
        .json({ error: { message: 'The email has already been used.' } });
      return;
    }
    if (await findUserByApiKey(req.db, apiKey)) {
      res
        .status(403)
        .json({ error: { message: 'The apiKey has already been taken.' } });
      return;
    }
    const user = await insertUser(req.db, {
      email,
      apiKey,
      originalPassword: password,
      bio,
      name,
      username,
    });
    console.log('user', user)
    req.logIn(user, (err) => {
      if (err) throw {error : err, message : 'this'};
      res.status(201).json({
        user,
      });
    });
  }
);

export default handler;
