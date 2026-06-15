import { useState, useEffect } from "react";

export default function Frame() {
    const [search, setSearch] = useState("pikachu");
    const [pokedata, setPokedata] = useState(null);
    const [showInfo, setInfo] = useState(false);

    const searchBut = (e) => {
        setSearch(e.target.value);
    };

    const fetchData = async () => {
        if (!search.trim()) return;
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase().trim()}`);
            const data = await res.json();
            setPokedata(data);
        } catch (err) {
            setPokedata(null);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchData();
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
        <div className="w-full flex justify-center items-center p-5 min-h-screen bg-slate-100">
            {/* Main Pokédex Container */}
            <div className="w-full max-w-md flex flex-col items-center rounded-3xl overflow-hidden shadow-2xl border-4 border-red-700 relative bg-red-600">
                
                {/* Pokédex Camera Eye Accent */}
                <div className="absolute top-3 left-4 flex gap-1 items-center z-10">
                    <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white shadow-inner animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
                </div>

                {/* Top Section - Display Screen */}
                <div className="w-full pt-14 p-6 text-center flex flex-col items-center">
                    <div className="bg-slate-800 text-emerald-400 font-mono border-4 border-zinc-400 rounded-xl p-4 w-full min-h-[220px] flex flex-col justify-center items-center shadow-inner relative">
                        {pokedata ? (
                            <>
                                <span className="absolute top-2 right-3 text-xs opacity-60">
                                    #{String(pokedata.id).padStart(3, '0')}
                                </span>
                                <h3 className="font-bold text-2xl tracking-widest uppercase mb-2 text-yellow-400 drop-shadow">
                                    {pokedata.name}
                                </h3>
                                <div className="bg-slate-700 rounded-lg p-2 border border-slate-600 shadow-md">
                                    <img 
                                        src={pokedata.sprites.front_default || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"} 
                                        alt={pokedata.name} 
                                        className="mx-auto h-28 w-28 object-contain pixelated image-render-pixel" 
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <p className="text-red-400 font-bold uppercase tracking-wider animate-bounce">Data Missing</p>
                                <p className="text-xs opacity-70">Check spelling or search another Pokémon</p>
                            </div>
                        )}

                        {/* Dropdown Retro Stats Display */}
                        {showInfo && pokedata && (
                            <div className="bg-slate-900 border-t border-slate-700 p-3 mt-3 rounded-md text-left w-full text-xs text-slate-300 space-y-1">
                                <p><span className="text-yellow-500 font-bold uppercase">Type:</span> {types.join(" / ")}</p>
                                <p><span className="text-blue-400 font-bold uppercase">Moves:</span> {moves.join(", ") || "None"}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* The Pokéball Center Split Belt */}
                <div className="w-full h-4 bg-zinc-900 flex justify-center items-center relative">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 border-4 border-zinc-900 absolute flex justify-center items-center shadow shadow-black/50 z-10">
                        <div className="w-4 h-4 rounded-full bg-zinc-300 border-2 border-zinc-500"></div>
                    </div>
                </div>

                {/* Bottom Section - Controls and Inputs */}
                <div className="bg-zinc-50 w-full p-6 flex flex-col items-center border-t-2 border-zinc-300">
                    
                    {/* Retro Action Buttons */}
                    <div className="flex gap-4 mb-4">
                        <button 
                            onClick={playCry} 
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-full shadow-md border-b-4 border-blue-700 active:border-b-0 active:mt-[4px] transition-all flex items-center gap-1 text-sm"
                            title="Play Cry"
                        >
                            <span>🔊</span> Cry
                        </button>
                        <button 
                            onClick={toggleInfo} 
                            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-full shadow-md border-b-4 border-amber-700 active:border-b-0 active:mt-[4px] transition-all text-sm"
                            title="Toggle Stats"
                        >
                            {showInfo ? "Hide Stats" : "Show Stats"}
                        </button>
                    </div>

                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Trainer Search Console</p>
                    
                    {/* Search Form */}
                    <form onSubmit={handleFormSubmit} className="w-full flex flex-col items-center gap-3">
                        <input
                            id="search"
                            type="text"
                            value={search}
                            onChange={searchBut}
                            placeholder="e.g., Bulbasaur, Charizard..."
                            className="border-4 border-zinc-700 bg-amber-50 rounded-lg p-2.5 w-full text-center font-bold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
                        />
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-extrabold uppercase tracking-widest rounded-lg px-6 py-3 shadow-md border-b-4 border-yellow-600 active:border-b-0 active:mt-[4px] transition-all border-2 border-blue-900"
                        >
                            I Choose You!
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}