const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {

  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });

    // inlclude [0]???
    if(!categoryData) {
      res.status(404).json({message: "No category with that id was found"});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({message: "No category with that id was found"});
    return;
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = req.body;
    const categoryData = await Category.create(newCategory);
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(400).json(err);
    return;
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const userData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if (!userData[0]) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const userData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })

   if(!userData) {
    res.status(404).json({ message: 'No category with this id!' });
      return;
   } 
  res.status(200).json(userData);
  } catch (err) {
res.status(500).json(err);
  }
});

module.exports = router;
