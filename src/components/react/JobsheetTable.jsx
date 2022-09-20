 import React, {
   useState,
   useEffect
 } from 'react'

const JOBSHEETS_URL = 'http://192.168.1.252/server/active'

function update(id) {
  console.log("working");
}

    /*
    {data.map(x =>
      <div class="container">
        <div class="header">

          <button onClick={() => {
            update(x.id);
          }}>DONE!</button>
        
        </div>
        <div class="sheet" id={x.id}>
          <div class="field"><h2>ID</h2><p>{x.id}</p></div>
          <div class="field"><h2>Job Description</h2><p>{x.quote}</p></div>           
          <div class="field"><h2>Engineer</h2><p>{x.author}</p></div>                 
          <div class="field"><h2>Date</h2><p>{x.year}</p></div>                       
          <div class="field"><h2>Start Time</h2><p>{x.startTime}</p></div>            
          <div class="field"><h2>End Time</h2><p>{x.endTime}</p></div>                
          <div class="field"><h2>Equipment</h2><p>{x.equipment}</p></div>             
          <div class="field"><h2>Parts Used</h2><p>{x.partsUsed}</p></div>            
          <div class="field"><h2>Materials Used</h2><p>{x.materialsUsed}</p></div>    
          <div class="field"><h2>Further Action Required</h2><p>{x.furtherAction}</p></div>
          <div class="field"><h2>Location</h2><p>{x.location}</p></div>               
          <div class="field"><h2>Amendments</h2><p>{x.updateList}</p></div> 
        </div>
      </div>
    )} */

export default function JobsheetTable(){
  const [data, setData] = useState({users: [], isFetching: false});

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            setData((data) => ({users: data.users, isFetching: true}));
            const response = await fetch(JOBSHEETS_URL);
            setData({users: response.json(), isFetching: false});
        } catch (e) {
            console.log(e);
            setData((data) => ({users: data.users, isFetching: false}));
        }
    };
    fetchUsers();
  }, []);

  return (
    <>
    <div className="page">
    test
   
    </div>
    </>
  )
}

