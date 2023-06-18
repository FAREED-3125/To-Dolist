import { useState,useEffect,useRef} from 'react';
import {BsTrash} from 'react-icons/bs';
import Additems from './Additems';
const AddedList = () => {
    const PREV_STATE="previousData";
    const FETCH_URL = " http://localhost:3500/items";

    const [itemsList,setList]=useState([
       
    ]);
    const list= {id:"",
    title:"",
    checked:""
};
useEffect(()=>{
   const FetchData = async () => {
     try{
        const response = await fetch(FETCH_URL);
        if(!response.ok) throw new Error ("Fetch Data Failed");
        const newList = await response.json();
        console.log(newList);
         setList(newList);
     }catch(err){
        console.log(err);
     }
    
   }

   (async () => FetchData())();
},[])
 
 useEffect(()=>{
    localStorage.setItem(PREV_STATE,JSON.stringify(itemsList));
 },[itemsList])


 
  const [newTitle,setTitle]=useState("");
    const HandleCheck=(id)=>{
        const newItemsList=itemsList.map((items)=>(items.id===id ? {...items,checked:!items.checked} : items))
        setList(newItemsList);
    }

    const handleDelete=(id)=>{
        const newlist=itemsList.filter((items)=>items.id!==id );
        setList(newlist)
       
    }
    const handleAdd=(event)=>{
        event.preventDefault();
        const id=itemsList.length+1;
        const newObject=Object.create(list);
        newObject.id=id;
        newObject.title=newTitle;
        newObject.checked=false;
        const newItemsArr=[...itemsList,newObject];
        setList(newItemsArr);
        setTitle('');
    }
    return (
           <div className="AddedList" style={{
            width:"100%",
           }}>
             <Additems newTitle={newTitle}  handleAdd={handleAdd} setTitle={setTitle}/>
            {
                itemsList.map((items)=>(
                    <div className="Addeditems" key={items.id}>
                        <input type="checkbox" checked={items.checked} className="checkInput" onChange={()=>HandleCheck(items.id)}/>
                        <h3>{items.title}</h3>
                        <div>
                            <BsTrash className="trash" onClick={()=>handleDelete(items.id)}/>
                        </div>
                    </div>
                ))
            }
           </div>
     );
}
 
export default AddedList;