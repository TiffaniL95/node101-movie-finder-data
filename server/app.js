const express = require('express');
//establish dependencies
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config()


//create express server
const app = express();

//log each request with morgan dev format
app.use(morgan('dev'))

//create array of objects that will contain movie data
let movieData = [
    
]


app.get('/', (req, res) => {
    

    if(req.url[2] == 'i'){
        console.log('25 if i', req.query);
        
        for(let i = 0; i<movieData.length; i++){
                
                if(movieData[i]['imdbID'] == req.query.i){
                    console.log('30 if i', movieData[i]);

                    res.send(movieData[i]);
                    return
                }
            }

    } 
    
    if(req.url[2] == 't') {
        
        for(let j = 0; j<movieData.length; j++){           

            if(movieData[j]['Title'].toLowerCase() == req.query.t){
                console.log('46 if t', movieData[j]);

                res.send(movieData[j]);
                return
            }
        }
    }
        
        axios.get(`http://www.omdbapi.com/${req.url}&apikey=${process.env.API_KEY}`) 
        
        .then((response) => {
            // console.log(response.data)            
            let {Title, Year, imdbID} = response.data;
            console.log('new object', Title, Year, imdbID)
            
            movieData.push({Title, Year, imdbID});
            console.log('updated array', movieData);

            res.send({Title, Year, imdbID});
            })
    
        .catch((err) => {
            console.log(err)
        });

});

app.get('*', (req, res) => {
    res.send('Not Found')
});

//respond to repeat get requests with cached data


module.exports = app;

