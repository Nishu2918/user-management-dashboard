import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

export default function UserDetails(){
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(()=>{
    API.get(`/users/${id}`).then(res => setUser(res.data)).catch(()=>alert("Failed to load user"));
  }, [id]);

  if(!user) return <p className="small">Loading...</p>;
  return (
    <div>
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company || "-"}</p>
      <h4>Address</h4>
      <p>{user.address?.street || "-"}, {user.address?.city || "-"} - {user.address?.zip || "-"}</p>
      <p className="small">Geo: {user.address?.geo?.lat || "-"}, {user.address?.geo?.lng || "-"}</p>
      <Link to={`/edit/${user._id}`} className="btn">Edit</Link>
      <Link to="/" style={{marginLeft:8}}>Back</Link>
    </div>
  );
}
