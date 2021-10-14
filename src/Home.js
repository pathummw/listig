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
                /* console.log(childData) */

            });
            setListNames(childKeysArr); //Set the list names 
            setListData(childDataArr);
            /* setListData(childData);  */
            setLists(snapshot.val());
            /* console.log(snapshot.val()) */

            /* console.log(snapshot.val()) */



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
            {lists && <ShoppingLists lists={lists} />}
        </div>
    )
}

const ShoppingLists = ({ lists }) => {

    console.log("CALL SHOPPING LIST")

    console.log(lists)

    /* console.log(lists) */
    /*  let keys = [];
     let listsArr = [];
 
     for (let key in lists) {
         keys.push(key)
         listsArr.push(lists[key])
     }
  */
    let keys = [];
    let listsArr = [];
    let listObjArr = [];
    for (let key in lists) {
        keys.push(key)
        listsArr.push(lists[key])
        console.log(lists[key].time_stamp)

        listObjArr.push({ name: key, id: lists[key].time_stamp })
    }
    console.log(listObjArr)

    return (



        <ul>
            <button>My shopping lists</button>
            {listObjArr?.map(item => (
                <ListItem item={item} />
            ))}




        </ul>

    );
}

const ListItem = ({ item, listsArr }) => {

    const handleClick = (e) => {
        console.log(e)
    }


    /* console.log(listsArr) */

    /* for (let key in lists) {
        console.log(key)
        console.log(lists[key])
    } */
    /* {
        listName?.map(data => (
            console.log(data)
        ))
    } */

    return (
        <Link to={{
            pathname: "/shopping-list",
            state: {
                id: item.id,
                new_list: false,
                name: item.name
            }
        }}>
            <li key={item.id} onClick={() => handleClick(item.id)} >{item.name} and id : {item.id}</li>
        </Link>
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