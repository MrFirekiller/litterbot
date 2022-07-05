import React, { useState, useEffect } from "react"
import { FaArrowLeft } from "react-icons/fa"

import Button from "../components/Button"

const Login = ({ onBackClick, onSignUpClick, setProfile, dayMode }) => {
    const [submitLabel, setSubmitLabel] = useState("Log In")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    useEffect(() => {
        sessionStorage.setItem("page", "login")
    })

    const onSubmit = (e) => {
        e.preventDefault()

        if (!username) {
            setUsernameError("Please enter a username")
            return
        }
        
        if (!password) {
            setPasswordError("Please enter a password")
            return
        }

        fetch(`/login?username=${username}&password=${password}`).then(res => res.json()).then(data => {
            if (data.access !== "granted") {
                setSubmitLabel("The username or password is incorrect\nPlease try again")
            } else {
                setProfile(username)
                localStorage.setItem("profile", username)
                onBackClick()
            }
        })
    }

    return (
        <>
            <div className = "bar" style = {{ marginTop : "2px" }}>
                <FaArrowLeft onClick = {onBackClick} size = "35px" cursor = "pointer"/>
                <h1 style = {{ marginLeft : "230px" }}>Please enter your username and password</h1>
                <Button text = {"Don't have an account?"} onClick = {onSignUpClick} dayMode = {dayMode}/>
            </div>

            <form className = "container" onSubmit = {onSubmit}>
                <div className = "form-control">
                    <label>Username</label>
                    <input type = "text" placeholder = "Username" value = {username} onChange = {(e) => setUsername(e.target.value)}/>
                    <p>{usernameError}</p>
                </div>
                <div className = "form-control">
                    <label>Password</label>
                    <input type = "text" placeholder = "Password" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                    <p>{passwordError}</p>
                </div>

                <input type = "submit" value = {submitLabel} className = {`btn btn-block ${dayMode ? "light-mode": ""}`} style = {{ cursor : "pointer" }}/>
            </form>
        </>
    )
}

export default Login
