import { useState, useEffect } from "react";

export default function Frame() {
    const [search, setSearch] = useState("pikachu");
    const [pokedata, setPokedata] = useState(null);

    const searchBut = (e) => {
        setSearch(e.target.value);
    };

    const fetchData = async () => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
            const data = await res.json();
            console.log(data);
            setPokedata(data);
        } catch (err) {
            setPokedata(null);
        }
    };
    const playCry = () => {
        const name = search.toLowerCase();
        const audio = new Audio(`https://pokemoncries.com/cries/${name}.mp3`);

        audio.onerror = () => {
            alert(`No cry available for ${search.toUpperCase()}`);
        };

        audio.play().catch((err) => {
            console.error("Playback failed", err);
        });
    };

    const [showInfo, setInfo] = useState(false);
    const toggleInfo = () => {
        setInfo(!showInfo);
    };
    let types = [];
let moves = [];

if (pokedata) {
  types = pokedata.types.map((t) => t.type.name);
  moves = pokedata.moves.slice(0, 4).map((m) => m.move.name);
}

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="mx-63  w-100  flex justify-center items-center shadow-sm p-5 min-h-screen">
            <div className="w-full max-w-4xl flex flex-col items-center rounded-lg overflow-hidden shadow-xl">

                {/* Red top section for Pokémon info */}
                <div className="bg-red-500 w-full p-6 text-center">


                    {pokedata ? (
                        <>
                            <h3 className="font-bold text-xl text-white">{pokedata.name.toUpperCase()}</h3>
                            <img src={pokedata.sprites.front_default} alt={pokedata.name} className="mx-auto mt-4 h-35" />
                        </>
                    ) : (
                        <p className="text-white">No data found</p>
                    )}

                    <br/>

                    {showInfo && (
                        <div className="bg-gray-100 p-4 rounded mt-4 text-left w-full max-w-md mx-auto">
                            <p><strong>Type:</strong> {types.join(", ")}</p>
                            <p><strong>Moves:</strong> {moves.join(", ")}</p>
                        </div>
                    )}

                </div>

                {/* White bottom section for search */}
                <div className="bg-white w-full p-6 flex flex-col items-center">
                    <div>
                        <button onClick={playCry} className="inline shadow-sm mx-5" title="Play Cry">
                            🔊
                        </button>
                        <button onClick={toggleInfo} className="inline shadow-sm" title="Play Cry">
                            Info
                        </button></div>
                    <p className="text-gray-800 m-2 font-medium">Search the Pokemon...</p>
                    <form className="py-4 px-6  rounded-md flex flex-row items-center gap-4">
                        <input
                            id="search"
                            type="text"
                            value={search}
                            onChange={(e) => searchBut(e)}
                            placeholder="eg: Bulbasaur"
                            className=" border-2  rounded-md p-2 w-full"
                        />
                    </form>
                    <button
                        onClick={fetchData}
                        className="color-500 border-2 text-black rounded px-6 py-2 mt-4 shadow-md "
                    >
                        Search
                    </button>
                </div>

            </div>
        </div>
    );
}
