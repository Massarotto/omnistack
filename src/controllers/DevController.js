const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils//parseStringAsArray');

//index, show, store, update, destroy

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();
        response.json(devs);
    },

    async store(request, response) {

    const { github_username, techs, latitude, longitude } = request.body;
    
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
        const responseAxios = await axios.get(`https://api.github.com/users/${github_username}`);

        const {name = login, avatar_url, bio} = responseAxios.data;

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates:  [longitude, latitude],
        }

        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location 
        })
        }

    response.json(dev);
}};