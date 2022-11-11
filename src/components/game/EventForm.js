import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { createEvent } from "../../managers/EventManager.js"


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        getGames().then(setGames)
    }, []
    )

    const changeEventState = (domEvent) => {
        const value = domEvent.target.value
        setCurrentEvent({
            ...currentEvent,
            [domEvent.target.name]: value
        })
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__description">Create A New Event!</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Describe The Event: </label>
                    <input type="text" 
                        name="description" 
                        required autoFocus 
                        className="form-control"
                        placeholder="Event Description"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Which Game:</label>
                    <select name="game" className="drop_down" value={currentEvent.game}
                    onChange={changeEventState}>
                        
                        <option value={0}>Select Game</option>
                        {
                            games.map((game) =>{
                                return <option value={`${game.id}`} key={`game--${game.id}`}>{game.title}</option>
                            }

                            )
                            
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date Of Event: </label>
                    <input type="date" 
                        name="date" 
                        required autoFocus 
                        className="form-control"
                        placeholder="Event Date"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time Of Event: </label>
                    <input type="time" 
                        name="time" 
                        required autoFocus 
                        className="form-control"
                        placeholder="Event Time"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        game: parseInt(currentEvent.game),
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}