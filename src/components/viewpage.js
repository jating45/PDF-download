import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../database/firebase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import Footer from "./footor"; 

const Viewpage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        setUsers(users.filter((user) => user.id !== id)); // Remove from state
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  const handleDownloadCSV = () => {
    const csvContent = [
      ["First Name", "Last Name", "Age", "Job Title", "Phone", "Email", "Address"],
      ...users.map((user) => [
        user.firstName,
        user.lastName,
        user.age,
        user.jobTitle,
        user.phoneNumber,
        user.email,
        user.address,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleViewPDF = (user) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("User Details", 15, 20);
    doc.setFontSize(12);
  
    const userData = [
      ["First Name", user.firstName],
      ["Last Name", user.lastName],
      ["Age", user.age],
      ["Job Title", user.jobTitle],
      ["Phone", user.phoneNumber],
      ["Email", user.email],
      ["Address", user.address],
    ];
  
    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: userData,
    });
  
  
    window.open(doc.output("bloburl"), "_blank");
  };
  

  const handleDownloadPDF = (user) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("User Details", 15, 20);
    doc.setFontSize(12);

    const userData = [
      ["First Name", user.firstName],
      ["Last Name", user.lastName],
      ["Age", user.age],
      ["Job Title", user.jobTitle],
      ["Phone", user.phoneNumber],
      ["Email", user.email],
      ["Address", user.address],
    ];

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: userData,
    });

    doc.save(`${user.firstName}_Details.pdf`);
  };

  return (
    <div className="container mt-5">
 
      <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded shadow-sm">
        <h2 className="text-primary fw-bold m-0">📋 User Management</h2>
        <button className="btn btn-outline-dark btn-lg" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>


      <div className="d-flex justify-content-end my-3">
        <button className="btn btn-success btn-lg px-4" onClick={handleDownloadCSV}>
          📥 Download CSV
        </button>
      </div>

      
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading data...</p>
        </div>
      ) : users.length === 0 ? (
        <p className="text-center text-danger fs-4">No users found.</p>
      ) : (
        <>
      
          <div className="table-responsive">
            <table className="table table-hover table-bordered shadow-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Job Title</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.age}</td>
                    <td>{user.jobTitle}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td className="text-center">
                      <div className="btn-group">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleViewPDF(user)}
                        >
                          👁️ View
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleDownloadPDF(user)}
                        >
                          📄 PDF
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(user.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

  
      <Footer />
    </div>
  );
};

export default Viewpage;
