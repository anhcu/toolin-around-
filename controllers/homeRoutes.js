// Contains all of the get routing logic to pull information from the database

// BRING IN EXPRESS ROUTER, SEQUELIZE OP, WITHAUTH MIDDLEWARE, AND ALL MODELS
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Category, Neighborhood, Tool } = require('../models');
const { Op } = require("sequelize");

// GET ALL CATEGORIES FOR HOMEPAGE
router.get('/', async (req, res) => {
  try {
    // FIND ALL CATEGORIES IN DB
    const dbCategoryData = await Category.findAll({});

    // SERIALIZE ALL CATEGORY DATA
    const categories = dbCategoryData.map((category) =>
    category.get({ plain: true })
    );
    
    // RENDER HOMEPAGE
    res.render('homepage', {
      categories,
      logged_in: req.session.logged_in,
      neighborhood_name: req.session.neighborhood_name,
      user_name: req.session.user_name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET ALL TOOLS IN YOUR NEIGHBORHOOD IN ONE CATEGORY
// Use the custom middleware before allowing the user to access
router.get('/category/:id', withAuth, async (req, res) => {
  try {
    // FIND ALL TOOLS BY CATEGORY ID
    const toolData = await Tool.findAll({
      where: {
        category_id: req.params.id,
        // BUT NOT THE LOGGED IN USER'S OWN TOOLS
        [Op.not]: [
          {
            user_id: [req.session.user_id]
          }
        ],
      },
      // WHERE THE TOOLS ARE IN THE LOGGED IN USER'S NEIGHBORHOOD
      include: [
        {
          model: User,
          attributes: ['name', 'neighborhood_id'],
          where: {
            neighborhood_id: req.session.neighborhood_id,
          }
        },
        {
          model: Category,
          attributes: ['name','class'],
        },
      ],
    }); 

    // IF THERE AREN'T TOOLS IN THAT CATEGORY IN THAT NEIGHBORHOOD
    if(!toolData.length) {
      // CREATE NEW SESSION VARIABLE TO FLAG FOR NO TOOLS
      req.session.no_tools = true;
    } else {
      req.session.no_tools = false;
    }

    // SERIALIZE ALL TOOL DATA
    const tools = await toolData.map((tool) =>
    tool.get({ plain: true })
    );  

    // FIND CATEGORY NAME, FOR RENDERING PAGE WHEN NO TOOLS FOUND
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['name'],
    });

    // SERIALIZE CATEGORY DATA
    const category = await categoryData.get({ plain: true });

    // RENDER SINGLE CATEGORY HANDLEBARS
    res.render('category', { 
      tools,
      category,
      logged_in: req.session.logged_in,
      neighborhood_name: req.session.neighborhood_name,
      no_tools: req.session.no_tools,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET ONE TOOL BY TOOL ID
// Use the custom middleware before allowing the user to access the tool
router.get('/tools/:id', withAuth, async (req, res) => {
  try {
    // FIND THE TOOL BY TOOL ID
    const dbToolData = await Tool.findByPk(req.params.id, {
      // Include the tool's user name and id
      // Include the tool's category name & icon class
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
        },
        {
          model: Category,
          attributes: ['name', 'class'],
        },
      ],
    });

    // SERIALIZE TOOL DATA
    const tool = dbToolData.get({ plain: true });

    // CHECK IF TOOL IS THE CURRENT LOGGED IN USER'S TOOL
    if(tool.user_id === req.session.user_id) {
      // CREATES A SESSION PARAMETER TO FLAG FOR USER'S TOOL IN HANDLBARS
      req.session.user_tool = true;
    } else {
      req.session.user_tool = false;
    }

    // RENDER TOOL HANDLEBARS TEMPLATE
    res.render('tool', { 
      tool,
      user_tool: req.session.user_tool, 
      logged_in: req.session.logged_in,
      neighborhood_name: req.session.neighborhood_name
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET THE LOGIN PAGE
router.get('/login', (req, res) => {
  res.render('login');
});

// GET THE UPDATE TOOL PAGE
router.get('/update-tool/:id', async (req, res) => {
  // GET THE TOOL BY TOOL ID
  const toolData = await Tool.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });

  // SERIALIZE TOOL DATA
  const tool = toolData.get ({ plain: true});
  
  // RENDER THE UPDATE TOOL HANDLEBARS TEMPLATE
  res.render('update-tool', {
    tool,
    logged_in: req.session.logged_in,
    neighborhood_name: req.session.neighborhood_name,
  });
});

// GET THE "MY TOOLBOX" PAGE
router.get('/toolbox', withAuth, async (req, res) => {
  try {
    // Find all tools from the logged in user
    // And include user's name from association of user model to post model
    // Include the tool's category name & icon class
    const toolData = await Tool.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Category,
          attributes: ['name','class'],
        },
      ],
    });

    // Serialize all tool data
    const tools = toolData.map((tool) => tool.get({ plain: true }));

    // Render the user's dashboard with tools and session parameters for template
    res.render('toolbox', { 
      tools, 
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      neighborhood_name: req.session.neighborhood_name,
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET the create a new tool page
router.get('/tools', withAuth, async (req, res) => {
  try {
    // Find all tools in database
    const toolData = await Tool.findAll({});

    // Serialize all tool data
    const tools = toolData.map((xxx) => xxx.get({ plain: true }));

    // Render the Add a Tool form page
    res.render('new-tool', { 
      tools, 
      logged_in: req.session.logged_in,
      neighborhood_name: req.session.neighborhood_name
    
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get searched tools
router.get('/:search', withAuth, async (req, res) => {
  try {
    // Create a parameter from search term
    const search = req.params.search;
    
    // Find all tools where the search term is in the tool name or description
    const toolData = await Tool.findAll({
      where: {
          [Op.or]: [
          {
            name: {
              [Op.substring]: '%' + search + '%'
            }
          },
          {
            description: {
              [Op.substring]: '%' + search + '%'
            }
          },
        ],
      },
      // Include the tool's category name & icon class
      // Include the tool's user's name and neighborhood id
      include: [
        {
          model: Category,
          attributes: ['name', 'class']
        },
        {
          model: User,
          attributes: ['name', 'neighborhood_id'],
          include: [
            {
              model: Neighborhood,
              attributes: ['name'],
            },
          ],
        },
      ],
      // Order the results by the neighborhood name
      order: [
        [User, Neighborhood, 'name', 'ASC'],
      ],
    });

    // Check if there are any search results
    if(!toolData.length) {
      // Create new session parameter to flag for no search results
      req.session.no_results = true;
    } else {
      req.session.no_results = false;
    }

    // Serialize all tool data
    const tools = await toolData.map((tool) =>
    tool.get({ plain: true })
    );

    // Render the searchedtools handlebars template
    res.render('searchedtools', { 
      tools, 
      logged_in: req.session.logged_in, 
      neighborhood_name: req.session.neighborhood_name,
      no_results: req.session.no_results,
      search
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get one user's tools by id
router.get('/user/:id', withAuth, async (req, res) => {
  try {
    // Find all tools by user id
    const toolData = await Tool.findAll({
      where: {
        user_id: req.params.id,
      },
      // Include the tool's user name & neighborhood id
      // Include the tool's category name & icon class
      include: [
        {
          model: User,
          attributes: ['name', 'neighborhood_id'],
        },
        {
          model: Category,
          attributes: ['name','class'],
        },
      ],
    }); 

    // Serialize all tool data
    const tools = await toolData.map((tool) =>
    tool.get({ plain: true })
    );

    // Render the user handlebars template
    res.render('user', { 
      tools, 
      logged_in: req.session.logged_in,
      neighborhood_name: req.session.neighborhood_name
     });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all tools in a neighborhood
router.get('/neighborhood/:neighborhood', withAuth, async (req, res) => {
  try {
    // Find all tools whose user has the specified neighborhood id
    const toolData = await Tool.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'neighborhood_id'],
          where: {
            neighborhood_id: req.session.neighborhood_id,
          },
        },
        // Include the tool's category name and icon class
        {
          model: Category,
          attributes: ['name', 'class'],
        }
      ],
    }); 

    // Serialize all tool data
    const tools = await toolData.map((tool) =>
    tool.get({ plain: true })
    );

    // Render the neighborhood handlebars template
    res.render('neighborhood', { 
      tools, 
      logged_in: req.session.logged_in,
      neighborhood_name: req.session.neighborhood_name,
     });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// EXPORT ROUTER
module.exports = router;
