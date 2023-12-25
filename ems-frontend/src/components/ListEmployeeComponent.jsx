import React, { useEffect, useState } from 'react'
import { deleteEmployeeById, getEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewEmployee() {
        navigator('/add-employee');
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function deleteEmployee(id) {
        deleteEmployeeById(id).then((response) => {
            console.log(response.data);
            getAllEmployees();
        })
    }

    return (
        <div className='container'>
            <h1 className='text-center'>List of Employees</h1>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-hover table-bordered table-responsive'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td><a href={`mailto:${employee.email}`} >{employee.email}</a></td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => deleteEmployee(employee.id)}
                                        style={{ marginLeft: '10px' }}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent