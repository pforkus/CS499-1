const Item = require('../models/item');
const cloudinary = require('../config/cloudinary');

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
    console.log("QUERY:", req.query);
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

// Single delete
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if(item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId);
    }

    await Item.findByIdAndDelete(id);

    res.json({ deleted: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Batch delete
const deleteItems = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids must be a non-empty array' });
    }

    // FIXME implement batch delete image id retrieval and deletion

    const result = await Item.deleteMany({ _id: { $in: ids } });

    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit Item
const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if(!item) {
      return status(404).json({error: err.message});
    }
    res.json(item);
  } catch(err) {
    res.status(500).json({error: err.message});
  }
};

// Get categories from current active database categories
const getCategories = async (req, res) => {
  try {
    const categories = await Item.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({error: err.message})
  }
};

// Update an item by ID
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

// Create an item and add to database
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
    createItem
};