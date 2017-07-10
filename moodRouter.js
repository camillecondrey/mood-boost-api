const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const {Mood} = require('./models');

const moodRouter = express.Router();

moodRouter.use(jsonParser);

moodRouter.get('/', passport.authenticate('basic', {session: false}), (req, res) => {

	Mood.find({
		user: req.user._id
	}).then(moods => {
		res.json(moods)
	});
	
});

moodRouter.get('/:id',  (req, res) => {
	Mood.findById(req.params.id).then(moods => {
		res.json(moods)
	});
	
});

moodRouter.post('/', passport.authenticate('basic', {session: false}), jsonParser, (req, res) => {
	const requiredFields = ['description'];
	for  (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	req.body.user = req.user._id

	const item = Mood.create(req.body);
	res.status(201).json(item);
})

moodRouter.put('/:id', (req, res) => {
	console.log(req.body);
	const requiredFields = ['name', '_id'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}

	if (req.params.id !== req.body._id) {
		const message = (
			`Request path id (${req.params.id}) and request body id (${req.body.id}) must match`);
		console.error(message);
		return res.status(400).send(message);
	}

	console.log(`Updating items \`${req.params.id}\``);
	
	Mood.update({ 
		_id: req.params.id }, { $set: req.body}, function(data) {
		console.log(data);
		res.sendStatus(204);
	});
	
});



moodRouter.delete('/:id', passport.authenticate('basic', {session: false}), (req, res) => {
	Mood.findOneAndRemove({
		_id: req.params.id},
		function() {
			res.sendStatus(204);
		});
	console.log('deleting selected list');
	
});


module.exports = {moodRouter};