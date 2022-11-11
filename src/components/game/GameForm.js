import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const [newGame, setNewGame] = useState({
        skillLevel: 0,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes().then(setGameTypes)
    }, []
    )

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...newGame }
        const propertyToModify = domEvent.target.id
        copy[propertyToModify] = domEvent.target.value
        setNewGame(copy)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" 
                        name="title" 
                        required autoFocus 
                        className="form-control"
                        placeholder="Game Title"
                        value={newGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Made By: </label>
                    <input type="text" 
                        name="maker" 
                        required autoFocus 
                        className="form-control"
                        placeholder="Who Created This Game"
                        value={newGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players:</label>
                    <input
                        required autoFocus
                        type="number" id="numberOfPlayers"
                        className="form-control"
                        placeholder="How Many People Can Play?"
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level:</label>
                    <input
                        required autoFocus
                        type="number" id="skillLevel"
                        className="form-control"
                        placeholder="What is the Skill Level Required for This Game?"
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type:</label>
                    <select name="gameTypeId" className="drop_down" value={newGame.gameTypeId}
                    onChange={changeGameState}>
                        
                        <option value={0}>Select Game Type</option>
                        {
                            gameTypes.map((type) =>{
                                return <option value={`${type.id}`} key={`type--${type.id}`}>{type.label}</option>
                            }

                            )
                            
                        }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: newGame.maker,
                        title: newGame.title,
                        number_of_players: parseInt(newGame.numberOfPlayers),
                        skill_level: parseInt(newGame.skillLevel),
                        game_type: parseInt(newGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}