export default function PokedexControls({ playCry, toggleInfo, showInfo }) {
    return (
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
    );
}