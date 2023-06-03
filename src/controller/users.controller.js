const Io = require("../io/io");
const Joi = require("joi");

const users = new Io("./database/users.json");
const Regist = require("../models/users.model");

const register = async (req, res) => {
  try {
    console.log(`register is working on shahruz `);
    const { username, password } = req.body;

    const schema = Joi.object({
      username: Joi.string().alphanum().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    })

   const {error} = schema.validate({username,password})
   if(error) return res.status(400).json({message: error.message})
   res.status(200).json({message:"success"})


    const todo = await users.read();
    const user = todo.find((user) => user.username === username);
    // console.log(user);

    if (!user) {
      const id = (todo[todo.length - 1]?.id || 0) + 1;
      const newUser = new Regist(username, password, id);
      const data = todo.length ? [...todo, newUser] : [newUser];
      await users.write(data, id);

      res.status(201).json({ message: "success" });
    } else {
      res.status(404).json({ message: "this user is already registered" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  console.log(`login is working on`);
  const { username, password } = req.body;

  const todo = await users.read();
  const user = todo.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res
      .status(201)
      .json({ message: "you are successfully log in your profil" });
  } else {
    res.status(201).json({ message: "login or password is wrong" });
  }
};

module.exports = {
  register,
  login,
};
