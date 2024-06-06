const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db/index');

// User Routes
router.post('/signup', (req, res) => {
	// Implement user signup logic
	const username = req.body.username;
	const password = req.body.password;

	User.create({
		username,
		password,
	})
		.then(function () {
			res.json({
				msg: 'User signup is complete',
			});
		})
		.catch((err) => {
			res.status(200).json({
				msg: 'some Error occured while logging in',
				details: err,
			});
		});
});

router.get('/courses', async (req, res) => {
	// Implement listing all courses logic
	// const username = req.headers.username;
	// const password = req.headers.password;

	const response = await Course.find({});
	res.json({
		courses: response,
	});
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
	// Implement course purchase logic
	const courseId = req.params.courseId;
	const username = req.headers.username;

	User.updateOne(
		{
			username: username,
		}
			.then(() => {
				res.json({
					msg: 'your puchase is complete',
					$push: {
						purchasedCourses: courseId,
					},
				});
			})
			.catch(() => {
				res.json({
					msg: ' some error occured in user/courses error',
				});
			})
	);
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
	// Implement fetching purchased courses logic
	const username = req.headers.username;
	// const password = req.headers.password;

	User.findOne({
		username: username,
	})
		.then((user) => {
			return Course.find({ _id: { $in: user.purchasedCourses } });
		})
		.then((response) => {
			res.json({
				courses: response,
			});
		})
		.catch((err) => {
			res.status(500).json({
				msg: 'some error might have occuerd',
				details: err,
			});
		});
});

module.exports = router;
