import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoopIcon from '@mui/icons-material/Loop';
import { getDatabase, ref, set, onValue, update, remove } from "firebase/database";
import { AuthUserContext } from './App';
import { Link } from 'react-router-dom';
import QuantityComponent from './QuantityComponent';
import { GROCERY_ITEMS_DATA } from './data'
import { saveItem, deleteItem } from './firebase'
import { StyledLink } from './GlobalStyles';
import InfoIcon from '@mui/icons-material/Info';
import BackButton from './BackButton';



const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
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

const glowing = keyframes`
 0% { box-shadow: 0 0 1px 0.5px #f3453e}
 50% { box-shadow: 0 0 5px 0.5px #f3453e}
 100% { box-shadow: 0 0 1px 0.5px #f3453e}
`
const anm = keyframes`
 /* 0% { box-shadow: 0 0 8px 1px #3ef379}
 50% { box-shadow: 0 0 15px 10px #3ef379}
 100% { box-shadow: 0 0 8px 1px #3ef379} */
`
const Li = styled.li`
    /* display: flex; */
    background-color: #E1E1E1;
    color: #353535;
    font-weight: 500;
    padding: 5px;
    margin: 7px auto;
    border-radius: 10px;
    cursor: pointer;
    /* box-shadow: ${props => props.green_points < 3 ? '0 0 8px 1px #f3453e' : 'none'}; */
    animation: ${props => props.green_points < 3 ? 'glowing 1300ms infinite' : 'none'} ;
    animation-name: ${props => props.green_points < 3 ? glowing : anm};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    /* box-shadow: 0 0 32px 3.5px #f3453e; */
    /* align-items: center; */
    text-decoration: ${props => props.checked ? 'line-through' : 'none'};
    transition: 1s;
    position: relative;  //To set quantity and expand components relative to the Li
    ${props => {
        if (props.expand) {
            return `
            background-color: #D0D0D0;
            height: 100px;
            transition: 1s;
            section{
                display: block;
            }
            `;
        } else if (!props.expand) {
            return `
            section{
                display: none;
            }
            `;
        }
    }
    }
`

const SpanButton = styled.span`
    cursor: pointer;
    padding: 5px;
    color: #353535;
    :hover{
        color: #110b11;
    }
`

const QuantityContainerSpan = styled.span`
    position: absolute;
    right: 75px;
    top: 15px;
`

const Icon = styled(ExpandMoreIcon)`
    cursor: pointer;
    position: absolute;
    right: 25px;
    top: 15px;
`

const H1 = styled.h1`
    font-weight: bold;
    text-align: center;
`
const KlimatKvitto = styled.div`
    background-color: ${props => props.color};
    font-weight: bold;
    padding: 14px;
    border-radius: 10px;
    position: sticky;
    bottom: 5px;
`




export default function ShoppingList() {
    const location = useLocation();
    const listName = location.state?.name;
    const listId = location.state?.id;
    const newList = location.state?.new_list;



    const authUserId = useContext(AuthUserContext);

    const [listObjArr, setListObjectArr] = useState([]);
    const [groceryItemsArray, setGroceryItemsArray] = useState([]);


    useEffect(() => {

        let isMounted = true;

        setGroceryItemsArray(GROCERY_ITEMS_DATA)
        //When user create a new shopping list, save the empty list with the Shopping list name to db
        const db = getDatabase();
        if (newList && isMounted) {
            console.log(`Shopping List created with the name ${listName} `)
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
            }
        } else if (!newList && isMounted) {

            //If list is alreday created, avoid creating it
            //If so,load the data from db of the already created list
            const dbRef = ref(db, 'users/' + authUserId + '/lists/' + listName);

            onValue(dbRef, (snapshot) => {
                /* snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    console.log(childKey)
                    console.log(childData)
                }); */
                const openedListItemsObj = snapshot.val();

                let keys = [];
                let listsArr = [];
                let templistObjArr = [];

                for (let key in openedListItemsObj) {
                    if (key !== 'time_stamp') {  //Avoid adding time_stamp to the list of items
                        keys.push(key)
                        listsArr.push(openedListItemsObj[key])
                        templistObjArr.push({
                            value: key, label: openedListItemsObj[key].label, id: openedListItemsObj[key].id,
                            green_points: openedListItemsObj[key].green_points, isSelected: openedListItemsObj[key].isSelected,
                            category: openedListItemsObj[key].category, group: openedListItemsObj[key].group,
                            quantity: openedListItemsObj[key].quantity, quantity_type: openedListItemsObj[key].quantity_type
                        })
                    }

                }


                if (isMounted) {
                    setListObjectArr(templistObjArr);
                }

            }, {
                onlyOnce: true
            });
        }

        /* console.log(openedListItemsObj) */
        return () => {
            isMounted = false;
        }

    }, [])


    return (
        <MainContainer>
            <StyledLink to="/">
                <BackButton />
            </StyledLink>

            <H1>{listName}</H1>

            <SearchBar options={groceryItemsArray} listName={listName} authUserId={authUserId} listObjArr={listObjArr} />

            {/* <KlimatKvitto color={listObjArr.filter(x => x.green_points < 3).length >= 1 ? 'yellow' : 'green'} >
                Klimatkvitto
            </KlimatKvitto> */}


        </MainContainer>
    )
}

