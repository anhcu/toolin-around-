// Creates User model.
// Includes id, name, email, password, and neighborhood_id

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // INSTANCE METHOD FOR CHECKING USER'S PASSWORD AGAINST HASHED DB PASSWORD
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
    // FOREIGN KEY FROM NEIGHBORHOOD MODEL
    neighborhood_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'neighborhood',
        key: 'id',
      },
    },
  },
  {
    hooks: {
      // BEFORE CREATING A NEW USER IN DB, HASH THEIR PASSWORD
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// EXPORT THE USER MODEL FOR USE IN ROUTES
module.exports = User;
