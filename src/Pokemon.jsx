import { useEffect, useState } from 'react'
import './index.css'
import loaderGif  from './assets/pokemon.gif'
import { PokemonCards } from './PokemonCards';

export const Pokemon = () =>{

    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")

    const API = "https://pokeapi.co/api/v2/pokemon?limit=100";

    const fetchPokemon = async () =>{
        try {
            const res = await fetch(API);
            const data = await res.json();
            
            const detailedPokemonData = data.results.map( async (curPokemon)=>{
                const res = await fetch(curPokemon.url)
                const data = await res.json();
                return data
            })

            const detailedResponse = await Promise.all(detailedPokemonData);

            console.log(detailedResponse);
            setPokemon(detailedResponse);
            setLoading(false)

        } catch (error) {
            console.error(error)
            setLoading(false)
            setError(error)
        }
    }

    //UseEffect
    useEffect(()=>{
        fetchPokemon();
    },[])

    //Search Functionality
    const searhData = pokemon.filter( curPokemon => curPokemon.name.toLowerCase().includes(search.toLowerCase()))

    //Loader
    if(loading){
        return(
            <div className="loading-container">
                <img src={loaderGif} alt="Loading..." className="loading-gif" />
            </div>
        )
    }

    //Error handle
    if(error){
        return(
            <div>
                {error.message}
            </div>
        )
    }

    //Return Cards
    return(
        <>
            <header>
                <div className="container">
                    <div className="text-center">
                        <h1>Lets catch Pokémon</h1>                        
                    </div>
                </div>
            </header>
            <div className="pokemon-search">
                <input type="text" placeholder="Search pokemon" value={search} onChange={(e)=> setSearch(e.target.value)}/>
            </div>
            <main>
                <div className="container">
                    <ul className="cards">
                        {
                            searhData.map((curPokemon) => {
                                return(
                                    <PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>
                                )
                            })
                        }
                    </ul>
                </div>
            </main>
        </>
    )
}