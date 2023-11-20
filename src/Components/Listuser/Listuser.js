// import React from 'react'
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import {
//     useDeleteUserMutation,
//     useGetUsersQuery,
// } from "../../redux/api";
// import Swal from 'sweetalert2';

// const schema = yup.object({
//     firstName: yup.string().required("First Name is required"),
//     lastName: yup.string().required("Last Name is required"),
//     email: yup.string().required("Email is required").email("Email is invalid"),
//     password: yup
//         .string()
//         .min(6, "Password must be at least 6 characters")
//         .required("Password is required"),
//     confirmPassword: yup
//         .string()
//         .oneOf([yup.ref("password")], "Passwords must match")
//         .required("Confirm Password is required"),
//     acceptTerms: yup.bool().oneOf([true], "Accept Ts & Cs is required"),
// });
// const Listuser = () => {
//     const navigate = useNavigate();
//     const [deleteData] = useDeleteUserMutation();

//     const { data, isLoading, isError } = useGetUsersQuery();

//     const users = data && data.data ? data.data : [];
//     const handleDelete = (id) => {
//         Swal.fire({
//           title: 'Are you sure?',
//           text: "You won't be able to revert this!",
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonColor: '#3085d6',
//           cancelButtonColor: '#d33',
//           confirmButtonText: 'Yes, delete it!',
//         }).then(async (result) => {
//           if (result.isConfirmed) {
//             try {
//               await deleteData(id);
//               navigate('/');
//               Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
//             } catch (error) {
//               Swal.fire('Error', 'Unable to delete the file.', 'error');
//             }
//           }
//         });
//       };

//     if (isError) {
//         console.log(isError);
//     }
//     if (isLoading) {
//         return <h3>Loading...</h3>;
//     }


//     return (
//         <div className="container mt-5">
//             <button onClick={()=>navigate('/Register')} className='btn btn-success'>Register</button>
//             <h3>Users</h3>
//             <div>
//                 {users.length ? (
//                     <table className="table">
//                         <thead>
//                             <tr>
//                                 <th>S.No</th>
//                                 <th>FirstName</th>
//                                 <th>LastName</th>
//                                 <th>email</th>
//                                 <th>Actions/View</th>
//                                 <th>Actions/Edit</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user, index) => (
//                                 <tr key={index}>
//                                     <td>{index + 1}</td>
//                                     <td>{user.firstName}</td>
//                                     <td>{user.lastName}</td>
//                                     <td>{user.email}</td>
//                                     <td>
//                                         <button
//                                             className="btn btn-danger"
//                                             onClick={() => handleDelete(user._id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                     <td>
//                                         <button
//                                             className="btn btn-info"
//                                             onClick={() => navigate(`/Edituser/${user._id}`)}
//                                         >
//                                             Edit
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>No Contacts available.</p>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Listuser



import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useGetUsersQuery } from "../../redux/api";
import Swal from 'sweetalert2';
import DataTable from "react-data-table-component";

const Listuser = () => {
    const navigate = useNavigate();
    const [deleteData] = useDeleteUserMutation();
    const { data, isLoading, isError } = useGetUsersQuery();
    const users = data && data.data ? data.data : [];

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteData(id);
                    navigate('/');
                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Unable to delete the file.', 'error');
                }
            }
        });
    };

    if (isError) {
        console.log(isError);
    }
    if (isLoading) {
        return <h3>Loading...</h3>;
    }

    const columns = [
        {
            name: "S.No",
            cell: (row, index) => index + 1,
        },
        {
            name: "profile pic",
            cell: (row) =>
                row.profileImage ? (
                    <img
                        src={`http://localhost:8000/${row.profileImage}`}
                        alt="Profile"
                        style={{ width: "50px", height: "50px" }}
                    />
                ) : null,
        },
        {
            name: "FirstName",
            selector: "firstName",
            sortable: true,
        },
        {
            name: "LastName",
            selector: "lastName",
            sortable: true,
        },
        {
            name: "Email",
            selector: "email",
            sortable: true,
        },
        {
            name: "Actions/Delete",
            cell: (row) => (
                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(row._id)}
                >
                    Delete
                </button>
            ),
        },
        {
            name: "Actions/Edit",
            cell: (row) => (
                <button
                    className="btn btn-info"
                    onClick={() => navigate(`/Edituser/${row._id}`)}
                >
                    Edit
                </button>
            ),
        },
    ];

    return (
        <div className="container mt-5 p-5">
            <button onClick={() => navigate('/Register')} className='btn btn-success'>Register</button>
            <h3>Users</h3>
            <DataTable
                columns={columns}
                data={users}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30]}
            />
        </div>
    );
}

export default Listuser;

