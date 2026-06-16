export default function PokedexSearchForm({ search, setSearch, handleFormSubmit }) {
    return (
        <form onSubmit={handleFormSubmit} className="w-full flex flex-col items-center gap-3">
            <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Simplified: removed the separate searchBut function
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
    );
}