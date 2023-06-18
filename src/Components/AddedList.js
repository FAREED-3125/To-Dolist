import { useState,useEffect,useRef} from 'react';
import {BsTrash} from 'react-icons/bs';
import Additems from './Additems';
const AddedList = () => {
    const PREV_STATE="previousData";
    const FETCH_URL = " http://localhost:3500/items";
    const Focus = useRef();

    const [itemsList,setList]=useState([
       
    ]);
    const list= {id:"",
    title:"",
    checked:""
};
useEffect(()=>{
//    const FetchData = async () => {
//      try{
//         const response = await fetch(FETCH_URL);
//         if(!response.ok) throw new Error ("Fetch Data Failed");
//         const newList = await response.json();
       
//         const newList3= [...newList,...newList2];
//          setList(newList3);
//      }catch(err){
//         console.log(err);
//      }
    
//    }


//    FetchData();
const newList2= JSON.parse(localStorage.getItem(PREV_STATE));
setList(newList2);
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
        Focus.current.focus();
    }
    return (
           <div className="AddedList" style={{
            width:"100%",
           }}>
             <Additems newTitle={newTitle} Focus={Focus}  handleAdd={handleAdd} setTitle={setTitle}/>
            {
                itemsList.map((items)=>(
                    <div className="Addeditems" key={items.id}>
                        <input type="checkbox" checked={items.checked} className="checkInput" onChange={()=>HandleCheck(items.id)}/>
                        <h3 onDoubleClick={() => HandleCheck(items.id)} style={{textDecoration : items.checked ? "line-through" : null}}>{items.title}</h3>
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