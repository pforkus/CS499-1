require("dotenv").config();
const Mongoose = require('./db');
const Item = require('./item');

console.log(process.env.MONGO_URI);
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
    },
    {
        sku: "CHK-001",
        name: "chicken breast",
        quantity: 28,
        price: 6.99,
        category: "meat"
    },
    {
        sku: "BEF-001",
        name: "ground beef",
        quantity: 18,
        price: 5.49,
        category: "meat"
    },
    {
        sku: "SAL-001",
        name: "salmon fillet",
        quantity: 14,
        price: 10.99,
        category: "seafood"
    },
    {
        sku: "TUN-001",
        name: "canned tuna",
        quantity: 55,
        price: 1.89,
        category: "seafood"
    },
    {
        sku: "BRD-001",
        name: "white bread",
        quantity: 32,
        price: 2.49,
        category: "bakery"
    },
    {
        sku: "BGL-001",
        name: "bagels",
        quantity: 20,
        price: 3.29,
        category: "bakery"
    },
    {
        sku: "ORG-001",
        name: "orange",
        quantity: 52,
        price: 0.89,
        category: "produce"
    },
    {
        sku: "SPN-001",
        name: "spinach",
        quantity: 24,
        price: 2.19,
        category: "produce"
    },
    {
        sku: "PTT-001",
        name: "potato",
        quantity: 80,
        price: 0.69,
        category: "produce"
    },
    {
        sku: "YGT-001",
        name: "yogurt",
        quantity: 27,
        price: 1.19,
        category: "dairy"
    },
    {
        sku: "BTR-001",
        name: "butter",
        quantity: 16,
        price: 4.29,
        category: "dairy"
    },
    {
        sku: "CER-001",
        name: "cereal",
        quantity: 38,
        price: 3.99,
        category: "pantry"
    },
    {
        sku: "BNS-001",
        name: "black beans",
        quantity: 64,
        price: 1.39,
        category: "pantry"
    },
    {
        sku: "COF-001",
        name: "coffee",
        quantity: 22,
        price: 8.99,
        category: "beverages"
    },
    {
        sku: "JCE-001",
        name: "orange juice",
        quantity: 19,
        price: 3.79,
        category: "beverages"
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