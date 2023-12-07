// controllers/usersController.js
const User = require('../model/user_model');

async function addOne(req, res, next) {

    try {
      const user = new User(req.body);
      await user.save();
      res.send("user added");
    } catch (err) {
      console.log(err);
      res.status(400).send(err.message); // Send a 400 Bad Request response with the error message
    }
}


async function checkClient (data) {

  const __nom = data.nom;
  const __mot_de_passe = data.mot_de_passe;

  console.log("le nom est : " + __nom);
  console.log("le mot de passe est : " + __mot_de_passe);

  console.log("client is : " + JSON.stringify(data));

  try {
      // Use the User model to find a user in the database
      const user = await User.findOne({ nom: __nom, mot_de_passe: __mot_de_passe });

      if (user) {
          // User exists, you can perform other actions (e.g., set session, generate token)
          console.log('Sign in successful'); // Log the success message

          return true;
      } else {
          // User doesn't exist, you can handle this case accordingly
          console.log('User not found');
          return false;
      }
  } catch (err) {
      console.log(err);
      // Handle the error case
      res.status(500).send('Internal Server Error'); // Example error response
      // return false;
  }
}

async function addclientsocket(data) {

  try {

     const user = new User({

      nom           : data.nom,
      prenom        : data.prenom,
      date          : data.date,
      adresse       : data.adresse,
      numero_tel    : data.numero_tel,
      mot_de_passe  : data.mot_de_passe,

    });

    console.log("client is : " + JSON.stringify(data));
    
    await user.save();
    //res.status(200).send("add good partie");
  } catch (err) {
    console.log(err);
  }
}  

async function showAll (req, res, next) {

    try {
      const data = await User.find();
      res.json(data);
    } catch (err) {
      console.log(err);
    }
}
  
async function updatebyname (req, res, next) {

  const nom = req.params.nom; // Assuming nom is the parameter in the route

  try {
      const data = await User.findOneAndUpdate ({nom}, req.body, { new: true });
      res.send("updated");
      res.json (data);
    } catch (err) {
      console.log(err);
    }
}

async function showbyname (req, res, next) {

  const nom = req.params.nom; // Assuming nom is the parameter in the route

    try {
      const data = await User.findOne ({nom});
      res.json(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
}

async function deletebyname (req, res, next) {

  const nom = req.params.nom; // Assuming nom is the parameter in the route

  try {
      const data = await User.findOneAndDelete ({nom});
      res.send("deleted");
    } catch (err) {
      console.log(err);
    }
}

async function deleteAll(req, res, next) {

  try {
      const result = await User.deleteMany();

      // Check the result to determine if any documents were deleted
      if (result.deletedCount > 0) {
        res.send("All clients have been deleted.");
      } else {
        res.send("No clients found to delete.");
      }
    } catch (err) {
      console.error(err);
    
      res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function countUsers(req, res, next) {

  try {
        const userCount = await User.countDocuments();

        if (userCount === null) {
          throw new Error('User count is null.');
        }
        
        res.json({ userCount });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



module.exports = {

    addOne,
    showAll,
    updatebyname,
    deletebyname,
    showbyname,
    deleteAll,
    countUsers,
    addclientsocket,
    checkClient
};
