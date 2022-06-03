import React, { useState, useEffect } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import  { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listMedicines } from './graphql/queries';
import awsconfig from './aws-exports';
import Marquee from "react-fast-marquee";
import { createMedicine as createMedicineMutation,updateMedicine as updateMedicineMutation, deleteMedicine as deleteMedicineMutation } from './graphql/mutations';

Amplify.configure(awsconfig);
const initialFormState = { MedicineName: '', Cost:0 ,Qty:0,CompanyName:'',ExpiryDate:'' }
const initialedit = {id:'', MedicineName: '', Cost:0 ,Qty:0,CompanyName:'',ExpiryDate:'' }


function App() {
  const [medicines, setMedicine] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [edit,setEdit]=useState(initialedit);
  const [isedit,setIsedit]=useState(0);
  useEffect(() => {
    fetchMedicines();
  }, [edit]);

  async function fetchMedicines() {
    const apiData = await API.graphql(graphqlOperation(listMedicines));
    const medicineList=(apiData.data.listMedicines.items);
    console.log(medicineList);
    setMedicine(medicineList);
  }
  async function createMedicine() {
    if (!formData.MedicineName || !formData.Cost || !formData.Qty ||!formData.ExpiryDate||!formData.CompanyName) return;
    await API.graphql({ query: createMedicineMutation, variables: { input: formData } });
    setMedicine([ ...medicines, formData ]);
    setFormData(initialFormState);
  }

  async function updateMedicine() {
    if (!edit.CompanyName || !edit.Cost || !edit.Qty||!edit.ExpiryDate||!edit.CompanyName) return;
   console.log(edit);
    await API.graphql({ query: updateMedicineMutation, variables: { input: edit } });
    setFormData(initialFormState);
    setEdit(initialedit);

    setIsedit(0);

  }
  function displayMedicine({id}) {
     const  currMedicine=medicines.filter(medicine => medicine.id===id);
     setEdit({'id':currMedicine[0].id,'MedicineName': currMedicine[0].MedicineName, 'Cost':currMedicine[0].Cost ,'Qty':currMedicine[0].Qty ,'CompanyName':currMedicine[0].CompanyName ,'ExpiryDate':currMedicine[0].ExpiryDate})
      setIsedit(1);

    }
  async function deleteMedicine({ id }) {
    const newMedicineArray = medicines.filter(medicine => medicine.id !== id);
    setMedicine(newMedicineArray);
    
    await API.graphql({ query: deleteMedicineMutation, variables: { input: { id } }});
  }

  return (
    
    <div className="App" style={{backgroundColor: "black"}}>
      <h1 style={{color: "pink"}}>Medical Shop Details</h1>
      <div>
      {isedit===0 ? (
        <div>
      <input
        onChange={e => setFormData({ ...formData, 'MedicineName': e.target.value})}
        placeholder="Medicine name"
        value={formData.MedicineName}
      />
      <input
        onChange={e => setFormData({ ...formData, 'Cost': e.target.value})}
        placeholder=" Medicine cost"
        value={formData.Cost}
      />
         <input
        onChange={e => setFormData({ ...formData, 'Qty': e.target.value})}
        placeholder="Quantity"
        value={formData.Qty}
      />
        <input
        onChange={e => setFormData({ ...formData, 'CompanyName': e.target.value})}
        placeholder="Company Name"
        value={formData.CompanyName}
      />
        <input
        onChange={e => setFormData({ ...formData, 'ExpiryDate': e.target.value})}
        placeholder="Expiry Date"
        value={formData.ExpiryDate}
      />
       
     <button style={{backgroundColor: "pink"}}onClick={createMedicine}>Add New Medicine</button>
     </div>
     ) : (
      <div>
      <input
        onChange={e => setEdit({ ...edit, 'MedicineName': e.target.value})}
        placeholder="Medicine name"
        value={edit.MedicineName}
      />
      <input
        onChange={e => setEdit({ ...edit, 'Cost': e.target.value})}
        placeholder="Medicine Cost"
        value={edit.Cost}
      />
         <input
        onChange={e => setEdit({ ...edit, 'Qty': e.target.value})}
        placeholder="Qty"
        value={edit.Qty}
      />
        <input
        onChange={e => setEdit({ ...edit, 'CompanyName': e.target.value})}
        placeholder="Company Name"
        value={edit.CompanyName}
      />
        <input
        onChange={e => setEdit({ ...edit, 'ExpiryDate': e.target.value})}
        placeholder="Expiry date"
        value={edit.ExpiryDate}
      />
       
     <button style={{backgroundColor: "pink"}} onClick={updateMedicine}>Update Medicine</button>
    
     </div>
     )
       }
       </div>
       <Marquee style={{color: "white"}} >The app allows you to create,update,read and delete for a medical store</Marquee>
      <div>
        {
        

          medicines.map(medicine => (
            <div key={medicine.id}>
              <p  style={{color: "white",fontFamily:"Chilanka",fontSize:18}}>Medicine Name: {medicine.MedicineName}</p>
             <p style={{color: "white",fontFamily:"Chilanka",fontSize:18}}>Medicine Cost: {medicine.Cost}</p>
              <p  style={{color: "white",fontFamily:"Chilanka",fontSize:18}}>Quantity: {medicine.Qty}</p>
              <p  style={{color: "white",fontFamily:"Chilanka",fontSize:18}}>Company Name: {medicine.CompanyName}</p>
              <p  style={{color: "white",fontFamily:"Chilanka",fontSize:18}}>Expiry Date: {medicine.ExpiryDate}</p>
              
              <button style={{backgroundColor: "pink"}}onClick={() => displayMedicine(medicine)}>Edit Medicine</button>  
              <button style={{backgroundColor: "pink"}}onClick={() => deleteMedicine(medicine)}>Delete Medicine</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default withAuthenticator(App);