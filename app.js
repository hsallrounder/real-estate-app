const express = require('express')
const app = express()
const path = require('path')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const session = require('express-session');
const User = require('./models/User');
const Property = require('./models/Property');
const { ObjectId } = require('mongodb');

const PORT = process.env.PORT || 8080
const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/Rentify_DB'


mongoose.connect(DB_URI).then(() => console.log('DB connected')).catch((err) => console.log(err));

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"))
app.set('trust proxy', 1)


app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))



app.get('/', (req, res) => {
    res.render('HomePage');
})

function isAuthenticated(req, res, next) {
    if (!req.session.user) res.redirect('/login');
    else {
        res.locals.user = req.session.user;
        next();
    };
}

app.get('/signup', async (req, res) => {
    if (req.session.email) {
        const user = await User.findOne({ 'email': req.session.email });
        if (user['type'] == 'seller') {
            res.redirect('/sellerProperties');
        } else {
            res.redirect('/viewProperties');
        }
    }
    else res.render('auth/SignUp', { email_err: '', fname: '', lname: '', email: '', password: '', phone: '', type: '' });
})

app.get('/login', async (req, res) => {
    if (req.session.email) {
        const user = await User.findOne({ 'email': req.session.email });
        if (user['type'] == 'seller') {
            res.redirect('/sellerProperties');
        } else {
            res.redirect('/viewProperties');
        }
    }
    else res.render('auth/login', { err: '', email: '', password: '' });
})


app.get('/viewProperties', isAuthenticated, async (req, res) => {
    try {
        const properties = await Property.find();
        res.render('templates/viewProperty.ejs', { properties });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
})


app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, phone, password, type } = req.body; // Destructure data from request body
    const saltRounds = 10;

    const user = await User.findOne({ email });
    if (user) {
        res.render('auth/SignUp', { email_err: 'User Already Exists.', fname: firstName, lname: lastName, email: email, password: '', phone: phone, type: type });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            type,
        });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        // res.status(500).send('Error creating user');
    }
});

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userObject = await User.findOne({ email });
    if (userObject && userObject.email == email) {
        try {
            const correctPassword = userObject.password;
            bcrypt.compare(password, correctPassword, function (err, result) {
                if (result == true) {
                    req.session.regenerate(function (err) {
                        if (err) next(err)
                        req.session.user = userObject.firstName;
                        req.session.email = userObject.email;
                        res.locals.user = userObject.firstName;
                        req.session.save(function (err) {
                            if (err) return next(err)
                            if (userObject['type'] == 'seller') {
                                res.redirect('/sellerProperties')
                            } else {
                                res.redirect('/viewProperties')
                            }
                        })
                    })
                }
                else {
                    res.render('auth/login', { err: 'Invalid email or password.', email: email, password: password });
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
    else {
        res.render('auth/login', { err: 'Invalid email or password.', email: email, password: password });
    }
})


app.get('/uploadProperties', isAuthenticated, (req, res) => {
    res.render('templates/UploadProperties.ejs');
})

app.get('/sellerProperties', isAuthenticated, async (req, res) => {
    try {
        const email = req.session.email;
        const properties = await Property.find({ 'seller_id': email });

        res.render('templates/SellerProperties.ejs', { properties });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});
app.post('/uploadProperties', async (req, res) => {
    try {
        const { areaName, plotSize, bedrooms, bathrooms, amenities } = req.body;


        // Validate data (optional, implement your own validation logic)
        if (!areaName || plotSize <= 0 || bedrooms < 0 || bathrooms < 0) {
            return res.status(400).json({ message: 'Invalid property details' });
        }

        // Create a new property object
        const newProperty = new Property({
            areaName,
            plotSize,
            bedrooms,
            bathrooms,
            amenities,
            seller_id: req.session.email,
        });

        await newProperty.save();

        res.redirect('/sellerProperties');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/editProperty', isAuthenticated, async (req, res) => {
    const id = req.query.id;
    const __id = new ObjectId(id);
    const property = await Property.find({ '_id': __id });
    const checkHotel = property[0].amenities.includes('hotel');
    const checkCollege = property[0].amenities.includes('college');
    const checkHospital = property[0].amenities.includes('hospital');

    res.render('templates/EditProperty.ejs', { areaName: property[0].areaName, plotSize: property[0].plotSize, bedrooms: property[0].plotSize, bathrooms: property[0].bathrooms, checkHotel, checkCollege, checkHospital });
});

app.get('/deleteProperty', isAuthenticated, async (req, res) => {
    const id = req.query.id;
    const __id = new ObjectId(id);
    await Property.deleteOne({ '_id': __id });
    res.redirect('/sellerProperties');
});

app.post('/properties/:propertyId/like', async (req, res) => {
    const email = req.session.email; 

    if (!email) {
        return res.status(400).json({ message: 'Missing user ID' });
    }

    try {
        const _id = new ObjectId(req.params.propertyId);
        const property = await Property.findById(_id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Check if user already liked the property
        if (property.likes.includes(email)) {
            return res.status(400).json({ message: 'You already liked this property' });
        }

        // Update likes array and save the property
        property.likes.push(email);


        if (property.dislikes.includes(email)) {
            property.dislikes = property.likes.filter(id => id !== email);
        }
        await property.save();

        res.redirect('/viewProperties');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/properties/:propertyId/dislike', async (req, res) => {
    const email  = req.session.email // Assuming user ID is sent in the request body

    if (!email) {
        return res.status(400).json({ message: 'Missing user ID' });
    }

    try {
        const _id = new ObjectId(req.params.propertyId);
        const property = await Property.findById(_id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Check if user already disliked the property
        if (property.dislikes.includes(email)) {
            return res.status(400).json({ message: 'You already disliked this property' });
        }

        // Update dislikes array and save the property
        property.dislikes.push(email);
        if (property.likes.includes(email)) {
            property.likes = property.likes.filter(id => id !== email);
        }
        await property.save();

        res.redirect('/viewProperties');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/logout', function (req, res, next) {
    req.session.user = null
    req.session.save(function (err) {
        if (err) next(err)
        req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/')
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`)
})