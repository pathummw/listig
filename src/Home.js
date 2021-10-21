import React, { useEffect, useState, useContext } from 'react'
import { doSignOut } from "./firebase"
import { Link, useHistory } from 'react-router-dom'
import { AuthUserContext } from './App'
import { getDatabase, ref, set, onValue } from "firebase/database";
import { DisabledByDefaultRounded } from '@mui/icons-material';

export default function Home(props) {

    const [error, setError] = useState('');
    const [lists, setLists] = useState([]);
    const history = useHistory();
    const authUserId = useContext(AuthUserContext);

    const [listNames, setListNames] = useState([]);
    const [listData, setListData] = useState([]);
    const [loading, setLLoading] = useState(false);

    useEffect(() => {

        setLLoading(true);

        let isMounted = true;
        //Get all the saved lists from db that belongs to signed in user
        const db = getDatabase();
        const dbRef = ref(db, 'users/' + authUserId + '/lists/');


        let childKeysArr = [];
        let childDataArr = [];

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                childKeysArr.push(childKey);
                childDataArr.push(childData);

            });

            if (isMounted) {
                setListNames(childKeysArr); //Set the list names 
                setListData(childDataArr);
                setLists(snapshot.val());
            }


            setLLoading(false);

        }, {
            onlyOnce: true
        });
        return () => {
            isMounted = false;
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

            {loading && <div>Loading ...</div>}

            {lists && <ShoppingLists lists={lists} />}
        </div>
    )
}

const ShoppingLists = ({ lists }) => {


    let keys = [];
    let listsArr = [];
    let listObjArr = [];

    for (let key in lists) {
        keys.push(key)   //key = Shopping list name ex."Handla okt 12"
        listsArr.push(lists[key]) //individual items that "Handla okt 12" shopping list has
        listObjArr.push({ name: key, id: lists[key].time_stamp })
    }

    return (

        <ul>

            {listObjArr?.map(item => (
                <ListItem key={item.id} item={item} />
            ))}

        </ul>

    );
}

const ListItem = ({ item, listsArr }) => {

    const handleClick = (e) => {
        /* console.log(e) */
    }


    return (
        <Link key={item.id} to={{
            pathname: "/shopping-list",
            state: {
                id: item.id,
                new_list: false,
                name: item.name
            }
        }}
        >
            <li onClick={() => handleClick(item.id)} >{item.name} and id : {item.id}</li>
        </Link>
    )

}

