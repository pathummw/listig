import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
import styled from 'styled-components'
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { AuthUserContext } from './App'
import { Link } from 'react-router-dom'


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 20px;
`
const ShoppingListContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const SearchBox = styled.div`
    /* position: fixed;
    top: 100px; */
`
const Ul = styled.ul`
    list-style-type: none;
    padding: 0;
`
const Li = styled.li`
    display: flex;
    background-color: whitesmoke;
    color: #aaa;
    padding: 5px;
    margin: 5px auto;
    border-radius: 10px;
    align-items: center;
`
const Icon = styled(ExpandMoreIcon)`
    position: absolute;
    right: 25px;
`

export default function ShoppingList() {
    const location = useLocation();
    const listName = location.state?.name;
    const listId = location.state?.id;
    const newList = location.state?.new_list;

    let listObjArr = [];


    const authUserId = useContext(AuthUserContext);


    useEffect(() => {
        //When user create a new shopping list, save the empty list with the Shopping list name to db


        const db = getDatabase();
        if (newList) {
            console.log(`Shopping List created with the name ${listName}`)
            set(ref(db, 'users/' + authUserId + '/lists/' + listName + '/'), {
                time_stamp: Date.now()
            })
                .then(() => {
                    console.log("Created a new Shopping list successfully")
                })
                .catch((error) => {
                    console.log(error);
                })
            return () => {
                /* cleanup */
            }
        } else if (!newList) {



            console.log("Befintlig List")
            //If list is alreday created, avoid creating it
            //If so,load the data from db of the already created list
            const dbRef = ref(db, 'users/' + authUserId + '/lists/' + listName);






            onValue(dbRef, (snapshot) => {
                /* snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                }); */
                console.log(snapshot.val())
                const openedListItemsObj = snapshot.val();

                let keys = [];
                let listsArr = [];


                for (let key in openedListItemsObj) {
                    keys.push(key)
                    listsArr.push(openedListItemsObj[key])
                    /* console.log(openedListItemsObj[key]) */

                    listObjArr.push({ value: key, label: key, id: openedListItemsObj[key].id, green_points: openedListItemsObj[key].green_points })
                }
                console.log(listObjArr)

            }, {
                onlyOnce: true
            });
        }

        /* console.log(openedListItemsObj) */

    }, [])

    const options = [
        { value: 'chocolate', label: 'Chocolate', id: 112, green_points: 3 },
        { value: 'strawberry', label: 'Strawberry', id: 113, green_points: 4 },
        { value: 'vanilla', label: 'Vanilla', id: 114, green_points: 5 }
    ]

    return (
        <MainContainer>
            <h1>Here is your shopping list {listName}</h1>
            {console.log(listName)}
            <Link to="/">
                <button>Back to home</button>
            </Link>
            <SearchBar options={options} listName={listName} authUserId={authUserId} listObjArr={listObjArr} />

        </MainContainer>
    )
}

const SearchBar = ({ options, listName, authUserId, listObjArr }) => {


    const [myshoppingList, setMyShoppingList] = useState([]);

    var itemExist = false;
    console.log(listObjArr)
    /* --------------If user clicked on a already created list,fetch the list from db-------------------- */
    useEffect(() => {
        if (listObjArr) {
            setMyShoppingList(listObjArr);
        }
        return () => {
            //cleanup
        }
    }, [myshoppingList])

    /* ---------------------------------- */

    const handleChange = (selectedItem) => {



        //Check temp array: to check if the selected item is alredy exist on the shopping list
        if (!myshoppingList.find(i => i.id === selectedItem.id)) {

            setMyShoppingList([
                ...myshoppingList,
                selectedItem
            ]);
            itemExist = false;
            console.log(myshoppingList)
            ////1.Save the selected item to the db if the item not exist already
            const db = getDatabase();
            set(ref(db, 'users/' + authUserId + '/lists/' + listName + '/' + selectedItem.value), {
                id: selectedItem.id,
                quantity: '1kg',
                green_points: selectedItem.green_points
            })
                .then(() => {
                    console.log("Item saved successfully")
                })
                .catch((error) => {
                    console.log(error);
                })

        } else {
            itemExist = true;
            alert("Item  already exists")
        }




        console.log(myshoppingList)
        console.log(itemExist)




        function getEntireList() {
            console.log(itemExist)
            const db = getDatabase();
            const dbRef = ref(db, 'users/' + authUserId + '/lists/' + listName);

            onValue(dbRef, (snapshot) => {
                /* snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                }); */
                console.log(snapshot.val())
            }, {
                onlyOnce: true
            });
        }


    }

    return (
        <>


            <SearchBox>
                <Select options={options}
                    onChange={handleChange}
                />
            </SearchBox>
            <ShoppingItemsList myshoppingList={myshoppingList} />

        </>
    );
}

const ShoppingItemsList = ({ myshoppingList }) => {

    { console.log("ShoppingItemsList call") }
    console.log(myshoppingList)

    return (
        <ShoppingListContainer>

            <h3>Items list</h3>
            {/* <SwipeableList> */}
            <Ul>
                {console.log("Inside UL")}
                {myshoppingList.map(item => (
                    <Item key={item.id} item={item} />
                ))}
            </Ul>
            {/* </SwipeableList> */}
        </ShoppingListContainer>

    );
}

const Item = ({ item }) => {


    console.log("Inside ITEM")

    return (
        <div>
            {/* <SwipeableListItem
                swipeLeft={{
                    action: () => console.info('swipe action triggered')
                }}
                swipeRight={{
                    action: () => console.info('swipe action triggered')
                }}
            > */}
            <Li> <Checkbox /> {item.label}  <Icon /> </Li>

            {/* </SwipeableListItem> */}
        </div>
    )
}
