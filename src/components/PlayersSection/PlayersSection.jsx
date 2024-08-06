import React from 'react';
import './PlayersSection.css'

const PlayersSection = ({ start, player, setNumPlayers, numPlayers, startGame, scores }) => {
    return <>
        {!start ? <div>
            <p>Number of player</p>
            <div className='count-players'>
                <button className='' onClick={() => setNumPlayers(prev => prev + 1)}>+</button>
                <p className='mx-3'>{numPlayers}</p>
                <button onClick={() => setNumPlayers(prev => (prev === 1 ? prev : prev - 1))}>-</button>
            </div>
            <button onClick={startGame}>Start Game</button>
        </div> :
            <div>
                <button onClick={() => {
                    setNumPlayers(1);
                    startGame()
                }}>New Game</button>
                <div className='align-items-center mt-3 row'>
                    {scores.map((score, index) => <p key={index} className={`col-9 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 mx-auto ${player === index ? "currunt-player" : ""}`}>Player {index + 1} = {score}</p>)}
                </div>
            </div>}
    </>
}

export default PlayersSection;
