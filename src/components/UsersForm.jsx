import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './styles/userForm.css'

const defaultValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday: ''
}

const UsersForm = ({ createNewUser, updateInfo, updateUserById, setUpdateInfo, setFormIsClose}) => {

    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        if(updateInfo) {
            reset(updateInfo)
        }
    }, [updateInfo])

    const submit = data => {
        if(updateInfo) {
            // update
            updateUserById(updateInfo.id, data)
            setUpdateInfo()
        }else {
            // create
            createNewUser(data)
        }
        reset(defaultValues)
        setFormIsClose(true)
    }

    const handleCloseForm = () => {
        setFormIsClose(true)
    }

    return (
        <form className='form' onSubmit={handleSubmit(submit)}>
            <i onClick={handleCloseForm} className="form-x fa-solid fa-xmark"></i>
            <h2 className='form__title'>{updateInfo ? 'Edit User' : 'New User'}</h2>
            <div className='form__div'>
                <label className='form__label' htmlFor="email">Email</label>
                <input className='form__input' placeholder='Enter your e-mail' type="email" id='email' {...register('email')} />
            </div>
            <div className='form__div'>
                <label className='form__label' htmlFor="password">Password</label>
                <input className='form__input' placeholder='Your password' type="password" id='password' {...register('password')} />
            </div>
            <div className='form__div'>
                <label className='form__label' htmlFor="first_name">First name</label>
                <input className='form__input' placeholder='Your first-name' type="text" id='first_name' {...register('first_name')} />
            </div>
            <div className='form__div'>
                <label className='form__label' htmlFor="last_name">Last name</label>
                <input className='form__input' placeholder='Your last-name' type="text" id='last_name' {...register('last_name')} />
            </div>
            <div className='form__div'>
                <label className='form__label' htmlFor="birthday">Birthday</label>
                <input className='form__input' type="date" id='birthday' {...register('birthday')} />
            </div>
            <button className='form__btn'>{updateInfo ? 'Update' : 'Create'}</button>
        </form>
    )
}

export default UsersForm