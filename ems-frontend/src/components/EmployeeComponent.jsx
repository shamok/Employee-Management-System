import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const { id } = useParams();

    const navigator = useNavigate();

    // to get employee details for update
    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.log("Error in getting the data", error);
            })
        }
    }, { id })

    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        if (validateForm()) {
            const employee = { firstName, lastName, email };
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                    toastr.success('Employee created');
                }).catch(error => console.error(error));
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };
        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = "Please enter your first name.";
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = "Please enter your last name.";
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = "Please enter your email.";
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                    placeholder='Enter First Name'
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                                {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                    placeholder='Enter Last Name'
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                                {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email ID</label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter Email ID'
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent