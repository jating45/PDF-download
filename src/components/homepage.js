import React, { useState } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CContainer,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CFormFeedback,
  CButton,
  CFormTextarea,
  CRow,
  CCol
} from "@coreui/react";
import Header from "./header";
import Footer from "./footor";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../database/firebase";

const Homepage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    jobTitle: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.age || formData.age < 18 || formData.age > 99) newErrors.age = "Age must be between 18 and 99";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Phone number must be 10 digits";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await addDoc(collection(db, "users"), formData);
      alert("Data submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        jobTitle: "",
        phoneNumber: "",
        email: "",
        address: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Header />
      <CContainer className="mt-5 flex-grow-1 d-flex justify-content-center">
        <CCard className="shadow-lg p-4" style={{ maxWidth: "600px", width: "100%" }}>
          <CCardBody>
            <h2 className="text-center text-primary mb-4">User Registration</h2>
            <CForm onSubmit={handleSubmit}>
              <CRow className="g-3">
                <CCol xs={12}>
                  <CFormLabel>First Name</CFormLabel>
                  <CFormInput
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    invalid={!!errors.firstName}
                    placeholder="Enter your first name"
                  />
                  <CFormFeedback invalid>{errors.firstName}</CFormFeedback>
                </CCol>

                <CCol xs={12}>
                  <CFormLabel>Last Name</CFormLabel>
                  <CFormInput
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    invalid={!!errors.lastName}
                    placeholder="Enter your last name"
                  />
                  <CFormFeedback invalid>{errors.lastName}</CFormFeedback>
                </CCol>

                <CCol xs={12}>
                  <CFormLabel>Age</CFormLabel>
                  <CFormInput
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    invalid={!!errors.age}
                    placeholder="Enter your age"
                  />
                  <CFormFeedback invalid>{errors.age}</CFormFeedback>
                </CCol>

                <CCol xs={12}>
                  <CFormLabel>Job Title</CFormLabel>
                  <CFormInput
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    invalid={!!errors.jobTitle}
                    placeholder="Enter your job title"
                  />
                  <CFormFeedback invalid>{errors.jobTitle}</CFormFeedback>
                </CCol>

                <CCol xs={12}>
                  <CFormLabel>Phone Number</CFormLabel>
                  <CFormInput
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    invalid={!!errors.phoneNumber}
                    placeholder="Enter 10-digit phone number"
                  />
                  <CFormFeedback invalid>{errors.phoneNumber}</CFormFeedback>
                </CCol>

                <CCol xs={12}>
                  <CFormLabel>Email</CFormLabel>
                  <CFormInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    invalid={!!errors.email}
                    placeholder="Enter your email"
                  />
                  <CFormFeedback invalid>{errors.email}</CFormFeedback>
                </CCol>

                <CCol xs={12}>
                  <CFormLabel>Address</CFormLabel>
                  <CFormTextarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    invalid={!!errors.address}
                    placeholder="Enter your address"
                  />
                  <CFormFeedback invalid>{errors.address}</CFormFeedback>
                </CCol>

                <CCol xs={12}>
                  <CButton type="submit" color="primary" className="w-100" style={{ padding: "10px", fontSize: "16px" }}>
                    Submit
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CContainer>
      <Footer />
    </div>
  );
};

export default Homepage;
