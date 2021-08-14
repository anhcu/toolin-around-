// Sets up model associations

// BRING IN USER, CATEGORY, NEIGHBORHOOD AND TOOL MODELS
const User = require('./User');
const Category = require('./Category');
const Neighborhood = require('./Neighborhood');
const Tool = require('./Tool');

User.belongsTo(Neighborhood, {
    foreignKey: 'neighborhood_id',
});

Neighborhood.hasMany(User, {
    foreignKey: 'neighborhood_id',
});

User.hasMany(Tool, {
    foreignKey: 'user_id',
});

Tool.belongsTo(User, {
    foreignKey: 'user_id', 
});

Category.hasMany(Tool, {
    foreignKey: 'category_id',
});

Tool.belongsTo(Category, {
    foreignKey: 'category_id',
});

// EXPORT USER, POST, AND COMMENT MODELS FOR USE IN ROUTES
module.exports = { User, Category, Neighborhood, Tool };
