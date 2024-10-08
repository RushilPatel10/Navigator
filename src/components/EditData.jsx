import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditData() {
  let [data, setData] = useState({});
  let [hobby, setHobby] = useState([]);
  let navigater = useNavigate();
  let { id } = useParams();

  let fetchData = () => {
    fetch(`http://localhost:3000/user/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setHobby(data.hobby);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let handleInput = (e) => {
    let { name, value } = e.target;
    let newHobby = [...hobby];
    if (name === "hobby") {
      if (e.target.checked) {
        newHobby.push(value);
      } else {
        let pos = newHobby.findIndex((v) => value === v);
        newHobby.splice(pos, 1);
      }
      value = newHobby;
    }
    setHobby(newHobby);
    setData({ ...data, [name]: value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/user/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.info("Data Updated..");
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      navigater("/userRecode");
    }, 500);
  };

  return (
    <div className="form-container">
      <form method="post" onSubmit={handleSubmit}>
        
          <h2 className="form-title">Edit User Data</h2>
          <Link to="/userRecode" className="view-record-link">
            View Recode
          </Link>

          
            <div className="form-group">
              <label>UserName</label>
              <input
                type="text"
                name="username"
                value={data.username || ""}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
          <label>Email</label>
          <input type="text" name="email"  value={data.email || ""}
                 onChange={handleInput} />
         
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password"  value={data.password || ""} onChange={handleInput} />
        
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            <input type="radio" name="gender" value="male"    onChange={handleInput}
                  checked={data.gender === "male" ? "checked" : ""}
                />{" "} Male
            <input type="radio" name="gender" value="female" onChange={handleInput}
                  checked={data.gender === "female" ? "checked" : ""}
                />{" "}
          </div>
         
        </div>

        <div className="form-group">
          <label>Hobby</label>
          <div className="hobby-options">
            <input type="checkbox" name="hobby" value="Dance"   onChange={handleInput}
                  checked={hobby.includes("Dance") ? "checked" : ""}
                />{" "}
                Dance
            <input type="checkbox" name="hobby" value="Writing"  onChange={handleInput}
                  checked={hobby.includes("Writing") ? "checked" : ""}
                />{" "}
                Writing
          </div>
         
        </div>

        <div className="form-group">
          <label>City</label>
          <select name="city" onChange={handleInput}  value={data.city || ""}>
            <option value="" disabled selected>--select-city--</option>
            <option value="surat">Surat</option>
            <option value="pune">Pune</option>
          </select>
        
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea name="address"   value={data.address || ""} onChange={handleInput}></textarea>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Record" className="submit-btn" />
        </div>

           
        
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default EditData;
