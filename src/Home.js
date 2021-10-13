import React, { useEffect, useState, useContext } from 'react'
import { doSignOut } from "./firebase"
import { Link, useHistory } from 'react-router-dom'
import { AuthUserContext } from './App'
import { getDatabase, ref, set, onValue } from "firebase/database";
import { DisabledByDefaultRounded } from '@mui/icons-material';

export default function Home(props) {

    const [error, setError] = useState('');
    const [lists, setLists] = useState();
    const history = useHistory();
    const authUserId = useContext(AuthUserContext);

    useEffect(() => {
        //Get all the saved lists from db that belongs to signed in user
        const db = getDatabase();
        const dbRef = ref(db, 'users/' + authUserId + '/lists/');

        onValue(dbRef, (snapshot) => {
            /* snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
            }); */
            setLists(snapshot.val());
            console.log(snapshot.val())
        }, {
            onlyOnce: true
        });
        return () => {
            //cleanup
        }
    }, [])


    async function handleSignOut() {
        setError('')

        try {
            await doSignOut()
            history.push('/signin')
        } catch {
            setError('Failed to sign out')
        }

    }
    return (
        <div>
            <h3>Hello home component{props.currentUser}</h3>
            <button onClick={() => handleSignOut()}>Sign out</button>
            <Link to="/create-new-list">Ny list</Link>
            {/* <ShoppingLists lists={lists} /> */}
        </div>
    )
}

const ShoppingLists = ({ lists }) => {
    return (
        <ul>
            <button>Ny lista +</button>
            {/* {lists?.forEach(list => {
                <ListItem list={list} />
            })
            } */}

            {console.log(lists)}
        </ul>

    );
}

const ListItem = ({ list }) => {
    <li>{list}</li>
}