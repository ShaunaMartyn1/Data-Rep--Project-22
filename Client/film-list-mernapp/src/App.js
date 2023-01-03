import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import filmsList from '../../../Server/models/filmsList';

function App() {
  const [filmText, setFilmText] = useState('')
  const [listFilms, setListFilms] = useState([])
  const [isUpdating, setIsUpdating] = useState('')
  const [updateFilmText, setUpdateFilmText] = useState('')
  
  //add a film to the database
  const addFilm = async (e) => {
    e.preventDefault()
    try{
      const res =await axios.post('http://localhost:3001/api/film', {film: filmText})
      setListFilms(prev => [...prev, res.data])
      setFilmText('')
    }catch(err){
      console.log(err)
    }
  }

  //Get all films from the database 
  useEffect(()=>{
    const getFilmList = async () => {
      try{
        const res = await axios.get('http://localhost:3001/api/films')
        setListFilms(res.data)
        console.log('render')
      }catch(err){
        console.log(err)
      }
    }
    getFilmList()
  },[listFilms])
  
  //Delete film when clicked
  const deleteFilm = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:3001/api/film`)
      const newListFilms = listFilms.filter(film => film._id !== id)
      setListFilms(newListFilms)
    }catch(err){
    console.log(err)
  }
}
  //Update film - logs to concole
  const updateFilm = async (e) => {
    e.preventDefault()

    try{
      const res = await axios.put(`http://localhost:3001/api/film/${isUpdating}`, {film: updateFilmText})
      console.log(res.data)
      const updateFilmIndex = filmsList.findIndex(film => film.id === isUpdating)
      const updatedFilm = filmsList[updatedFilmIndex].film = updateFilmText
      setUpdateFilmText('')
      setIsUpdating('')
    }catch(err){
      console.log(err)
    }
  }
  //function that returns a form element and takes input
  const renderUpdateForm = () => (
    <form className="update-from" onSubmit={(e)=>{updateFilm(e)}}>
      <input className = "update-new-input" type="text" placeholder="New Film" onChange={e=>{setUpdateFilmText(e.target.value)}} value={updateFilmText}/>
      <button className = "update-new-btn" type="submit">Update</button>

    </form>
  )
  
  return (
    <div className="App">
      <h1>Film List</h1>
      <form className="form" onSubmit={ e => addFilm(e)}>
        <input type="text" placeholder='Add Film to the list' onChange={ e=> {setFilmText(e.target.value)} }value = {filmText} />
        <button type="submit">Add</button>
        </form>
        <div className="film-ListItems">
          {
            listFilms.map(film => (
              <div className="film-item">
                {
                  isUpdating === item._id
                  ? renderUpdateForm()
                  : <>
                  <p className="film-content">{film.film}</p>
                  <button className="update-film" onClick={()=>{setIsUpdating(film._id)}}>Update</button>
                  <button className="delete-film" onClick={()=>{deleteFilm(film._id)}}>Delete</button>
                  
                  </>
              }
              </div>
            ))
          }
          </div>
    </div>
    
  );
}

export default App;
