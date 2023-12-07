const yup = require("yup");

const validate = async (req, res, next) => {

  try {

    const Schema = yup.object().shape({
     
      nom          : yup.string().required(),
      prenom       : yup.string().required(),
      mot_de_passe: yup
      .string()
      .required("Le mot de passe est requis.")
      .max(8, "Le mot de passe ne doit pas dépasser 8 caractères.")
      .matches("/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/",
                "Le mot de passe doit contenir au moins un caractère spécial."),
      numero_tel: yup
      .string()
      .required("Le numero de tel est requis.")
      .max(8, "Le numero de tel ne doit pas dépasser 8 caractères.")
      .matches(/^\d{8}$/, 'Phone number should have 8 digits'),
          
});
    
    await Schema.validate(req.body);
    next();

  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

module.exports = validate;
