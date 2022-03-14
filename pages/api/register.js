import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("unipi-ether-db");

  switch (req.method) {
    case "POST":
      console.log("reqbody", req.body);
      let bodyObject = req.body;
      const { email, password } = bodyObject;
      console.log("bodyObject ", bodyObject);
      if ((await db.collection("users").countDocuments({ email })) > 0) {
        return res.status(403).json({success: false, message: "The email has already been used."});
      }
      const user = await db
        .collection("users")
        .insertOne({ email, password: password });
      if (user) {
        /*  res.json({ status: 201, user: user }); */
        let loggedInUser = await db
          .collection("users")
          .findOne({
            username: bodyObject.username,
            password: bodyObject.password,
          });
        if (loggedInUser)
          res.status(201).json({ success: true, registration : user, user: loggedInUser });
        if (!user)
          res.status(203).json({ success: false, user: "user not found" });
      }
      break;
    case "GET":
      res.json({ status: 501, data: "method not allowed " });
      break;
  }
}
