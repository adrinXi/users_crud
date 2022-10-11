import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UserCard from './components/UserCard'
import UsersForm from './components/UsersForm'

const baseURL = 'https://users-crud1.herokuapp.com'

function App() {

  const [users, setUsers] = useState()
  // este estado para pasar info de UserCard a UsersForm
  const [updateInfo, setUpdateInfo] = useState()
  // este es para cerrar el formulario
  const [formIsClose, setFormIsClose] = useState(true)

  // funcion para obtener todos los usuarios
  const getAllUsers = () => {
    const URL = `${baseURL}/users/`
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  // funcion para crear un nuevo usuario
  const createNewUser = data => {
    const URL = `${baseURL}/users/`
    axios.post(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  // para eliminar un elemento especifico
  const deleteUserById = id => {
    const URL = `${baseURL}/users/${id}/`
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  // funcion para actualizar un usuario en especifico
  const updateUserById = (id, data) => {
    const URL = `${baseURL}/users/${id}/`
    axios.patch(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  // funcion para abrir el formulario cambiando el estado a false
  const handleOpenForm = () => {
    setFormIsClose(false)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  console.log(users)

  return (
    <div className="App">
      <div className='app__container-title'>
        <h1 className='app__title'>User´s CRUD</h1>
        <button onClick={handleOpenForm} className='app__btn'>Create a New User</button>
      </div>
      <div className={`form-container ${formIsClose && 'disable__form-container'}`}>
        <UsersForm
          createNewUser={createNewUser}
          updateInfo={updateInfo}
          updateUserById={updateUserById}
          setUpdateInfo={setUpdateInfo}
          setFormIsClose={setFormIsClose}
        />
      </div>
      <div className='users-container'>
        {
          users?.map(user => (
            <UserCard
              key={user.id}
              user={user}
              deleteUserById={deleteUserById}
              setUpdateInfo={setUpdateInfo}
              setFormIsClose={setFormIsClose}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
