import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserRecode() {
    let [user, setUser] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetchRecode();
    }, []);

    let fetchRecode = () => {
        fetch("http://localhost:3000/user", {
            method: "GET"
        }).then(async (res) => {
            let data = await res.json();
            setUser(data);
        }).catch((err) => {
            console.log(err);
        });
    };

    let deleteData = (id) => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: "DELETE"
        }).then(() => {
            console.log("Data Deleted");
            fetchRecode();
        }).catch((err) => {
            console.log(err);
        });
    };

    let editData = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="container">
            <h2 className="heading">User Data</h2>
            <Link to="/" className="add-record-link">Add Record</Link>

            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Username</th>
                        <th className="th">Email</th>
                        <th className="th">Password</th>
                        <th className="th">Gender</th>
                        <th className="th">Hobby</th>
                        <th className="th">City</th>
                        <th className="th">Address</th>
                        <th className="th">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((user) => (
                            <tr key={user.id} className="tr">
                                <td className="td">{user.username}</td>
                                <td className="td">{user.email}</td>
                                <td className="td">{user.password}</td>
                                <td className="td">{user.gender}</td>
                                <td className="td">{user.hobby.toString()}</td>
                                <td className="td">{user.city}</td>
                                <td className="td">{user.address}</td>

                                <td className="td">
                                    <button onClick={() => deleteData(user.id)} className="delete-btn">Delete</button>
                                    <button onClick={() => editData(user.id)} className="edit-btn">Edit</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default UserRecode;
