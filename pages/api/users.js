import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  console.log('handler in')
  const client = await clientPromise;
  console.log('client', client)
  const db = client.db("unipi-ether-db");
  console.log('db', db)
  switch (req.method) {
/*     case "POST":
      let bodyObject = JSON.parse(req.body);
      let newPost = await db.collection("users").insertOne(bodyObject);
      res.json(newPost.ops[0]);
      break; */
    case "GET":
      const users = await db.collection("users").find({});
      console.log('users api', users)
      res.json({ status: 200, data: users });
      break;
  }
}