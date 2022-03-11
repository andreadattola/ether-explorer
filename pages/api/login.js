import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("unipi-ether-db");
 
  switch (req.method) {
    case "POST":
      console.log('reqbody', req.body)
      let bodyObject = req.body;
      console.log("bodyObject ", bodyObject);
      let user = await db
        .collection("users")
        .findOne({ username: bodyObject.username, password: bodyObject.password });
     if(user) res.status(201).json({success: true, user : user})
     if(!user) res.status(203).json({success: false, user : 'user not found'})
      break;
    /*   case "GET":
      const users = await db.collection("users").find({}).toArray();
      res.json({ status: 200, data: users });
      break; */
  }
}
