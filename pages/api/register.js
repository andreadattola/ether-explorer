import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("unipi-ether-db");

  switch (req.method) {
    case "POST":
      console.log("reqbody", req.body);
      let bodyObject = req.body;
      const { email, password, apiKey } = bodyObject;
      console.log("bodyObject ", bodyObject);
      if ((await db.collection("users").countDocuments({ email })) > 0) {
        return res.status(403).json({success: false, message: "The email has already been used."});
      }
      const user = await db
        .collection("users")
        .insertOne({ email, password, apiKey });
      if (user) {
          res.status(201).json({ success: true, user});
        if (!user)
          res.status(203).json({ success: false, user: "Qualcosa è andato storto!" });
      }
      break;
    case "GET":
      res.json({ status: 501, data: "method not allowed " });
      break;
  }
}
