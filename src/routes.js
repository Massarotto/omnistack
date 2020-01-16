const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

routes.post('/devs',  async (request, response) => {
    console.log(request.body);
    const { github_username, techs, latitude, longitude } = request.body;
    
    const responseAxios = await axios.get(`https://api.github.com/users/${github_username}`);

    const {name = login, avatar_url, bio} = responseAxios.data;

    const techsArray = techs.split(',').map(tech => tech.trim());

    const coordinates = {
        type: 'Point',
        coordinates:  [longitude, latitude],
    }

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        coordinates
    })

    console.log(name, avatar_url, bio, github_username);

    response.json(dev);
});

module.exports = routes;