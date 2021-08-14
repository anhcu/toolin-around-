// Has all of the routing logic for creating, updating, or deleting a tool

// BRING IN EXPRESS ROUTER AND TOOL MODEL
const router = require('express').Router();
const { Tool } = require('../../models');
const withAuth = require('../../utils/auth');

// ROUTE FOR CREATING A NEW TOOL
router.post('/', async (req, res) => {
  try {
    // CREATE AN INSTANCE OF TOOL WITH THE FORM DATA
    const newTool = await Tool.create({
        name: req.body.name,
        description: req.body.description,
        user_id: req.session.user_id,
        category_id: req.body.category_id
    });
      
  res.status(200).json(newTool);
  } catch (err) {
      res.status(400).json(err);
  }
});

// ROUTE FOR DELETING A TOOL
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // DESTROY THE TOOL WITH THAT ID
    const toolData = Tool.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

  if(toolData) {        
      res.status(200).end()
  } else{
      res.status(404).end()
  }}
  catch (err){
      res.status(500).json(err)
  }
});

// ROUTE FOR UPDATING A TOOL
router.put('/:id', withAuth, async (req, res) => {
  try {
    // UPDATE A TOOL BY THAT ID WITH THE FORM DATA
    const toolData = await Tool.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    
    if (toolData){
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  }catch (err) {
    res.status(500).json(err)
  }
});

// EXPORT ROUTER
module.exports = router;