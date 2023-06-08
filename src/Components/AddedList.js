import { useState } from 'react';
import {BsTrash} from 'react-icons/bs';
import Additems from './Additems';
const AddedList = () => {
    const list= {id:"",
    title:"",
    checked:""
};
    const [itemsList,setList]=useState([
       
    ])
  const [newTitle,setTitle]=useState("");
    const HandleCheck=(id)=>{
        const newItemsList=itemsList.map((items)=>(items.id===id ? {...items,checked:!items.checked} : items))
        setList(newItemsList);
    }

    const handleDelete=(id)=>{
        const newlist=itemsList.filter((items)=>items.id!==id );
        setList(newlist)
        window.localStorage.setItem("previousData",JSON.stringify(newlist));
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