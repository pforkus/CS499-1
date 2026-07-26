const Item = require('../models/item');
const cloudinary = require('../config/cloudinary');

// GET: /items - Gets all items
const getItems = async (req, res) => {
    
  try {
    let { search, category, sort, order, page, limit } = req.query;

    let query = {};

    // Sanitizes data to avoid duplicates
    search = search?.trim();
    category = category?.trim();

    // SEARCH
    if (search) {
      query.name = new RegExp(search, 'i');
    }

    // FILTER 
    if (category) {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    let dbQuery = Item.find(query);

    // SORTING
    if (sort) {
      const sortOption = {};
      sortOption[sort] = order === 'desc' ? -1 : 1;
      dbQuery = dbQuery.sort(sortOption);
    }

    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 20;
    dbQuery = dbQuery.skip((pageNum - 1) * pageSize).limit(pageSize);

    const [items, total] = await Promise.all([
      dbQuery,
      Item.countDocuments(query)
    ]);

    res.json({
      items,
      pagination: { page: pageNum, limit: pageSize, total, pages: Math.ceil(total / pageSize) }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: api/items/names - Gets all item names
const getAllNames = async (req, res) => {
  try {
    const items = await Item.find({}, 'name');
    const names = items.map(item => item.name);
    res.json(names);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: api/items/{id} - Single delete
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Delete image from Cloudinary, if it exists
    if(item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId);
    }

    await Item.findByIdAndDelete(id);

    res.json({ deleted: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: api/items/delete-many - Batch delete
const deleteItems = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids must be a non-empty array' });
    }

    const items = await Item.find({ _id: {$in: ids}});

    // Delete images from Cloudinary, if they exist
    for (const item of items) { 
      if(item.imagePublicId){
        await cloudinary.uploader.destroy(item.imagePublicId);
      }
    }

    const result = await Item.deleteMany({ _id: { $in: ids } });

    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: api/items/{id} - Gets specific item by id
const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if(!item) {
      return res.status(404).json({error: "Item not found"});
    }
    res.json(item);
  } catch(err) {
    res.status(500).json({error: err.message});
  }
};

// GET: api/items/categories - Gets all categories listed in entries
const getCategories = async (req, res) => {
  try {
    const categories = await Item.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({error: err.message})
  }
};

// PUT: api/items/{id} - Update an item by ID
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Item.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',          
      runValidators: true  
    });

    if (!updated) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: api/items - Create an item and add to database
const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
    getItems,
    getItem,
    deleteItem,
    deleteItems,
    getCategories, 
    updateItem,
    createItem,
    getAllNames
};