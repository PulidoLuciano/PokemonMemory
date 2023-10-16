import { useEffect, useState } from "react"
import Card from "./Card";

export default function Main(){
    
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [pokemon, setPokemon] = useState([]);
    const [chosePokemon, setChosePokemon] = useState([]);
    const [actualPokemon, setActualPokemon] = useState([]);
    
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokedex/2").then(res => res.json())
        .then(data => {
            setPokemon(data.pokemon_entries);
            setActualPokemon(getPokemon(data.pokemon_entries));
        }).catch(error =>
            console.error(error)
        )  
    }, []);

    useEffect(() => {
        if(chosePokemon.length != 0 && score != pokemon.length) setActualPokemon(getPokemon(pokemon));
    }, [chosePokemon])

    useEffect(() => {
        let wonDialog = document.getElementById("wonDialog");
        if(score == pokemon.length && pokemon.length) wonDialog.showModal();
        if(score > maxScore) setMaxScore(score);
    }, [score]);

    function getPokemon(list){
        let array = [];
        let someUnchosen = false;
        while(array.length < 8){
            let newItem = list[Math.trunc(Math.random() * list.length)]
            if(!array.includes(newItem)) array = array.concat(newItem);
        }

        while(!someUnchosen){
            let found = array.find(element => !chosePokemon.includes(element.pokemon_species.name));
            console.log(found);
            if(found) someUnchosen = true;
            else{
                console.log("Change needed")
                array[Math.trunc(Math.random() * array.length)] = list.find(element => !chosePokemon.includes(element.pokemon_species.name));
            }
        }
        return array;
    }

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
        setActualPokemon(getPokemon(pokemon));
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
                    actualPokemon.map(poke => <Card handleClick={handleCardClick} pokemon={poke.pokemon_species} key={poke.entry_number}></Card>)
                }
            </section>
            <section id="score-section">
                <h2>Score: {score}</h2>
                <h2>Max score: {maxScore}</h2>
            </section>
        </main>
    )
}