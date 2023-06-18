import { MdOutlineAddBox } from 'react-icons/md';
import '../App.css'
const Additems = ({newTitle,handleAdd,setTitle}) => {
    
    return ( 
        <form action="" className="myForm" onSubmit={handleAdd}>
            <input type="text" autoFocus required className="AddInput" value={newTitle} onChange={(e)=>setTitle(e.target.value)}/>
            <button style={{color:"red",width:"20%", margin:"0px 15px",border:"none"}} type="submit" >
            <MdOutlineAddBox  style={{
                width:"70%",
                height:"70%"
            }}/></button>
        </form>
     );
}
 
export default Additems;