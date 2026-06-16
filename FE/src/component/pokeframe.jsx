import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import PokedexScreen from "./PokedexScreen";
import PokedexControls from "./PokedexControls";
import PokedexSearchForm from "./PokedexSearchForm";
const GET_POKEMON = gql`
  query GetPokemonData($nameOrId: String!) {
    pokemon(nameOrId: $nameOrId) {
      id
      name
      types
      moves
      sprites { front_default }
    }
  }
`;

export default function Frame() {
    const [search, setSearch] = useState("pikachu");
    const [showInfo, setInfo] = useState(false);

    // 2. GraphQL Logic
    const [getPokemon, { data: queryData, loading, error }] = useLazyQuery(GET_POKEMON);
    const pokedata = queryData?.pokemon;

   

    const searchBut = (e) => {
        setSearch(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        getPokemon({ variables: { nameOrId: search.toLowerCase().trim() } });
    };

    const playCry = () => {
        const name = search.toLowerCase().trim();
        const audio = new Audio(`https://pokemoncries.com/cries/${name}.mp3`);

        audio.onerror = () => {
            alert(`No cry available for ${search.toUpperCase()}`);
        };

        audio.play().catch((err) => {
            console.error("Playback failed", err);
        });
    };

    const toggleInfo = () => {
        setInfo(!showInfo);
    };

    useEffect(()=>{
        getPokemon({variables: { nameOrId: "pikachu"} })
    },[])
   
    // 5. Derived Data
    const types = pokedata ? pokedata.types : [];
    const moves = pokedata ? pokedata.moves : [];
    return (
        <div className="w-full flex justify-center items-center p-5 min-h-screen bg-slate-100">
            <div className="w-full max-w-md flex flex-col items-center rounded-3xl overflow-hidden shadow-2xl border-4 border-red-700 relative bg-red-600">
                
                {/* Camera Eye Accent (Static UI) */}
                <div className="absolute top-3 left-4 flex gap-1 items-center z-10">
                    <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white shadow-inner animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
                </div>

                {/* Top Section - Display Screen */}
                <div className="w-full pt-14 p-6 text-center flex flex-col items-center">
                    <PokedexScreen 
                        loading={loading} 
                        error={error} 
                        pokedata={pokedata} 
                        types={types} 
                        moves={moves} 
                        showInfo={showInfo} 
                    />
                </div>

                {/* The Pokéball Center Split Belt (Static UI) */}
                <div className="w-full h-4 bg-zinc-900 flex justify-center items-center relative">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 border-4 border-zinc-900 absolute flex justify-center items-center shadow shadow-black/50 z-10">
                        <div className="w-4 h-4 rounded-full bg-zinc-300 border-2 border-zinc-500"></div>
                    </div>
                </div>

                {/* Bottom Section - Controls and Inputs */}
                <div className="bg-zinc-50 w-full p-6 flex flex-col items-center border-t-2 border-zinc-300">
                    <PokedexControls playCry={playCry} toggleInfo={() => setInfo(!showInfo)} showInfo={showInfo} />

                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Trainer Search Console</p>
                    
                    <PokedexSearchForm search={search} setSearch={setSearch} handleFormSubmit={handleFormSubmit} />
                </div>
            </div>
        </div>
    );
}