const SearchBar = ({ options, listName, authUserId, listObjArr }) => {


    const [myshoppingList, setMyShoppingList] = useState([]);


    var itemExist = false;
    /* --------------If user clicked on a already created list,fetch the list from db-------------------- */
    useEffect(() => {


        let isMounted = true;
        if (isMounted && listObjArr) {
            setMyShoppingList(
                ...myshoppingList,
                listObjArr
            );

        }
        return () => {
            isMounted = false;
        }
    }, [listObjArr])

    /* ---------------------------------- */


    const handleChange = (selectedItem) => {


        //Check temp array: to check if the selected item is alredy exist on the shopping list
        if (!myshoppingList.find(i => i.id === selectedItem.id)) {

            setMyShoppingList([
                ...myshoppingList,
                selectedItem
            ]);
            itemExist = false;
            /* console.log(myshoppingList) */
            ////1.Save the selected item to the db if the item not exist already
            const db = getDatabase();
            set(ref(db, 'users/' + authUserId + '/lists/' + listName + '/' + selectedItem.value), {
                id: selectedItem.id,
                label: selectedItem.label,
                green_points: selectedItem.green_points,
                quantity_type: selectedItem.quantity_type,
                quantity: '1',
                category: selectedItem.category,
                group: selectedItem.group,
                isSelected: false

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



    }

    const handleDeleted = (itemId) => {
        //Remove deleted item from myshoppingList array and setState to re-render 
        setMyShoppingList(myshoppingList.filter(item => item.id !== itemId));
    }

    return (
        <>


            <SearchBox>
                <Select options={options}
                    onChange={handleChange}
                />
            </SearchBox>
            <ShoppingItemsList myshoppingList={myshoppingList} authUserId={authUserId} listName={listName} handleDeleted={handleDeleted} />

            {/* Render the Klimatkvitto comp. only if there is items on shopping list && send bg color to styled components accroding to green points 
            => if there is at least one item that green_points are below 3, set bg yellow*/}
            {myshoppingList && !!myshoppingList.length && <KlimatKvitto color={myshoppingList.filter(x => x.green_points < 3).length >= 1 ? 'yellow' : 'green'} >
                Klimatkvitto
            </KlimatKvitto>}

        </>
    );
}

const ShoppingItemsList = ({ myshoppingList, authUserId, listName, handleDeleted }) => {


    return (
        <ShoppingListContainer>

            <Ul>
                {myshoppingList && myshoppingList?.map(item => (

                    <Item key={item.id} item={item} authUserId={authUserId} listName={listName} handleDeleted={handleDeleted} />

                ))}


            </Ul>
        </ShoppingListContainer>

    );
}

const Item = ({ item, authUserId, listName, handleDeleted }) => {

    const [expand, setExpand] = useState(false);
    const [checked, setChecked] = useState(false);
    const [greenPoints, setGreenPoints] = useState(null);

    useEffect(() => {
        if (item) {
            setChecked(item.isSelected);
            setGreenPoints(item.green_points);

            console.log("use effect item")
        }
        return () => {
            //cleanup
        }
    }, [])




    const handleOnClickExpand = () => {
        setExpand(!expand);
    }

    const handleChangeCheckbox = (e) => {
        setChecked(e.target.checked);
        updateListItem(e.target.checked);
    }

    const updateListItem = (isSelected) => {
        const db = getDatabase();

        update(ref(db, 'users/' + authUserId + '/lists/' + listName + '/' + item.value), {
            isSelected: isSelected
        })
            .then(() => {
                console.log("Item updated successfully")
            })
            .catch((error) => {
                console.log(error);
            })
        return () => {
        }
    }

    //UPDATE QUANTITY
    const handleCallback = (quantity) => {

        const db = getDatabase();

        if (quantity === 0) { //Delete an item from the list when user select quantity as 0

            remove(ref(db, 'users/' + authUserId + '/lists/' + listName + '/' + item.value))
                .then(() => {
                    console.log("Item deleted")
                    handleDeleted(item.id); ///Callback function to remove deleted item li from the list
                })
                .catch((error) => {
                    console.log(error);
                })
            return () => {
            }
        } else {

            update(ref(db, 'users/' + authUserId + '/lists/' + listName + '/' + item.value), {
                quantity: quantity
            })
                .then(() => {
                    console.log("Quantity updated successfully")
                })
                .catch((error) => {
                    console.log(error);
                })
            return () => {
            }
        }


    }


    return (
        <div>

            <Li expand={expand} checked={checked} green_points={greenPoints} onClick={handleOnClickExpand} > <Checkbox onChange={handleChangeCheckbox} checked={checked} /> {item.label} <Icon onClick={handleOnClickExpand} />
                <QuantityContainerSpan><QuantityComponent handleCallback={handleCallback} /></QuantityContainerSpan>

                <section>
                    <StyledLink to={{
                        pathname: "/climate-impact",
                        state: {
                            item: item
                        }
                    }}>
                        <SpanButton> <InfoIcon /> Klimat påverkan</SpanButton>
                    </StyledLink>
                    <br />
                    <StyledLink to={{
                        pathname: "/alternative",
                        state: {
                            item: item,
                            authUserId: authUserId,
                            listName: listName
                        }
                    }}>
                        <SpanButton><LoopIcon /> Alternativ på hållbara varor</SpanButton>
                    </StyledLink>

                </section>
            </Li>

        </div>
    )
}


//Home eken link eka click kalata ShoppingList eka rerender wenne nee,,, mokak hari ShoppingList con.log ekak wenas karala save kalahama re-render wenawa,
//Link eka click kalama state ekak wenas karala re-render ???