'use client'

import {useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/navigation'
import {useDebounce} from 'use-debounce'

interface SearchProps {
    type: 'figure' | 'set',
    searchFilter?: string,
    factionFilter?: string,
    releaseWaveFilter?: string,
}

const Search = ({type, searchFilter, factionFilter, releaseWaveFilter}: SearchProps) => {
    const router = useRouter()
    const initialRender = useRef(true)

    const [text, setText] = useState(searchFilter || '')
    const [query] = useDebounce(text, 500)

    const collection = type === 'figure' ? 'miniatures' : 'sets'

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        const url = `?${releaseWaveFilter ? `releaseWaveFilter=${releaseWaveFilter}` : ''}${factionFilter ? `&factionFilter=${factionFilter}` : ''}${factionFilter || releaseWaveFilter ? '&' : ''}`;

        if (!query) {
            router.push(`/${collection}${url}`)
        } else {
            router.push(`${url}searchFilter=${query}${factionFilter ? `&factionFilter=${factionFilter}` : ''}${releaseWaveFilter ? `&releaseWaveFilter=${releaseWaveFilter}` : ''}`);
        }
    }, [query])


    return (
        <input
            value={text}
            placeholder={`Search ${collection}...`}
            onChange={e => setText(e.target.value)}
            className='flex bg-gray-800 pl-3 w-full h-12 text-lg rounded-md scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full hover:bg-gray-700 transition duration-200'
        />
    )
}

export default Search