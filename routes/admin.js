const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const router = Router();
const { Admin, Course } = require('../db');

// Admin Routes
router.post('/signup', (req, res) => {
	// Implement admin signup logic
	const username = req.body.username;
	const password = req.body.password;

	//checking if the username is already in the db
	Admin.create({
		username: username,
		password: password,
	})
		.then(() => {
			res.json({
				message: 'Admin created successfully',
			});
		})
		.catch(() => {
			res.json({
				message: 'Admin not created an error occured',
			});
		});
});

router.post('/courses', adminMiddleware, (req, res) => {
	// Implement course creation logic
	const title = req.body.title;
	const description = req.body.description;
	const price = req.body.price;
	const imageLink = req.body.imageLink;

	Course.create({
		title,
		description,
		price,
		imageLink,
	})
		.then((Course) => {
			res.json({
				msg: 'the course is created is succesfully',
				corseId: Course._id,
			});
		})
		.catch(function () {
			res.status(403).json({
				msg: 'some error occured',
			});
		});
});

router.get('/courses', adminMiddleware, (req, res) => {
	// Implement fetching all courses logic
	Course.find({}).then((response) => {
		res.json({
			courses: response,
		});
	});
});

module.exports = router;
