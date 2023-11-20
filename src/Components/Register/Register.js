// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import {
//     useAddUserMutation,
//     useDeleteUserMutation,
//     useGetUsersQuery,
// } from "../../redux/api";

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
// });

// function App() {
//     const navigate = useNavigate();
//     const [newData] = useAddUserMutation();
//     const [deleteData] = useDeleteUserMutation();

//     const { data, isLoading, isError } = useGetUsersQuery();

//     const users = data && data.data ? data.data : [];

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm({
//         resolver: yupResolver(schema),
//         mode: 'all'
//     });

//     const onSubmit = async (data) => {

//         try {
//             newData(data);
//             console.log("Registration successful", data);
//             navigate("/login")
//         } catch (error) {
//             console.error("Registration failed", error);
//         }
//     };

//     if (isError) {
//         console.log(isError);
//     }
//     if (isLoading) {
//         return <h3>Loading...</h3>;
//     }

//     return (
//         <div className="container mt-3">
//             <h2>Register Form</h2>
//             <form onSubmit={handleSubmit(onSubmit)} id="registration-form">
//                 <div className="form-row">
//                     <div className="form-group col">
//                         <label className="text-dark">First Name</label>
//                         <input
//                             name="firstName"
//                             type="text"
//                             autoFocus
//                             {...register("firstName")}
//                             className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
//                         />
//                         <div className="invalid-feedback">{errors.firstName?.message}</div>
//                     </div>

//                 </div>

//                 <div className="form-group col">
//                     <label className="text-dark">Last Name</label>
//                     <input
//                         name="lastName"
//                         type="text"
//                         {...register("lastName")}
//                         className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
//                     />
//                     <div className="invalid-feedback">{errors.lastName?.message}</div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group col">
//                         <label className="text-dark">Email</label>
//                         <input
//                             name="email"
//                             type="text"
//                             {...register("email")}
//                             className={`form-control ${errors.email ? "is-invalid" : ""}`}
//                         />
//                         <div className="invalid-feedback">{errors.email?.message}</div>
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group col">
//                         <label className="text-dark">Password</label>
//                         <input
//                             name="password"
//                             type="password"
//                             {...register("password")}
//                             className={`form-control ${errors.password ? "is-invalid" : ""}`}
//                         />
//                         <div className="invalid-feedback">{errors.password?.message}</div>
//                     </div>
//                     <div className="form-group col">
//                         <label className="text-dark">Confirm Password</label>
//                         <input
//                             name="confirmPassword"
//                             type="password"
//                             {...register("confirmPassword")}
//                             className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
//                                 }`}
//                         />
//                         <div className="invalid-feedback">
//                             {errors.confirmPassword?.message}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="form-group mt-3">
//                     <button type="submit" className="btn btn-primary mr-1">
//                         Register
//                     </button>
//                 </div>
//             </form>

//             <div className="container mt-5">
//                 <h3>Users</h3>
//                 <div>
//                     {users.length ? (
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>S.No</th>
//                                     <th>FirstName</th>
//                                     <th>LastName</th>
//                                     <th>email</th>
//                                     <th>Actions/View</th>
//                                     <th>Actions/Edit</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.map((user, index) => (
//                                     <tr key={index}>
//                                         <td>{index + 1}</td>
//                                         <td>{user.firstName}</td>
//                                         <td>{user.lastName}</td>
//                                         <td>{user.email}</td>
//                                         <td>
//                                             <button
//                                                 className="btn btn-outline-danger"
//                                                 onClick={() => deleteData(user._id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                         <td>
//                                             <button
//                                                 className="btn btn-outline-info"
//                                                 onClick={() => navigate(`/Edituser/${user._id}`)}
//                                             >
//                                                 Edit
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p>No Contacts available.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default App;


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {
    useAddUserMutation,
    useDeleteUserMutation,
    useGetUsersQuery,
} from "../../redux/api";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const schema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});

function App() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [newData] = useAddUserMutation();
    const [deleteData] = useDeleteUserMutation();
    const { data: user, isLoading, isError } = useGetUsersQuery();

    const users = user && user.data ? user.data : [];
    console.log(users);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    // const onSubmit = async (data) => {

    //     try {
    //         newData(data);
    //         console.log("Registration successful", data);
    //         toast.success("Register Successfully")
    //         console.log(newData);
    //         setTimeout(() => {
    //             navigate("/login")
    //         }, 4000);

    //     } catch (error) {
    //         toast.error("Something went wrong")
    //         console.error("Registration failed", error);
    //     }
    // };
    const onSubmit = async (data) => {
        const image = data.profileImage[0]
        try {
            const users = user && user.data ? user.data : [];
            const IsEmailAlreadyExists = users.some((user) => user.email === data.email)
            if (IsEmailAlreadyExists) {
                toast.error("Email Already Exists")
            }
            else {
                const formData = new FormData();
                formData.append("firstName", data.firstName);
                formData.append("lastName", data.lastName);
                formData.append("email", data.email);
                formData.append("password", data.password);
                formData.append("confirmPassword", data.confirmPassword);
                formData.append("profileImage", image);
                console.log(formData);
                await newData(formData);
                console.log("Registration successful", data);
                toast.success("Register Successfully");

                setTimeout(() => {
                    navigate("/login");
                }, 4000);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error("Registration failed", error);
        }
    };


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
                    // navigate('/Register');
                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Unable to delete the file.', 'error');
                }
            }
        });
    };
    const columns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
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
            name: "First Name",
            selector: "firstName",
        },
        {
            name: "Last Name",
            selector: "lastName",
        },
        {
            name: "Email",
            selector: "email",
        },
        {
            name: "Actions/Delete",
            cell: (row) => (
                <button
                    className="btn btn-outline-danger"
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
                    className="btn btn-outline-info"
                    onClick={() => navigate(`/Edituser/${row._id}`)}
                >
                    Edit
                </button>
            ),
        },
    ];

    if (isError) {
        console.log(isError);
    }
    if (isLoading) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="container mt-3 p-5">
            <div className='toast-container'>
                <ToastContainer limit={1} />
            </div>
            <h2>Register Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} id="registration-form" encType="multipart/form-data">
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-dark">First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            autoFocus
                            {...register("firstName")}
                            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>

                </div>

                <div className="form-group col">
                    <label className="text-dark">Last Name</label>
                    <input
                        name="lastName"
                        type="text"
                        {...register("lastName")}
                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Profile Image</label>
                    <input
                        type="file"
                        accept=".gif, .png, .jpeg, .jpg"
                        onChange={(e) => handleImageUpload(e)}
                        {...register("profileImage")}
                        className={`form-control ${errors.profileImage ? "is-invalid" : ""}`}
                    />

                    <div className="invalid-feedback">{errors.profileImage?.message}</div>
                    {selectedFile && (
                        <p>
                            Selected file: {selectedFile.name} ({selectedFile.type})
                        </p>
                    )}
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-dark">Email</label>
                        <input
                            name="email"
                            type="text"
                            {...register("email")}
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-dark">Password</label>
                        <input
                            name="password"
                            type="password"
                            {...register("password")}
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="form-group col">
                        <label className="text-dark">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            {...register("confirmPassword")}
                            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                                }`}
                        />
                        <div className="invalid-feedback">
                            {errors.confirmPassword?.message}
                        </div>
                    </div>
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary mr-1">
                        Register
                    </button>
                </div>
            </form>

            <div className="container mt-5">
                <h3>Users</h3>
                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    highlightOnHover
                    pointerOnHover
                />
            </div>
        </div>
    );
}

export default App;
