export default function PokedexScreen({ loading, error, pokedata, types, moves, showInfo }) {
    return (
        <div className="bg-slate-800 text-emerald-400 font-mono border-4 border-zinc-400 rounded-xl p-4 w-full min-h-[220px] flex flex-col justify-center items-center shadow-inner relative">
            
            {/* Conditional Rendering */}
            {loading ? (
                <p className="text-yellow-400 font-bold uppercase tracking-wider animate-pulse">Loading Data...</p>
            ) : error ? (
                <div className="text-center">
                    <p className="text-red-400 font-bold uppercase tracking-wider">Data Missing</p>
                    <p className="text-xs opacity-70">Check spelling or search another Pokémon</p>
                </div>
            ) : pokedata ? (
                <>
                    <span className="absolute top-2 right-3 text-xs opacity-60">#{String(pokedata.id).padStart(3, '0')}</span>
                    <h3 className="font-bold text-2xl tracking-widest uppercase mb-2 text-yellow-400 drop-shadow">{pokedata.name}</h3>
                    <div className="bg-slate-700 rounded-lg p-2 border border-slate-600 shadow-md">
                        <img 
                            src={pokedata.sprites.front_default || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"} 
                            alt={pokedata.name} 
                            className="mx-auto h-28 w-28 object-contain pixelated image-render-pixel" 
                        />
                    </div>
                </>
            ) : (
                <p className="text-slate-500">Awaiting Search...</p>
            )}

            {/* Stats Dropdown */}
            {showInfo && pokedata && (
                <div className="bg-slate-900 border-t border-slate-700 p-3 mt-3 rounded-md text-left w-full text-xs text-slate-300 space-y-1">
                    <p><span className="text-yellow-500 font-bold uppercase">Type:</span> {types.join(" / ")}</p>
                    <p><span className="text-blue-400 font-bold uppercase">Moves:</span> {moves.join(", ") || "None"}</p>
                </div>
            )}
        </div>
    );
}