import React, { useState, useEffect } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import  { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listFlights } from './graphql/queries';
import awsconfig from './aws-exports';
import { createFlight as createFlightMutation,updateFlight as updateFlightMutation, deleteFlight as deleteFlightMutation } from './graphql/mutations';

Amplify.configure(awsconfig);
const initialFormState = { name: '', price:0 ,to:'',from:'',time:'',date:'' }
const initialedit = {id:'', name: '', price:0 ,to:'',from:'',time:'',date:'' }

function App() {
  const [flights, setFlight] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [edit,setEdit]=useState(initialedit);
  const [isedit,setIsedit]=useState(0);
  useEffect(() => {
    fetchFlights();
  }, [edit]);

  async function fetchFlights() {
    const apiData = await API.graphql(graphqlOperation(listFlights));
    const flightList=(apiData.data.listFlights.items);
    console.log(flightList);
    setFlight(flightList);
  }
  async function createFlight() {
    if (!formData.name || !formData.to || !formData.price||!formData.time||!formData.date) return;
    await API.graphql({ query: createFlightMutation, variables: { input: formData } });
    setFlight([ ...flights, formData ]);
    setFormData(initialFormState);
  }

  async function updateFlight() {
    if (!edit.name || !edit.to || !edit.price||!edit.time||!edit.date) return;
   console.log(edit);
    await API.graphql({ query: updateFlightMutation, variables: { input: edit } });
    setFormData(initialFormState);
    setEdit(initialedit);

    setIsedit(0);

  }
  function displayFlight({id}) {
     const  currFlight=flights.filter(flight => flight.id===id);
     setEdit({'id':currFlight[0].id,'name': currFlight[0].name, 'price':currFlight[0].price ,'to':currFlight[0].to ,'from':currFlight[0].from ,'time':currFlight[0].time ,'date':currFlight[0].date})
      setIsedit(1);

    }
  async function deleteFlight({ id }) {
    const newFlightArray = flights.filter(flight => flight.id !== id);
    setFlight(newFlightArray);
    
    await API.graphql({ query: deleteFlightMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>My Flight App</h1>
      <div>
      {isedit===0 ? (
        <div>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Flight name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'price': e.target.value})}
        placeholder="Flight price"
        value={formData.price}
      />
         <input
        onChange={e => setFormData({ ...formData, 'to': e.target.value})}
        placeholder="Flight to"
        value={formData.to}
      />
        <input
        onChange={e => setFormData({ ...formData, 'from': e.target.value})}
        placeholder="Flight from"
        value={formData.from}
      />
        <input
        onChange={e => setFormData({ ...formData, 'date': e.target.value})}
        placeholder="Flight date"
        value={formData.date}
      />
        <input
        onChange={e => setFormData({ ...formData,'time':e.target.value})}
        placeholder="Flight time"
        value={formData.time}
      />
     <button onClick={createFlight}>Create Flight</button>
     </div>
     ) : (
      <div>
      <input
        onChange={e => setEdit({ ...edit, 'name': e.target.value})}
        placeholder="Flight name"
        value={edit.name}
      />
      <input
        onChange={e => setEdit({ ...edit, 'price': e.target.value})}
        placeholder="Flight price"
        value={edit.price}
      />
         <input
        onChange={e => setEdit({ ...edit, 'to': e.target.value})}
        placeholder="Flight to"
        value={edit.to}
      />
        <input
        onChange={e => setEdit({ ...edit, 'from': e.target.value})}
        placeholder="Flight from"
        value={edit.from}
      />
        <input
        onChange={e => setEdit({ ...edit, 'date': e.target.value})}
        placeholder="Flight date"
        value={edit.date}
      />
        <input
        onChange={e => setEdit({ ...edit,'time':e.target.value})}
        placeholder="Flight time"
        value={edit.time}
      />
     <button onClick={updateFlight}>Update Flight</button>
     </div>
     )
       }
       </div>
      <div style={{marginBottom: 30}}>
        {
          flights.map(flight => (
            <div key={flight.id}>
              <h2>{flight.name}</h2>
              <p>{flight.price}</p>
              <p>{flight.date}</p>
              <p>{flight.from}</p>
              <p>{flight.to}</p>
              <p>{flight.time}</p>
              <button onClick={() => displayFlight(flight)}>Edit flight</button>
              <button onClick={() => deleteFlight(flight)}>Delete flight</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default withAuthenticator(App);