import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

const empty = {
  name: "", email: "", phone: "", company: "",
  address: { street: "", city: "", zip: "", geo: { lat: "", lng: "" } }
};

export default function UserForm(){
  const [data, setData] = useState(empty);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{
    if(id){
      API.get(`/users/${id}`).then(res => setData(res.data)).catch(()=>alert("Failed to load user"));
    }
  }, [id]);

  const validate = () => {
    const e = {};
    if(!data.name) e.name = "Name required";
    if(!data.email || !/.+@.+\..+/.test(data.email)) e.email = "Valid email required";
    if(!data.phone) e.phone = "Phone required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if(!validate()) return;
    try {
      if(id) await API.put(`/users/${id}`, data);
      else await API.post("/users", data);
      navigate("/");
    } catch (err) {
      alert("Save failed: " + (err?.response?.data?.message || err.message));
    }
  };

  const update = (path, value) => {
    setData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let cur = copy;
      for(let i=0;i<parts.length-1;i++) cur = cur[parts[i]];
      cur[parts[parts.length-1]] = value;
      return copy;
    });
  };

  return (
    <div>
      <h2>{id ? "Edit User" : "Add User"}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" placeholder="Name" value={data.name} onChange={e=>update("name", e.target.value)} />
        {errors.name && <span style={{color:'red'}}>{errors.name}</span>}
        <input className="input" placeholder="Email" value={data.email} onChange={e=>update("email", e.target.value)} />
        {errors.email && <span style={{color:'red'}}>{errors.email}</span>}
        <input className="input" placeholder="Phone" value={data.phone} onChange={e=>update("phone", e.target.value)} />
        {errors.phone && <span style={{color:'red'}}>{errors.phone}</span>}
        <input className="input" placeholder="Company" value={data.company} onChange={e=>update("company", e.target.value)} />
        <h4>Address</h4>
        <input className="input" placeholder="Street" value={data.address.street} onChange={e=>update('address.street', e.target.value)} />
        <input className="input" placeholder="City" value={data.address.city} onChange={e=>update('address.city', e.target.value)} />
        <input className="input" placeholder="Zip" value={data.address.zip} onChange={e=>update('address.zip', e.target.value)} />
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
          <input className="input" placeholder="Lat" value={data.address.geo.lat} onChange={e=>update('address.geo.lat', e.target.value)} />
          <input className="input" placeholder="Lng" value={data.address.geo.lng} onChange={e=>update('address.geo.lng', e.target.value)} />
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" type="submit">{id ? "Save" : "Create"}</button>
          <button type="button" className="btn" style={{background:'#6c757d'}} onClick={()=>navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
