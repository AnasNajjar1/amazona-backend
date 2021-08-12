const bcrypt = require('bcryptjs');

const data = {
    users: [
        {
            name: 'Anas',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234567', 8),
            isAdmin: true
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234567', 8),
            isAdmin: false
        }
    ],
    products: [
        {
            name: 'Nike Slim Shirt',
            category: '61150ba7b737d10015f84d63',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: 'Adidas Fit Shirt',
            category: '61150ba7b737d10015f84d63',
            image: '/images/p2.jpg',
            price: 100,
            countInStock: 20,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: 'Lacoste Slim Shirt',
            category: '61150ba7b737d10015f84d63',
            image: '/images/p3.jpg',
            price: 220,
            countInStock: 0,
            brand: 'Lacoste',
            rating: 4.8,
            numReviews: 17,
            description: 'high quality product'
        },
        {
            name: 'Nike Slim Pant',
            category: '61150b71b737d10015f84d62',
            image: '/images/p4.jpg',
            price: 78,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description: 'high quality product'
        },
        {
            name: 'Puma Slim Pant',
            category: '61150b71b737d10015f84d62',
            image: '/images/p5.jpg',
            price: 65,
            countInStock: 5,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            name: 'Adidas Fit Pant',
            category: '61150b71b737d10015f84d62',
            image: '/images/p6.jpg',
            price: 139,
            countInStock: 12,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'
        }
    ],
    categories: [
        {
            name: 'Sample Category',
            image: '/images/p1.jpg',
        },
        {
            name: 'Sample Category 1',
            image: '/images/p1.jpg',
        },
    ]
}

module.exports = data;