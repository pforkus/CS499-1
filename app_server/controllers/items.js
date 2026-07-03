const Item = require('../models/item');


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

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ deleted: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteItems = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids must be a non-empty array' });
    }

    const result = await Item.deleteMany({ _id: { $in: ids } });

    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getItems,
    deleteItem,
    deleteItems
};