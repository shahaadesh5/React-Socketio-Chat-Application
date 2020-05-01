import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Home.css'

const Home = ()=>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('General');

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join the Chatroom</h1>
                <div>
                    <input placeholder="Name" className="input-control" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <select value={room} onChange={event=>setRoom(event.target.value)} className="mt-20">
                        <option value="General">General</option>
                        <option value="Trending">Trending</option>
                    </select>
                </div>
                <div>
                    <Link onClick={event=> (!name||!room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20">Join</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;