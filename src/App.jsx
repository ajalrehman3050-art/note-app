
import "./app.css";
import { useState,useRef,useEffect} from "react";





function MyNotes(){
  const[search,setSearch]=useState("")
  const[notes,setNotes]=useState(()=>{
    const save=localStorage.getItem("notes");
   return save
  ? JSON.parse(save).map((note) => ({
      ...note,
      date: new Date(note.date),
    }))
  : [];
  })
  const[title,setTitle]=useState("")
   const[content,setContent]=useState("")
   const [color, setColor] = useState("white");
   const [tag,setTag]=useState("")
   const [showArchived, setShowArchived] = useState(false);
  const tit= useRef(null)
  useEffect(()=>{
    tit.current.focus()
  },[]);
  useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);
   function removeNote(id) {
  setNotes(notes.filter((note) => note.id !== id));
}
function editNote(id) {
  const selectedNote = notes.find((note) => note.id === id);

  if (!selectedNote) return;

  setTitle(selectedNote.title);
  setContent(selectedNote.content);
  setTag(selectedNote.tag);
  setColor(selectedNote.color);
}
function togglePin(id) {
  setNotes(notes.map((note) =>
    note.id === id
      ? { ...note, pinned: !note.pinned }
      : note
  ));
}
function toggleArchive(id) {
  setNotes(notes.map((note) =>
    note.id === id
      ? { ...note, archived: !note.archived }
      : note
  ));
}
  function addNote(){
   
    let date=new Date()
    if (title.length > 100) {
  return alert("Only 100 characters allowed");
}
    if(content.trim()===""){
      return
    }
     for(let n of notes){
      if(n.title===title&& n.content===content){
        return alert("duplecite found in memory, you can search it")
      }
    }
    
    setNotes([{title,content,date,color,tag,pinned:false,id:Date.now(),archived: false},...notes])
    setTitle("")
    setContent("")
    setTag("")
   

  }
  let ser= [...notes].sort((a,b)=>Number(b.pinned) - Number(a.pinned)).filter((n)=>{
  return(
    n.archived===showArchived&&(
  n.title.toLowerCase(). includes(search.toLowerCase())||
  n.content.toLowerCase().includes(search.toLowerCase())||
  n.tag.toLowerCase().includes(search.toLowerCase())))
 }).map((note,id) => (
  <div key={note.id} style={{backgroundColor:note.color}} className="p-4 rounded-lg mb-3 shadow-sm" >
    <h2>{note.title}</h2>
    <p>{note.content}</p>
    <p>{note.date.toLocaleString()}</p>
    <p>{note.tag}</p>
    <button onClick={()=>removeNote(note.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Delete</button>
<button 
className="bg-blue-500 text-white px-4 py-2 rounded-md"
  onClick={() => {
    editNote(note.id);
    removeNote(note.id);
  }}
>
  Edit
</button>
<button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => togglePin(note.id)}>
  {note.pinned ? "📌 Pinned" : "📌 Pin"}
</button>   
<button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => toggleArchive(note.id)}>
  {note.archived ? "Unarchive" : "Archive"}
</button>

  </div>
))
  
  
  return (

  <div className="max-w-2xl mx-auto p-4">
  <h1 className="text-center text-lg font-bold my-4">My Notes</h1>

  <p className="text-center">Capture your thoughts</p>
  <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search"  className="border mb-4 rounded-md p-2 w-full"/><br/>
  <button
  onClick={() => setShowArchived(!showArchived)}
  className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
>
  {showArchived ? "View Active Notes" : "View Archived Notes"}
</button><br/>
  <p>{search}</p>
 {notes.length === 0 &&  (<p className="text-center text-gray-500 mb-4">No NOtes yet</p>)}
  {ser}
  {notes.length > 0 && ser.length === 0 && (
  <p>No matching notes found</p>
)}
 <span>{title.length}/100</span>
  <input ref={tit} value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Note Title" className="border rounded-md p-2 w-full mb-2"/>
  <p>{content.length}/♾️</p>
  <textarea value={content} onChange={(e)=>{setContent(e.target.value)}} placeholder="what 's up on your mind today" className="focus:border-blue-500 border focus:outline-none mb-4 bg-white rounded-md p-2 w-full h-32"/>
    
    <input value={tag} onChange={(e)=>setTag(e.target.value)} placeholder="enter tag"/>
  <button  onClick={addNote} className="bg-blue-500 text-white px-4 py-2 rounded-md" >Add Note</button>
      <select value={color} onChange={(e)=>setColor(e.target.value)} className="border rounded-md p-2 mb-2">
      <option value={"white"}>white</option>
      <option value={"pink"}>light pink</option>
      <option value={"red"}>red</option>
      <option value={"yellow"}>yellow</option>
      <option value={"light blue"}>light blue</option>
      </select>
   
  </div>
 
  )
 
}
export default MyNotes;