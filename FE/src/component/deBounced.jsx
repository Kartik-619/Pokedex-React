import { useState } from "react"
import { useDebounce } from 'use-debounce';


export const debouncedInput = () => {
    const [text, setText] = useState('');
    const [val] = useDebounce(text, 1000, { leading: true });

    return (
        <div>
            <input
                defaultValue={'Hello'}
                onChange={(e) => {
                    setText(e.target.value);
                }}
            />
        </div>
    )
}