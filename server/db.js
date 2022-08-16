const { json } = require("express/lib/response");
const { MongoClient, ObjectId } = require("mongodb"); //destructing
require("dotenv").config();
const uri = process.env.DB_URI;
const client = new MongoClient(uri);
module.exports = {
  dbConnect: async function dbConnect() {
    try {
      await client.connect();
      console.log("db connected");
    } catch (error) {
      console.log(error);
    }
  },

  /* Creat the user in Profile collection */
  createUser: async function createUser(user) {
    try {
      const data = await client
        .db("findhome")
        .collection("profile")
        .insertOne(user);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  /* Find the user in Profile collection */
  findUser: async function findUser(sub) {
    try {
      const data = await client
        .db("findhome")
        .collection("profile")
        .findOne({ "auth0.sub": sub });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  /* Update the user in Profile collection */
  updateUser: async function updateUser(sub, user) {
    try {
      const data = await client
        .db("findhome")
        .collection("profile")
        .findOneAndUpdate({ "auth0.sub": sub }, { $set: { user } }, {}, {});
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  /* Creat the home in home collection */
  createHome: async function createHome(home) {
    try {
      const data = await client
        .db("findhome")
        .collection("home")
        .insertOne(home);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  /* Find all home in home collection */
  findAllHomes: async function findAllHomes(home) {
    try {
      const data = await client.db("findhome").collection("home").find(home);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  /* Find home by id in home collection */
  findHomeById: async function findHomeById(id) {
    try {
      const data = await client
        .db("findhome")
        .collection("home")
        .findOne({ _id: ObjectId(id) });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

/* Find the homes by landlord in home collection */
findHomeByLandlord: async function findHomeByLandlord(sub) {
  try {
    const data = await client
      .db("findhome")
      .collection("home")
      .find({ "landlord": sub });
    return data;
  } catch (error) {
    console.log(error);
  }
},

  // /* Find the home by type */
  // findHomeByType: async function findHomeByType(num) {
  //   try {
  //     const data = await client
  //       .db("findhome")
  //       .collection("home")
  //       .find({ "home.type": Number(num) });
  //     console.log(data)
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  /* Search the home by keywords */
  SearchHome: async function SearchHome(keywords) {
    try {
      const data = await client
        .db("findhome")
        .collection("home")
        .find({$or:[{ "home.title": { $regex: keywords, $options: "$i" }},{ "home.details": { $regex: keywords, $options: "$i" }},{ "home.address": { $regex: keywords, $options: "$i" }}]});
      return data
    } catch (error) {
      console.log(error);
    }
  },

  /* Update the home in home collection */
  updateHome: async function updateHome(id, home) {
    try {
      const data = await client
        .db("findhome")
        .collection("home")
        .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { home } }, {}, {});
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  /* Delete the home in home collection and delete the applicaitons if have */
  deleteHome: async function deleteHome(id) {
    try {
      const data1 = await client
        .db("findhome")
        .collection("home")
        .deleteOne({ _id: ObjectId(id) });
      const data2 = await client
        .db("findhome")
        .collection("application")
        .deleteMany({ home_id: id });
      console.log(data1);
      var keyMap = {
        "acknowledged": "acknowledged_application",
        "deletedCount": "deletedCount_application"
      };
      for (var key in data2) {
        var newKey = keyMap[key];
        if (newKey) {
          data2[newKey] = data2[key];
          delete data2[key];
        }
      };
      console.log(data2);
      const data = Object.assign(data1, data2);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  /* Creat the application in application collection */
  createApplication: async function createApplication(application) {
    try {
      const data = await client
        .db("findhome")
        .collection("application")
        .insertOne(application);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  /* Find the application by landlord in application collection */
  findApplicationsByLandlord: async function findApplicationsByLandlord(sub) {
    try {
      const data = await client
        .db("findhome")
        .collection("application")
        .find({ "landlord.sub": sub });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  /* Find the application by applicant in application collection */
  findApplicationsByApplicant: async function findApplicationsByApplicant(sub) {
    try {
      const data = await client
        .db("findhome")
        .collection("application")
        .find({ "applicant.sub": sub });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  /* Delete Application By ID in application collection */
  deleteApplicationById: async function deleteApplicationById(id) {
    try {
      const data = await client
        .db("findhome")
        .collection("application")
        .deleteOne({ _id: ObjectId(id) });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
