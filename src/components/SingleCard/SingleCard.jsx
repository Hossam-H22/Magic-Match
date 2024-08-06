import React from 'react'
import './SingleCard.css'

function SingleCard({ card, handleChoice, flipped, disabled, selected, startGameStatus }) {

    const handleClick = ()=>{
        if(!disabled){
            handleChoice(card);
        }
    }

    return <>
        <div className='position-relative col-4 col-sm-3 col-md-2 col-lg-2 col-xxl-1 mb-3 '>
            <div className='card-play'>
                {!startGameStatus && <div className='disabled d-flex'>
                    <img src="img/asset 1.png" alt="blocked card" />
                </div> }
                <div className={flipped? "flipped" : ""}>
                    <img className={`front ${selected? "selected":""} `} src={card.src} alt="card front" />
                    <img 
                        className='back' 
                        src="img/cover.jpg" 
                        alt="card back"
                        onClick={handleClick} 
                    />
                </div>
            </div>
        </div>
    </>
}

export default SingleCard
