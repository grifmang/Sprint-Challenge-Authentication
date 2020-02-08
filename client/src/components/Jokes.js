import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './axiosWithAuth';

const Jokes = () => {
    
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get('/jokes')
        .then(response => {
            setJokes(response.data)
        })
    })

    return (
        <div>
            {jokes.length > 0
            ? jokes.map((element, index) => {
                return <div key={index}>
                    <p>{element.joke}</p>
                </div>
            })
        : null}
        </div>
    )
}

export default Jokes;