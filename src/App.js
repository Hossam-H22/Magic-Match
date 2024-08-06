import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard/SingleCard.jsx';
import PlayersSection from './components/PlayersSection/PlayersSection.jsx';
import WinnerCard from './components/WinnerCard/WinnerCard';



function App() {
  const [cards, setCards] = useState([]);
  const [scores, setScores] = useState([]);
  const [tryes, setTryes] = useState(0);
  const [player, setPlayer] = useState(0);
  const [numPlayers, setNumPlayers] = useState(1);
  const [numMatched, setNumMatched] = useState(0);
  const [start, setStart] = useState(false);
  const [finished, setFinished] = useState(false);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);


  const shuffleCards = () => {
    var id = 1;
    var shuffledCards = []
    for (var i = 4; i <= 55; i++) {
      const card = {
        "src": `img/asset ${i}.png`,
        "id_matched": (id % 13 === 0) ? 13 : id % 13,
        "id": i,
        "matched": false,
      }
      // console.log(card);
      shuffledCards.push(card);
      id++;
    }
    shuffledCards = shuffledCards.sort(() => Math.random() - 0.5)

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTryes(0);
  }

  const handleChoice = (card) => {
    // console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.id_matched === choiceTwo.id_matched) {
        setCards(prevCards => prevCards.map(card => {
          return (card.id === choiceOne.id || card.id === choiceTwo.id) ? { ...card, matched: true } : card
        }));
        scores[player] += 1
        setScores(scores);
        setNumMatched(prev => prev+1);
        resetTurn();
      } else {
        setTimeout(() => {
          setPlayer(prevPayer => (prevPayer + 1) % numPlayers);
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const startGame = () => {
    setFinished(false);
    setNumMatched(0);
    setPlayer(0);
    shuffleCards();
    setScores(Array(numPlayers).fill(0));
    setStart(prev => !prev);
  }

  useEffect(()=>{
    if(numMatched===26){
      setTimeout(()=>{
        setFinished(true);
      }, 500)
    }
  }, [numMatched])

  useEffect(() => {
    shuffleCards();
  }, []);


  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTryes(prevTryes => prevTryes + 1);
    setDisabled(false);
  }

  return <>
    <div className="App container-xxl px-3 px-sm-4 px-md-5 px-xxl-0">
      {finished &&  <WinnerCard 
          setNumPlayers={setNumPlayers}
          scores={scores} 
          startGame={startGame} 
          winnerScore={Math.max(...scores)}
        />}

      <h1>Magic Match</h1>
      <PlayersSection
        start={start}
        player={player}
        setNumPlayers={setNumPlayers}
        numPlayers={numPlayers}
        startGame={startGame}
        scores={scores}
      />

      <div className='card-grid position-relative' >
        <div className='row'>
          {cards.map(card => <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            selected={card === choiceOne || card === choiceTwo}
            startGameStatus={start}
          />)}
          {start && <p className='my-4'>Tries Number: {tryes}</p>}
        </div>
      </div>

      <p className='mt-4 mx-auto fs-5'>Developed by <a className='text-decoration-none text-white' href='https://linktr.ee/hossam_h22' target='_blank'>Eng.Hossam Hatem</a></p>
    </div>
  </>;
}

export default App;
