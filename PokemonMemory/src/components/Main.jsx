import { useEffect, useState } from "react"
import Card from "./Card";

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export default function Main(){
    
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [pokemon, setPokemon] = useState([]);
    const [chosePokemon, setChosePokemon] = useState([]);
    
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokedex/2").then(res => res.json())
        .then(data => {
            setPokemon(data.pokemon_entries.splice(0,8));
        });    
    }, []);

    useEffect(() => {
        let wonDialog = document.getElementById("wonDialog");
        if(score == pokemon.length && pokemon.length) wonDialog.showModal();
        if(score > maxScore) setMaxScore(score);
        setPokemon(shuffle(pokemon));
    }, [score])

    function handleCardClick(event){
        let id = event.currentTarget.name;
        if(!chosePokemon.includes(id)){
            let newScore = score + 1;
            setScore(newScore);
            setChosePokemon(chosePokemon.concat(id));
        }else{
            let lostDialog = document.getElementById("lostDialog");
            lostDialog.showModal();
        }
    }

    function handleCloseDialog(event){
        event.currentTarget.close();
        setScore(0);
        setChosePokemon([]);
    }

    return(
        <main>
            <dialog id="wonDialog" onClick={handleCloseDialog}>
                <h2>You won!</h2>
                <p>Score: {score}    Max Score: {maxScore}</p>
                <p>Click to play again!</p>
            </dialog>
            <dialog id="lostDialog" onClick={handleCloseDialog}>
                <h2>You lost!</h2>
                <p>Score: {score}    Max Score: {maxScore}</p>
                <p>Click to play again!</p>
            </dialog>
            <section id="cards-section">
                {
                    pokemon.map(poke => <Card handleClick={handleCardClick} pokemon={poke.pokemon_species} key={poke.entry_number}></Card>)
                }
            </section>
            <section id="score-section">
                <h2>Score: {score}</h2>
                <h2>Max score: {maxScore}</h2>
            </section>
        </main>
    )
}