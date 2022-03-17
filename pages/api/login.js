import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { getRightDate } from "../../utils/getRightDate";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("unipi-ether-db");

  switch (req.method) {
    case "POST":
      let bodyObject = req.body;

      let user = !bodyObject._id
        ? await db.collection("users").findOne({ ...bodyObject })
        : await db
            .collection("users")
            .findOne({ _id: ObjectId(bodyObject._id) });
      if (user) {
        let newUser = await db
          .collection("users")
          .findOneAndUpdate(
            { _id: user._id },
            { $set: { lastLogin: getRightDate(new Date().getTime()) } },
            { new: true, runValidators: true },
            (err, doc) => {
              if (err) {
                console.log("err", err);
              }
              if (doc) res.status(201).json({ success: true, user: doc.value });
            }
          );
      }
      if (!user)
        res.status(403).json({ success: false, message: "user not found" });
      break;
    /*   case "GET":
      const users = await db.collection("users").find({}).toArray();
      res.json({ status: 200, data: users });
      break; */
  }
}
