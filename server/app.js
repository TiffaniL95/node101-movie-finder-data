const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config()



const app = express();


app.use(morgan('dev'))


let movieData = [
    
]

let searchBy = {
    'i': 'imdbID',
    't': 'Title'
    }
    
    app.get('/', (req, res) => {
        
    
        for(let i = 0; i<movieData.length; i++){ 

            let query = searchBy[req.url[2]]
            let search = req.query.i || req.query.t

                if(movieData[i][query].toLowerCase() == search){
                    console.log('if statement')

                    res.send(movieData[i]);
                    return
                }
            }
    
        
        axios.get(`http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY}`) 
        
        .then((response) => {
            console.log('API')

            let {Title, Year, imdbID} = response.data;
            
            movieData.push({Title, Year, imdbID});

            res.send({Title, Year, imdbID});
        })
    
        .catch((err) => {
            console.log(err)
        });

});

app.get('*', (req, res) => {
    res.send('Not Found')
});



module.exports = app;

