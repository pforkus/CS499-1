const Mongoose = require('./db');
const Item = require('./item');


const items = [
    {
        sku: "APL-001",
        name: "apple",
        quantity: 50,
        price: 0.99,
        category: "produce",
        imageUrl: ""
    },
    {
        sku: "CAR-001",
        name: "carrot",
        quantity: 40,
        price: 0.49,
        category: "produce",
        imageUrl: ""
    },
    {
        sku: "MIL-001",
        name: "milk",
        quantity: 20,
        price: 2.99,
        category: "dairy",
        imageUrl: ""
    },
    {
        sku: "BRC-001",
        name: "broccoli",
        quantity: 30,
        price: 1.49,
        category: "produce",
        imageUrl: ""
    },
    {
        sku: "EGG-001",
        name: "eggs",
        quantity: 12,
        price: 3.49,
        category: "dairy",
        imageUrl: ""
    },
    {
        sku: "RCE-001",
        name: "rice",
        quantity: 100,
        price: 1.99,
        category: "grains",
        imageUrl: ""
    },
    {
        sku: "PST-001",
        name: "pasta",
        quantity: 60,
        price: 1.29,
        category: "grains",
        imageUrl: ""
    },
    {
        sku: "CHS-001",
        name: "cheese",
        quantity: 25,
        price: 4.99,
        category: "dairy",
        imageUrl: ""
    },
    {
        sku: "APL-002",
        name: "green apple",
        quantity: 35,
        price: 1.09,
        category: "produce",
        imageUrl: ""
    },
    {
        sku: "BNN-001",
        name: "banana",
        quantity: 45,
        price: 0.79,
        category: "produce",
        imageUrl: ""
    }
];

const seedDB = async () => {
    await Item.deleteMany({});
    await Item.insertMany(items);
};

seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});