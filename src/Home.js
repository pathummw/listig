import React, { useEffect, useState, useContext } from 'react'
import { doSignOut } from "./firebase"
import { Link, useHistory } from 'react-router-dom'
import { AuthUserContext } from './App'
import { getDatabase, ref, set, onValue } from "firebase/database";
import styled from 'styled-components';
import { StyledLink } from './GlobalStyles';
import HandsImage from './img/hands.svg'
import { devices } from './GlobalStyles';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-image: url(${HandsImage});
    background-repeat: no-repeat;
    background-size: 100%; 
    @media ${devices.iPhone5}{
        background-position: bottom;
    }
`

const Ul = styled.ul`
    list-style-type: none;
    padding: 0;
    width: 100%;
`

const Li = styled.li`
    display: flex;
    align-items: center;
    margin: 10px;
    text-decoration: none;
    border-radius: 10px;
    background-color: #E1E1E1;
    color: #353535;
    padding: 10px;
    font-weight: bold;
`

const NewListButton = styled(Link)`
    text-decoration: none;
    background: #FFFFFF;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 10px;
    width: 70%;
    position: fixed;
    bottom: 10px;
    margin: 0 30px;
    padding: 10px 30px;
    color: #000000;
    font-weight: bold;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const PlusIcon = styled(AddIcon)`
    cursor: pointer;
    position: absolute;
    right: 10px;
`

const MyListIcon = styled(ListIcon)`
    padding-right: 10px;
    color: #353535;
`

const MoreIcon = styled(MoreHorizIcon)`
    position: absolute;
    right: 25px;
    color: #353535;
`

const SignoutIcon = styled(ExitToAppIcon)`
    color: #B9B9B9;
    :hover{
        color: #121212;
    }
    padding-right: 3px;
`

const SignoutButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin: 10px 0;
    color: #B9B9B9;
    background-color: transparent;
    :hover{
        color: #121212;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-right: 20px;
    
`


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
                /* setListNames(childKeysArr);  *///Set the list names 
                /* setListData(childDataArr); */
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
        /* setError('') */

        try {
            await doSignOut()
            history.push('/signin')
        } catch {
            /* setError('Failed to sign out') */
            console.log('Failed to sign out')
        }

    }

    return (
        <HomeContainer>
            <ButtonContainer>
                <SignoutButton onClick={() => handleSignOut()} > <SignoutIcon fontSize="small" /> Sign out</SignoutButton>
            </ButtonContainer>

            {/* <StyledSpan> */}
            <NewListButton to="/create-new-list"> <PlusIcon /> Ny lista</NewListButton>
            {/* </StyledSpan> */}

            {loading && <div>Loading ...</div>}

            {lists && <ShoppingLists lists={lists} />}
        </HomeContainer>
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

        <Ul>

            {listObjArr?.map(item => (
                <ListItem key={item.id} item={item} />
            ))}

        </Ul>

    );
}

const ListItem = ({ item, listsArr }) => {

    const handleClick = (e) => {
        /* console.log(e) */
    }


    return (
        <StyledLink key={item.id} to={{
            pathname: "/shopping-list",
            state: {
                id: item.id,
                new_list: false,
                name: item.name
            }
        }}
        >
            <Li onClick={() => handleClick(item.id)} > <MyListIcon />  {item.name} <MoreIcon /> </Li>   {/* and id : {item.id} */}
        </StyledLink>
    )

}

