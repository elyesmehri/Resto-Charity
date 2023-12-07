const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  date: { type: Date, required: true },
  adresse: { type: String, required: true },
  numero_tel: { type: String, required: true },
  mot_de_passe: { type: String, required: true },
  // ... other fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;