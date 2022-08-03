const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID, // Crea un identificador unico (letras y numeros)
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    heightMin : { 
      type: DataTypes.INTEGER,
      allowNull: false,   
  },

    heightMax : { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weightMin : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weightMax : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    lifespan : {
      type: DataTypes.STRING,
    },

    image : {
      type: DataTypes.STRING(3000),
      allowNull: true
    },

    createdInDb : {                 // Se usa para el filtrado de los creados y la API
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },{timestamps: false}); 
};