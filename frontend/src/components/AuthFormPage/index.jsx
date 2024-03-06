import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signUp, logIn } from "../../../utils/backend"
import './styles.css'

export default function AuthFormPage({ setLoginStatus }) {
    const { formType } = useParams()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        category: "",
    });

    async function handleSubmit(event) {
        event.preventDefault()
        if (formType === 'login') {
            try {
                const userCredentials = await logIn(formData)
                localStorage.setItem('userToken', userCredentials.token)
                localStorage.setItem('userCategory', userCredentials.category)
                setLoginStatus(true)
                navigate('/')
            } catch(error) {
                alert(error)
                navigate('/auth/login')
            }
        } else {
            try {
                const userCredentials = await signUp(formData)
                localStorage.setItem('userToken', userCredentials.token)
                localStorage.setItem('userCategory', userCredentials.category)
                setLoginStatus(true)
                navigate('/')
            } catch(error) {
                alert(error) 
                navigate('/auth/login')
            }
        }
    }

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    let actionText;
    formType === 'login' ? actionText = 'Log In' : actionText = 'Sign Up'
    let signupFields;
    if (formType !== 'login') {
        signupFields = 
            <div>
                <div className="auth-div">
                    <label className="block text-gray-100 font-bold mb-2" htmlFor="email">
                        First name
                    </label>
                    <input
                        className="w-full p-2 text-gray-800 rounded-md focus:outline-none focus:ring focus:border-blue-600 text-gray-200"
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        placeholder="Your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="auth-div">
                    <label className="block text-gray-00 font-bold mb-2" htmlFor="email">
                        Last name
                    </label>
                    <input
                        className="w-full p-2 text-gray-800 rounded-md focus:outline-none focus:ring focus:border-blue-600 text-gray-200"
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        placeholder="Your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <p className='auth-p text-center'>Are you planning to buy or sell a home?</p>
                <table className="auth-table text-gray-100">
                    <tbody>
                        <tr>
                            <td><input
                                id="categoryBuyer"
                                name="category"
                                type="radio"
                                required
                                value="buyer"
                                onChange={handleInputChange}
                            /></td>
                            <td><label htmlFor="categoryBuyer" className="text-gray-200">Buy</label></td>
                        </tr>
                        <tr>
                            <td><input
                                id="categorySeller"
                                name="category"
                                type="radio"
                                required
                                value="seller"
                                onChange={handleInputChange}
                            /></td>
                            <td><label htmlFor="categoryBuyer" className="text-gray-200">Sell</label></td>
                        </tr>
                    </tbody>
                </table>
            </div>
    }
    return (
        <div className="py-12">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md mx-auto grid place-items-center">
                <h2 className="text-3xl text-center font-bold text-gray-100 mb-8">{actionText}</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-div">
                        <label className="block text-gray-100 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full p-2 text-gray-800 rounded-md focus:outline-none focus:ring focus:border-blue-600"
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="auth-div">
                        <label className="block text-gray-100 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full p-2 text-gray-800 rounded-md focus:outline-none focus:ring focus:border-blue-600"
                            id="password"
                            name="password"
                            type="password"
                            minLength="6"
                            required
                            placeholder="Password"
                            value={formData.password}
                            onChange
                            ={handleInputChange}
                        />
                    </div>
                    {signupFields}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-1/2 my-5 py-2 px-4 bg-green-700 text-gray-100 rounded-md hover:bg-green-500 transition duration-300">
                            {actionText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}