const mongoose = require('mongoose');
const { number } = require('yargs');

// Connect to MongoDB
mongoose.connect(
	'mongodb+srv://admin:7uP7XzQTV1ryT8Dj@cluster0.5godjds.mongodb.net/your-mongodb-url'
);

// Define schemas
const AdminSchema = new mongoose.Schema({
	// Schema definition here
	username: { type: String, required: true },
	password: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
	// Schema definition here
	username: { type: String, required: true },
	password: { type: String, required: true },
	purchasedCourses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Course',
		},
	],
});

const CourseSchema = new mongoose.Schema({
	// Schema definition here
	title: { type: String, required: true },
	description: { type: String, required: true },
	imageLink: { type: String, required: true },
	price: { type: Number, required: true },
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
	Admin,
	User,
	Course,
};
