/* 
 * 
 * Import React, as well as the useEffect and useState hooks. useEffect is called when the Menu component is loaded,
 * and the useState hook is used to store a variables value, despite the nature of React, where value changes are not remembered
 * one the component is reloaded.
 * 
 */
import React, { useEffect, useState } from "react"

// A Timer component
const Timer = ({ actionOnTimeUp, setInstructions, extra, timerNo, profile }) => {
    // A method to format the time in seconds to minutes and seconds
    const formatTime = (secs) => {
        let mins_left = Math.floor(secs / 60)
        let secs_left = secs % 60
        return (mins_left + " minute(s) and " + secs_left + " second(s) left" + extra)
    }

    // The time left on the timer and a method to set it.
    const [timeLeft, setTimeLeft] = useState("5 minutes left")
    let intTimeLeft = 300

    const onCount = () => {
        // Set the time left as the time left - 1.
        intTimeLeft--
        setTimeLeft(formatTime(intTimeLeft))

        // If time is up, do the instructed action and reset the timer.
        if (intTimeLeft <= 0) {
            actionOnTimeUp()
            setInstructions("You ran out of time. Please leave this page and come back.")
            if (timerNo === "1") {
                localStorage.setItem("reportCooldown" + profile, false)
            } else {
                localStorage.removeItem("secsLeft" + profile + timerNo)
            }
        }
    }

    // Starts the timer when the component is loaded.
    useEffect(() => {
        if (timerNo === "1") {
            intTimeLeft = localStorage.getItem("secsLeft" + profile + timerNo) !== null && !isNaN(localStorage.getItem("secsLeft" + profile + timerNo)) && localStorage.getItem("secsLeft" + profile + timerNo) !== undefined && !(localStorage.getItem("secsLeft" + profile + timerNo) <= 0) ? (localStorage.getItem("secsLeft" + profile + timerNo) - new Date().getSeconds() - localStorage.getItem("secsLeft" + profile + timerNo)) : 300
        } else {
            intTimeLeft = sessionStorage.getItem("secsLeft" + profile + timerNo) !== null && isNaN(sessionStorage.getItem("secsLeft" + profile + timerNo)) && sessionStorage.getItem("secsLeft" + profile + timerNo) !== undefined && !(sessionStorage.getItem("secsLeft" + profile + timerNo) <= 0) ? (sessionStorage.getItem("secsLeft" + profile + timerNo) - new Date().getSeconds() - sessionStorage.getItem("secsLeft" + profile + timerNo)) : 300
        }

        if (intTimeLeft <= 0) {
            intTimeLeft = 0
        }

        setTimeLeft(formatTime(intTimeLeft))

        // A method that is executed every second
        onCount()
        const countdown = setInterval(onCount, 1000)
        
        return () => clearInterval(countdown)
    })

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            if (timerNo === "1") {
                localStorage.setItem("secsLeft" + profile + timerNo, intTimeLeft)
            } else {
                sessionStorage.setItem("secsLeft" + profile + timerNo, intTimeLeft)
            }
        })
        return () => {
            window.removeEventListener("beforeunload", () => {
                if (timerNo === "1") {
                    localStorage.setItem("secsLeft" + profile + timerNo, intTimeLeft)
                } else {
                    sessionStorage.setItem("secsLeft" + profile + timerNo, intTimeLeft)
                }
            })
        }
    }, [])

    // Return the timer's text
    return (
        <h2 style = {{ textAlign : "center" }}>{timeLeft}</h2>
    )
}

// Allow the Timer component to be used by another component
export default Timer