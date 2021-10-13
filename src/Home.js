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

    const [listNames, setListNames] = useState([]);
    const [listData, setListData] = useState([]);

    useEffect(() => {
        //Get all the saved lists from db that belongs to signed in user
        const db = getDatabase();
        const dbRef = ref(db, 'users/' + authUserId + '/lists/');


        let childKeysArr = [];
        let childDataArr = [];

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                /* console.log(childKey) */
                childKeysArr.push(childKey);
                childDataArr.push(childData);
                /* childKeys.push(childKey) */

            });
            setListNames(childKeysArr); //Set the list names 
            setListData(childDataArr);
            /* setListData(childData);  */
            /* setLists(snapshot.val()); */
            /* console.log(snapshot.val()) */

            /* console.log(listNames) */



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
            <ShoppingLists listNames={listNames} />
        </div>
    )
}

const ShoppingLists = ({ listNames }) => {

    console.log("CALL SHOPPING LIST")

    console.log(listNames)

    /* console.log(lists) */

    /* for (let key in lists) {
        console.log(key)
        console.log(lists[key])
    } */


    return (



        <ul>
            <button>My shopping lists</button>
            {listNames.map(listName => (
                <ListItem listName={listName} />
            ))}

        </ul>

    );
}

const ListItem = ({ listName }) => {



    /* for (let key in lists) {
        console.log(key)
        console.log(lists[key])
    } */

    return (
        <li>{listName}</li>
    )

}



/* let teams = [];
            for (let key of Object.keys(data.teams)) {
              teams.push({
                value: data.teams[key].id,
                label: data.teams[key].name,
              });
            }
            setTeamsArr(teams); */