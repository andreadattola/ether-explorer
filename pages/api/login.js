import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { getRightDate } from "../../utils/getRightDate";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("unipi-ether-db");

  switch (req.method) {
    case "POST":
      let bodyObject = req.body;
      if(!bodyObject) return res.status(403).json({ success: false, message: "user not found" });
    console.log('bodyObject', bodyObject)
      let user = !bodyObject._id
        ? await db.collection("users").findOne({ ...bodyObject })
        : await db
            .collection("users")
            .findOne({ _id: ObjectId(bodyObject._id) });
      if (user)  res.status(201).json({ success: true, user });
      if (!user)
        res.status(403).json({ success: false, message: "user not found" });
      break;
    /*   case "GET":
      const users = await db.collection("users").find({}).toArray();
      res.json({ status: 200, data: users });
      break; */
  }
}
