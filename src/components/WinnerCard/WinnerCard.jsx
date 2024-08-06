import React from 'react';
import './WinnerCard.css'

const WinnerCard = ({setNumPlayers, scores, startGame, winnerScore}) => {
    var persentage = scores.length===1? `${100/3}%`: `${100/(scores.length+1)}%`;
    
    return (
        <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center z-1'>
            <div className='result-card' style={{top: persentage}}>
                {scores.map((score, index) => <p key={index} className={`m-2 ${winnerScore===score? "winner":""}`}>Player #{index + 1}{winnerScore===score && " - Winner"}:  {score} </p>)}
                <button onClick={() => {
                    setNumPlayers(1);
                    startGame();
                }}>Close</button>
            </div>
        </div>
    );
}

export default WinnerCard;
