import { useState } from 'react'
import './index.css'

import { HashRouter, Routes, Route, Link } from 'react-router-dom'

const initialFilmy = [
    { tytul: 'Prisoners', gatunek: 'Thriller', ocena: '10', rok: '2013', zdjecie: './prisoners.jpg' },
    { tytul: 'Memento', gatunek: 'Thriller', ocena: '9.0', rok: '2000', zdjecie: './memento.jpg' },
    { tytul: 'Whiplash', gatunek: 'Dramat', ocena: '9.0', rok: '2014', zdjecie: './whiplash.jpg' },
    { tytul: 'Primal fear', gatunek: 'Thriller', ocena: '9.5', rok: '1996', zdjecie: './primalfear.jpg' },
    { tytul: 'Shutter Island', gatunek: 'Thriller', ocena: '10', rok: '2014', zdjecie: './shutter.jpg' },
    { tytul: 'Memories of Murder', gatunek: 'Thriller', ocena: '9.0', rok: '2003', zdjecie: './memories of murder.jpg' },
]

function Filmy({ filmy, setFilmy }) {
    const [formularz, setFormularz] = useState({
        tytul: '', gatunek: '', ocena: '', rok: '', zdjecie: null
    })

    function handleChange(e) {
        if (e.target.type === 'file') {
            setFormularz({ ...formularz, zdjecie: e.target.files[0] })
        } else {
            setFormularz({ ...formularz, [e.target.name]: e.target.value })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!formularz.tytul) return

        const nowyFilm = {
            ...formularz,
            zdjecie: formularz.zdjecie
                ? URL.createObjectURL(formularz.zdjecie)
                : null
        }

        setFilmy([...filmy, nowyFilm])
        setFormularz({ tytul: '', gatunek: '', ocena: '', rok: '', zdjecie: null })
    }

    return (
        <div className='bg-gray-300 h-screen grid gap-2 overflow-hidden' style={{
            gridTemplateColumns: '75% 25%',
            gridTemplateRows: 'calc(100% - 40px - 8px) 40px',
            gridTemplateAreas: `"main aside" "footer footer"`,
        }}>
            <div className='p-5 overflow-y-auto' style={{ gridArea: 'main' }}>
                <div className="flex flex-row gap-10 p-5 bg-white rounded-xl h-fit m-2 flex-wrap justify-center">
                    {filmy.map((film, i) => (
                        <div key={i}
                            style={{ width: '160px', cursor: 'pointer', transition: 'transform 0.15s' }}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:-translate-y-1"
                        >
                            <div className="relative">
                                {film.zdjecie
                                    ? <img src={film.zdjecie} alt={film.tytul} className="w-full h-56 object-cover" />
                                    : <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400 text-4xl">🎬</div>
                                }
                                <div className="absolute top-2 right-2 bg-black/80 text-yellow-400 text-xs font-medium px-2 py-0.5 rounded">
                                    ★ {film.ocena}
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="font-medium text-sm text-gray-900 truncate">{film.tytul}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{film.gatunek} · {film.rok}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='p-5' style={{ gridArea: 'aside' }}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 bg-white rounded-lg">
                    <h2 className="font-semibold text-lg mb-1">Dodaj film</h2>

                    {[
                        { label: 'Tytuł', name: 'tytul', placeholder: 'Tytuł filmu?' },
                        { label: 'Gatunek', name: 'gatunek', placeholder: 'Gatunek filmu?' },
                        { label: 'Ocena', name: 'ocena', placeholder: 'Twoja ocena?' },
                        { label: 'Rok wydania', name: 'rok', placeholder: 'Rok wydania?' },
                    ].map(({ label, name, placeholder }) => (
                        <label key={name} className="flex flex-col gap-1 text-gray-600 text-sm">
                            {label}
                            <input
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-600"
                                type="text"
                                name={name}
                                placeholder={placeholder}
                                value={formularz[name]}
                                onChange={handleChange}
                            />
                        </label>
                    ))}

                    <label className="flex flex-col gap-1 text-gray-600 text-sm">
                        Zdjęcie okładki
                        <input type="file" accept="image/*" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-500" />
                    </label>

                    <button
                        type="submit"
                        className="bg-gray-400 text-white py-2 rounded hover:bg-gray-600 cursor-pointer hover:scale-103 transition duration-300 mt-1"
                    >
                        Dodaj
                    </button>
                </form>
            </div>

            <div className='flex justify-center items-center bg-gray-400' style={{ gridArea: 'footer' }}>
                <h3>Wszystkie prawa zastrzeżone</h3>
            </div>
        </div>
    )
}

function Recenzje({ filmy }) {
    const [recenzje, setRecenzje] = useState([])
    const [formularz, setFormularz] = useState({
        film: '',
        autor: '',
        ocena: '5',
        tresc: ''
    })

    function handleChange(e) {
        setFormularz({ ...formularz, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!formularz.film || !formularz.tresc) return

        const nowaRecenzja = {
            ...formularz,
            data: new Date().toLocaleDateString('pl-PL')
        }

        setRecenzje([nowaRecenzja, ...recenzje])
        setFormularz({ film: '', autor: '', ocena: '5', tresc: '' })
    }

    function gwiazdki(ocena) {
        const n = parseInt(ocena)
        return Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={i < n ? 'text-yellow-400' : 'text-gray-300'}>★</span>
        ))
    }

    return (
        <div className='bg-gray-300 h-screen grid gap-2 overflow-hidden' style={{
            gridTemplateColumns: '70% 30%',
            gridTemplateRows: 'calc(100% - 40px - 8px) 40px',
            gridTemplateAreas: `"main aside" "footer footer"`,
        }}>
            <div className='p-5 overflow-y-auto' style={{ gridArea: 'main' }}>
                {recenzje.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl m-2 text-gray-400">
                        <span className="text-5xl mb-3">📝</span>
                        <p className="text-lg">Brak recenzji. Dodaj pierwszą!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 m-2">
                        {recenzje.map((r, i) => (
                            <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-base">{r.film}</h3>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {r.autor ? r.autor : 'Anonim'} · {r.data}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                                        <span className="text-yellow-400 text-sm">★</span>
                                        <span className="text-sm font-medium text-gray-700">{r.ocena}/10</span>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {gwiazdki(r.ocena)}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{r.tresc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='p-5 overflow-y-auto' style={{ gridArea: 'aside' }}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-white rounded-lg">
                    <h2 className="font-semibold text-lg mb-1">Dodaj recenzję</h2>

                    <label className="flex flex-col gap-1 text-gray-600 text-sm">
                        Film
                        <select
                            name="film"
                            value={formularz.film}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-600 bg-white"
                        >
                            <option value="">Wybierz film...</option>
                            {filmy.map((f, i) => (
                                <option key={i} value={f.tytul}>{f.tytul}</option>
                            ))}
                        </select>
                    </label>

                    <label className="flex flex-col gap-1 text-gray-600 text-sm">
                        Autor (opcjonalnie)
                        <input
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-600"
                            type="text"
                            name="autor"
                            placeholder="Twoje imię?"
                            value={formularz.autor}
                            onChange={handleChange}
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-gray-600 text-sm">
                        Ocena: <span className="font-semibold text-yellow-500">{formularz.ocena}/10</span>
                        <input
                            type="range"
                            name="ocena"
                            min="1"
                            max="10"
                            step="1"
                            value={formularz.ocena}
                            onChange={handleChange}
                            className="w-full accent-gray-500"
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-gray-600 text-sm">
                        Treść recenzji
                        <textarea
                            name="tresc"
                            value={formularz.tresc}
                            onChange={handleChange}
                            placeholder="Napisz co myślisz o filmie..."
                            rows={5}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-600 resize-none text-sm"
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-gray-400 text-white py-2 rounded hover:bg-gray-600 cursor-pointer transition duration-300 mt-1"
                    >
                        Dodaj recenzję
                    </button>
                </form>
            </div>

            <div className='flex justify-center items-center bg-gray-400' style={{ gridArea: 'footer' }}>
                <h3>Wszystkie prawa zastrzeżone</h3>
            </div>
        </div>
    )
}

function Rankingi({ filmy }) {
    const posortowane = [...filmy].sort((a, b) => parseFloat(b.ocena) - parseFloat(a.ocena))
    const top3 = posortowane.slice(0, 3)
    const reszta = posortowane.slice(3)

    const podiumKolejnosc = [top3[1], top3[0], top3[2]].filter(Boolean)

    const podiumStyle = {
        0: { height: '110px', label: '🥈', place: 2, bg: 'bg-gray-200', border: 'border-gray-400' },
        1: { height: '140px', label: '🥇', place: 1, bg: 'bg-yellow-100', border: 'border-yellow-400' },
        2: { height: '90px', label: '🥉', place: 3, bg: 'bg-orange-100', border: 'border-orange-400' },
    }

    return (
        <div className='bg-gray-300 h-screen grid gap-2 overflow-hidden' style={{
            gridTemplateRows: 'calc(100% - 40px - 8px) 40px',
            gridTemplateAreas: `"main" "footer"`,
        }}>
            <div className='p-5 overflow-y-auto' style={{ gridArea: 'main' }}>


                <div className="bg-white rounded-xl p-6 m-2 mb-4">
                    <h2 className="text-center font-semibold text-lg text-gray-700 mb-6">🏆 Top 3 filmy</h2>
                    <div className="flex items-end justify-center gap-6">
                        {podiumKolejnosc.map((film, idx) => {
                            const styl = podiumStyle[idx]
                            return (
                                <div key={film.tytul} className="flex flex-col items-center" style={{ width: '140px' }}>
                                    <div className="text-2xl mb-1">{styl.label}</div>
                                    {film.zdjecie && (
                                        <img
                                            src={film.zdjecie}
                                            alt={film.tytul}
                                            className="w-16 h-20 object-cover rounded-lg border border-gray-200 mb-2"
                                        />
                                    )}
                                    <p className="text-xs font-semibold text-gray-800 truncate w-full text-center mb-1">
                                        {film.tytul}
                                    </p>
                                    <p className="text-xs text-gray-400 mb-2">{film.rok}</p>
                                    <div
                                        className={`w-full ${styl.bg} border-t-4 ${styl.border} rounded-t-lg flex flex-col items-center justify-start pt-2`}
                                        style={{ height: styl.height }}
                                    >
                                        <span className="text-lg font-bold text-gray-700">#{styl.place}</span>
                                        <span className="text-xs font-medium text-yellow-600 mt-1">★ {film.ocena}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {reszta.length > 0 && (
                    <div className="bg-white rounded-xl p-4 m-2">
                        <h2 className="font-semibold text-gray-700 mb-3 px-1">Pozostałe filmy</h2>
                        <div className="flex flex-col gap-2">
                            {reszta.map((film, i) => (
                                <div key={film.tytul} className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-50 transition">
                                    <span className="text-gray-400 font-semibold text-sm w-5 text-right">#{i + 4}</span>
                                    {film.zdjecie
                                        ? <img src={film.zdjecie} alt={film.tytul} className="w-10 h-13 object-cover rounded" style={{ height: '52px' }} />
                                        : <div className="w-10 bg-gray-200 rounded flex items-center justify-center text-gray-300 text-lg" style={{ height: '52px' }}>🎬</div>
                                    }
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm text-gray-800 truncate">{film.tytul}</p>
                                        <p className="text-xs text-gray-400">{film.gatunek} · {film.rok}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-400 text-sm">★</span>
                                        <span className="text-sm font-semibold text-gray-600">{film.ocena}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className='flex justify-center items-center bg-gray-400' style={{ gridArea: 'footer' }}>
                <h3>Wszystkie prawa zastrzeżone</h3>
            </div>
        </div>
    )
}

const linkStyle = 'text-[23px] p-5'

function App() {
    const [filmy, setFilmy] = useState(initialFilmy)

    return (
        <>
            <HashRouter>
                <div className='flex width-100 p-1.5 justify-between bg-gray-400'>
                    <header className='text-[25px]'>Kinoexpress</header>
                    <nav>
                        <Link to="/filmy" className={linkStyle}>Filmy</Link>
                        <Link to="/recenzje" className={linkStyle}>Recenzje</Link>
                        <Link to="/rankingi" className={linkStyle}>Rankingi</Link>
                    </nav>
                </div>
                <Routes>
                    <Route path="/filmy" element={<Filmy filmy={filmy} setFilmy={setFilmy} />} />
                    <Route path="/recenzje" element={<Recenzje filmy={filmy} />} />
                    <Route path="/rankingi" element={<Rankingi filmy={filmy} />} />
                </Routes>
            </HashRouter>
        </>
    )
}

export default App