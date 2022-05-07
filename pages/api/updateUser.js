import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("unipi-ether-db");

  switch (req.method) {
    case "POST":
      let bodyObject = req.body;
   
    if(!bodyObject._id) return  res.status(403).json({ success: false, message: "OPS!, something went wron" });
      let user = !bodyObject._id
        ? await db.collection("users").findOne({ ...bodyObject })
        : await db
            .collection("users")
            .findOne({ _id: ObjectId(bodyObject._id) });
      if (user) {
          console.log('users', user)
          const updatedUser = {...user, ...bodyObject}
          console.log('updatedUser', updatedUser)
          delete updatedUser._id
        let newUser = await db
          .collection("users")
          .findOneAndUpdate(
            { _id:  ObjectId(bodyObject._id) },
            { $set: updatedUser  },
            { new: true, runValidators: true },
            (err, doc) => {
              if (err) {
                console.log("err", err);
              }
              if (doc) res.status(204).json({ success: true, user: doc.value });
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