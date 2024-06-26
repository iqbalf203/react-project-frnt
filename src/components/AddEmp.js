import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeService from '../services/EmployeeService';

const AddEmp = () => {


    const [employee,setEmployee] = useState({name:'',email:'',salary:'',aadhaar:''});
    const [errors,setErrors] = useState({});

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        if (employee.name.length <4) {
            newErrors.name = "Name should have more than 4 characters.";
            isValid = false;
        }
        if (employee.salary <= 0) {
            newErrors.salary = "Salary should be greater than 0.";
            isValid = false;
        }
        if (employee.aadhaar.length !== 12) {
            newErrors.aadhaar = "Aadhaar should be of 12 digits.";
            isValid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(employee.email)) {
            newErrors.email = "Not a valid email";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const creatEmployee = (e)=>{
        e.preventDefault()
        
       if(validateForm()){
        EmployeeService.addEmployee(employee).then((resp)=>{
        toast.info('Record Created for: '+resp.data.name)
        setEmployee({name:'',email:'',salary:'',aadhaar:''})
        
    }).catch((err)=>{
        toast.error('Server down, Please try again later!')
    })
}}

    const handleChange = (e)=>{
        setEmployee({...employee,[e.target.name]:e.target.value});
        setErrors({ ...errors, [e.target.name]: '' });
    }
  return (
    <>
    
        <form className="form-group" onSubmit={creatEmployee} style={{width:'30%'}}>
        <br/><input className="form-control" placeholder='Name' name='name' value={employee.name} onChange={handleChange}></input>
            {errors.name && <span>{errors.name}</span>}<br/>
            <input type='text' className="form-control" placeholder='Email' name='email' value={employee.email}  onChange={handleChange}></input>
            {errors.email && <span>{errors.email}</span>}<br/>
            <input type='number' className="form-control" placeholder='Aadhaar' name='aadhaar' value={employee.aadhaar}  onChange={handleChange}></input>
            {errors.salary && <span>{errors.aadhaar}</span>}<br/>
            <input type='number' className="form-control" placeholder='Salary' name='salary' value={employee.salary}  onChange={handleChange}></input>
            {errors.salary && <span>{errors.salary}</span>}<br/>
            
            <button className="btn btn-primary" type='submit'>Submit</button>
        </form>
        <ToastContainer/>
    </>
  )
}

export default AddEmp