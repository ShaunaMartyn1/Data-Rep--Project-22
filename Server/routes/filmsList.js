const router = require('express').Router()
//import films model 
const filmsListModel = require('../models/filmsList')


//first root - add films to the database 
router.post('api/film', async (req, res)=> {
    try{
        const newFilm = new filmsListModel({
            film: req.body.film
        })
        //save this film in the database
        const saveFilm = await newFilm.save()
        res.status(200).json('saveFilm')
    }catch(err){
        res.json(err)
    }
})

//second route get data from database
router.get('/api/films', async (req, res)=>{//film of films 
    try{
        const allFilmItems = await filmsListModel.find({})
        res.status(200).json(allFilmItems)//check name of this
    }catch(err){
        res.json(err)
    }
})

//Update film
router.put('/api/film/:id', async (req, res)=>{
    try{
        //find the item by its id and update it 
        const updateFilm = await filmsListModel.findByIdAndUpdate(req.param.id,{$set: req.body})
        res.status(200).json('Film Updated')
    }catch(err){
        res.json(err)
    }
})


//DElete from the database
router.delete('/api/film/:id', async (req, res)=>{
    try{
        //find item ny its id and delete it 
        const deletItem = await filmsListModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Item Deleted')
    }catch(err){
        res.json(err)
    }
})
//export router
module.exports = router