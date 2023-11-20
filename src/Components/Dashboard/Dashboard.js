// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup.object({
//     firstName: yup.string().required("First Name is required"),
//     lastName: yup.string().required("Last Name is required"),
//     email: yup.string().required("Email is required").email("Email is invalid"),
//     password: yup
//         .string()
//         .min(6, "Password must be at least 6 characters")
//         .required("Password is required"),
// });

// const Dashboard = () => {
//     const [user, setUser] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const navigate = useNavigate();
//     const params = useParams();
//     const id = params.id;

//     useEffect(() => {
//         axios.get(`http://localhost:8000/users/fetchuser/${id}`).then((res) => {
//             setUser(res.data.data);
//         });
//     }, []);
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm({
//         resolver: yupResolver(schema),
//     });

//     const onSubmit = async (data) => {


//         await axios.put(`http://localhost:8000/users/updateuser/${id}`, data);

//     };

//     const openModal = () => {
//         reset(user);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <>
//             <h3>User Details</h3>
//             <div className="card ms-2 mt-2 col-lg-4 m-1" key={user.id}>
//                 <h4 className="card-title text-center mt-4">
//                     {user.firstName}'s Profile
//                 </h4>
//                 <div className="card-body p-4">
//                     <h5 className="card-title">UserID: {user._id}</h5>
//                     <p>FirstName: {user.firstName}</p>
//                     <p>LastName: {user.lastName}</p>
//                     <p>email: {user.email}</p>
//                 </div>
//                 <div>
//                     <button className="btn btn-success m-3" onClick={openModal}>
//                         Edit Profile
//                     </button>
//                 </div>
//             </div>

//             {isModalOpen && (
//                 <div className="modal" style={{ display: "block" }}>
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Edit Profile</h5>
//                                 <button
//                                     type="button"
//                                     className="btn-close"
//                                     onClick={closeModal}
//                                 ></button>
//                             </div>
//                             <div className="modal-body">
//                                 <form id="registration-form" onSubmit={handleSubmit(onSubmit)}>
//                                     <div className="form-row">
//                                         <div className="form-group col-5">
//                                              <label className="text-dark">First Name</label>
//                                             <input
//                                                 name="firstName"
//                                                 type="text"
//                                                 {...register("firstName")}
//                                                 className={`form-control ${errors.firstName ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.firstName?.message}
//                                             </div>
//                                         </div>
//                                         <div className="form-group col-5">
//                                             <label className="text-dark">Last Name</label>
//                                             <input
//                                                 name="lastName"
//                                                 type="text"
//                                                 {...register("lastName")}
//                                                 className={`form-control ${errors.lastName ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.lastName?.message}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="form-row">
//                                         <div className="form-group col">
//                                             <label className="text-dark">Email</label>
//                                             <input
//                                                 name="email"
//                                                 type="text"
//                                                 {...register("email")}
//                                                 className={`form-control ${errors.email ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.email?.message}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="form-row">
//                                         <div className="form-group col">
//                                             <label className="text-dark">Password</label>
//                                             <input
//                                                 name="password"
//                                                 type="password"
//                                                 {...register("password")}
//                                                 className={`form-control ${errors.password ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.password?.message}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="mt-4">
//                                         <button type="submit" className="btn btn-primary me-3">
//                                             Save Changes
//                                         </button>
//                                         <button
//                                             type="button"
//                                             className="btn btn-secondary"
//                                             onClick={closeModal}
//                                         >
//                                             Close
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Dashboard;


// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useGetUserQuery,
//   useUpdateUserMutation,
// } from "./redux/api"; // Adjust the import path accordingly
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup.object({
//   firstName: yup.string().required("First Name is required"),
//   lastName: yup.string().required("Last Name is required"),
//   email: yup.string().required("Email is required").email("Email is invalid"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });

// const Dashboard = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data: user, isLoading, isError } = useGetUserQuery(id); // Use RTK Query
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { register, handleSubmit, formState: { errors }, setValue } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const [updateUser] = useUpdateUserMutation(); // Use RTK Query mutation

//   const onSubmit = async (data) => {
//     try {
//       await updateUser({ userId: id, updatedData: data });
//       closeModal();
//     //   useGetUserQuery(id, { skip: false });
//     } catch (error) {
//       console.error("Update failed", error);
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     if (user) {
//       // Set initial form field values with the user data
//       setValue("firstName", user.data.firstName);
//       setValue("lastName", user.data.lastName);
//       setValue("email", user.data.email);
//       setValue("password", user.data.password);
//     }
//   }, [user, setValue]);

//   if (isError) {
//     return <p>Error loading user data.</p>;
//   }

//   if (isLoading) {
//     return <p>Loading user data...</p>;
//   }

//   return (
//     <>
//       <h3>User Details</h3>
//       {user ? (
//         <div className="card ms-2 mt-2 col-lg-4 m-1" key={user.data.id}>
//           <h4 className="card-title text-center mt-4">
//             {user.data.firstName}'s Profile
//           </h4>
//           <div className="card-body p-4">
//             <h5 className="card-title">UserID: {user.data._id}</h5>
//             <p>FirstName: {user.data.firstName}</p>
//             <p>LastName: {user.data.lastName}</p>
//             <p>email: {user.data.email}</p>
//           </div>
//           <div>
//             <button className="btn btn-success m-3" onClick={openModal}>
//               Edit Profile
//             </button>
//           </div>
//         </div>
//       ) : null}

//       {isModalOpen && (
//         <div className="modal" style={{ display: "block" }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Edit Profile</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={closeModal}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <form id="registration-form" onSubmit={handleSubmit(onSubmit)}>
//                   <div className="form-row">
//                     <div className="form-group col-5">
//                       <label className="text-dark">First Name</label>
//                       <input
//                         name="firstName"
//                         type="text"
//                         {...register("firstName")}
//                         className={`form-control ${errors.firstName ? "is-invalid" : ""
//                           }`}
//                       />
//                       <div className="invalid-feedback">
//                         {errors.firstName?.message}
//                       </div>
//                     </div>
//                     <div className="form-group col-5">
//                       <label className="text-dark">Last Name</label>
//                       <input
//                         name="lastName"
//                         type="text"
//                         {...register("lastName")}
//                         className={`form-control ${errors.lastName ? "is-invalid" : ""
//                           }`}
//                       />
//                       <div className="invalid-feedback">
//                         {errors.lastName?.message}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="form-row">
//                     <div className="form-group col">
//                       <label className="text-dark">Email</label>
//                       <input
//                         name="email"
//                         type="text"
//                         {...register("email")}
//                         className={`form-control ${errors.email ? "is-invalid" : ""
//                           }`}
//                       />
//                       <div className="invalid-feedback">
//                         {errors.email?.message}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="form-row">
//                     <div className="form-group col">
//                       <label className="text-dark">Password</label>
//                       <input
//                         name="password"
//                         type="password"
//                         {...register("password")}
//                         className={`form-control ${errors.password ? "is-invalid" : ""
//                           }`}
//                       />
//                       <div className="invalid-feedback">
//                         {errors.password?.message}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-4">
//                     <button type="submit" className="btn btn-primary me-3">
//                       Save Changes
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={closeModal}
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Dashboard;



import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetSingleUserQuery } from "../../redux/api";
import { toast } from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate();
    const { data, isFetching } = useGetSingleUserQuery();
    const user = data?.data;

    const getExpiryTimeFromToken = (token) => {
        if (!token) {
            return null;
        }
        const tokenParts = token.split('.');
        if (tokenParts.length < 3) {
            return null;
        }
        try {
            // console.log("token parts",tokenParts);
            const decodedToken = atob(tokenParts[1]);
            // console.log(decodedToken);
            const parsedToken = JSON.parse(decodedToken);
            // console.log(parsedToken);
            if (parsedToken.exp) {
                return parsedToken.exp * 1000;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error decoding or parsing the token:", error);
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('LoggedUserToken');
        const expiryTime = getExpiryTimeFromToken(token);

        if (expiryTime && expiryTime < Date.now()) {
            localStorage.removeItem('LoggedUserToken');
            window.location.reload();
            navigate('/login');
        }
    }, [navigate]);

    if (isFetching) {
        return <div>Loading...</div>;
    }

    // const expirationTime = new Date(getExpiryTimeFromToken(localStorage.getItem('LoggedUserToken')));
    // console.log(expirationTime);
    // const currentDateTime = new Date();

    // if (expirationTime < currentDateTime) {

    //   localStorage.removeItem('LoggedUserToken');
    //   navigate('/login');
    //   window.location.reload();
    // }

    return (
        <div className="col-10 m-auto">
            <h3 className="text-center">User Details</h3>
            <div className="card m-3">
                {user ? (
                    <>
                        <h4 className="card-title text-center mt-4">
                            {user.firstName}'s Profile
                        </h4>
                        <div className="card-body p-4">
                            <h5 className="card-title">UserID: {user._id}</h5>
                            <p>FirstName: {user.firstName}</p>
                            <p>LastName: {user.lastName}</p>
                            <p>Email: {user.email}</p>
                        </div>
                        <div>
                            <button className="btn btn-success m-3">Edit Profile</button>
                            <Link to={'/addproducts'} className="btn btn-success m-3">
                                Products
                            </Link>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;


// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//     useGetUserQuery,
//     useUpdateUserMutation
// } from "../../redux/api"; // Adjust the import path accordingly
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup.object({
//     firstName: yup.string().required("First Name is required"),
//     lastName: yup.string().required("Last Name is required"),
//     email: yup.string().required("Email is required").email("Email is invalid"),
//     password: yup
//         .string()
//         .min(6, "Password must be at least 6 characters")
//         .required("Password is required"),
// });

// const Dashboard = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { data: user, isLoading, isError } = useGetUserQuery(id);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const { register, handleSubmit, formState: { errors }, setValue } = useForm({
//         resolver: yupResolver(schema),
//     });

//     const [updateUser] = useUpdateUserMutation();

//     const onSubmit = async (data) => {

//         try {
//             console.log(data);
//             await updateUser({
//                 id, firstName: data.firstName,
//                 lastName: data.lastName,
//                 email: data.email,
//                 password: data.password,
//             });
//             closeModal();
//         } catch (error) {
//             console.error("Update failed", error);
//             // Handle the error (e.g., display an error message to the user)
//         }
//     };

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     useEffect(() => {
//         if (user) {
//             // Set initial form field values with the user data
//             setValue("_id", user.data._id)
//             setValue("firstName", user.data.firstName);
//             setValue("lastName", user.data.lastName);
//             setValue("email", user.data.email);
//             setValue("password", user.data.password);
//         }
//     }, [user, setValue]);

//     const getExpiryTimeFromToken = (token) => {
//         if (!token) {
//             return null;
//         }

//         const tokenParts = token.split('.');
//         if (tokenParts.length < 3) {
//             return null;
//         }

//         try {
//             const decodedToken = atob(tokenParts[1]);
//             const parsedToken = JSON.parse(decodedToken);

//             if (parsedToken.exp) {
//                 return parsedToken.exp * 1000;
//             } else {
//                 return null;
//             }
//         } catch (error) {
//             console.error("Error decoding or parsing the token:", error);
//             return null;
//         }
//     };

//     useEffect(() => {
//         const token = localStorage.getItem('LoggedUserToken');
//         const expiryTime = getExpiryTimeFromToken(token);

//         if (expiryTime && expiryTime < Date.now()) {
//             localStorage.removeItem('LoggedUserToken');
//             navigate('/login');
//             window.location.reload();
//         }
//     }, [navigate]);

//     if (isError) {
//         return <p>Error loading user data.</p>;
//     }

//     if (isLoading) {
//         return <p>Loading user data...</p>;
//     }



//     return (
//         <>
//             <h3>User Details</h3>
//             {user ? (
//                 <div className="card ms-2 mt-5 col-lg-4 m-1" key={user.data.id}>
//                     <h4 className="card-title text-center mt-4">
//                         {user.data.firstName}'s Profile
//                     </h4>
//                     <div className="card-body p-4">
//                         <h5 className="card-title">UserID: {user.data._id}</h5>
//                         <img
//                             src={`http://localhost:8000/${user.data.profileImage}`}
//                             className="card-img-top"
//                             alt="logo"
//                             style={{ width: "100px", height: "150px" }}

//                         ></img>
//                         <p>FirstName: {user.data.firstName}</p>
//                         <p>LastName: {user.data.lastName}</p>
//                         <p>email: {user.data.email}</p>
//                     </div>
//                     <div>
//                         <button className="btn btn-success m-3" onClick={openModal}>
//                             Edit Profile
//                         </button>
//                     </div>
//                 </div>
//             ) : null}

//             {isModalOpen && (
//                 <div className="modal" style={{ display: "block" }}>
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Edit Profile</h5>
//                                 <button
//                                     type="button"
//                                     className="btn-close"
//                                     onClick={closeModal}
//                                 ></button>
//                             </div>
//                             <div className="modal-body">
//                                 <form id="registration-form" onSubmit={handleSubmit(onSubmit)}>
//                                     <div className="form-row">
//                                         <div className="form-group col-5">
//                                             <label className="text-dark">First Name</label>
//                                             <input
//                                                 name="firstName"
//                                                 type="text"
//                                                 {...register("firstName")}
//                                                 className={`form-control ${errors.firstName ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.firstName?.message}
//                                             </div>
//                                         </div>
//                                         <div className="form-group col-5">
//                                             <label className="text-dark">Last Name</label>
//                                             <input
//                                                 name="lastName"
//                                                 type="text"
//                                                 {...register("lastName")}
//                                                 className={`form-control ${errors.lastName ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.lastName?.message}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="form-row">
//                                         <div className="form-group col">
//                                             <label className="text-dark">Email</label>
//                                             <input
//                                                 name="email"
//                                                 type="text"
//                                                 {...register("email")}
//                                                 className={`form-control ${errors.email ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.email?.message}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     {/* <div className="form-row">
//                                         <div className="form-group col">
//                                             <label className="text-dark">Password</label>
//                                             <input
//                                                 name="password"
//                                                 type="password"
//                                                 {...register("password")}
//                                                 className={`form-control ${errors.password ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.password?.message}
//                                             </div>
//                                         </div>
//                                     </div> */}
//                                     <div className="mt-4">
//                                         <button type="submit" className="btn btn-primary me-3">
//                                             Save Changes
//                                         </button>
//                                         <button
//                                             type="button"
//                                             className="btn btn-secondary"
//                                             onClick={closeModal}
//                                         >
//                                             Close
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//     useGetUserQuery,
//     useUpdateUserMutation,
// } from "../../redux/api"; // Adjust the import path accordingly
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const schema = yup.object({
//     firstName: yup.string().required("First Name is required"),
//     lastName: yup.string().required("Last Name is required"),
//     email: yup.string().required("Email is required").email("Email is invalid"),
//     password: yup
//         .string()
//         .min(6, "Password must be at least 6 characters")
//         .required("Password is required"),
// });

// const Dashboard = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { data: user, isLoading, isError } = useGetUserQuery(id);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [formData, setFormData] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const { register, handleSubmit, formState: { errors }, reset } = useForm({
//         resolver: yupResolver(schema),
//     });

//     const [updateUser] = useUpdateUserMutation();

//     const onSubmit = async (data) => {
//         setIsSubmitting(true);
//         try {
//             const updatedUserData = await updateUser({ id, ...data });
//             setFormData(updatedUserData)
//             closeModal();
//         } catch (error) {
//             console.error("Update failed", error);
//             // Handle the error (e.g., display an error message to the user)
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     useEffect(() => {
//         if (user) {
//             // Set initial form field values with the user data
//             setFormData({
//                 firstName: user.data.firstName,
//                 lastName: user.data.lastName,
//                 email: user.data.email,
//                 password: user.data.password,
//             });
//         }
//     }, [user]);

//     if (isError) {
//         return <p>Error loading user data.</p>;
//     }

//     if (isLoading) {
//         return <p>Loading user data...</p>;
//     }

//     return (
//         <>
//             <h3>User Details</h3>
//             {user ? (
//                 <div className="card ms-2 mt-2 col-lg-4 m-1" key={user.data.id}>
//                     <h4 className="card-title text-center mt-4">
//                         {user.data.firstName}'s Profile
//                     </h4>
//                     <div className="card-body p-4">
//                         <h5 className="card-title">UserID: {user.data._id}</h5>
//                         <p>FirstName: {user.data.firstName}</p>
//                         <p>LastName: {user.data.lastName}</p>
//                         <p>email: {user.data.email}</p>
//                     </div>
//                     <div>
//                         <button className="btn btn-success m-3" onClick={openModal}>
//                             Edit Profile
//                         </button>
//                     </div>
//                 </div>
//             ) : null}

//             {isModalOpen && (
//                 <div className="modal" style={{ display: "block" }}>
//                     <div className="modal-dialog">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Edit Profile</h5>
//                                 <button
//                                     type="button"
//                                     className="btn-close"
//                                     onClick={closeModal}
//                                 ></button>
//                             </div>
//                             <div className="modal-body">
//                                 <form id="registration-form" onSubmit={handleSubmit(onSubmit)}>
//                                     <div className="form-row">
//                                         <div className="form-group col-5">
//                                             <label className="text-dark">First Name</label>
//                                             <input
//                                                 name="firstName"
//                                                 type="text"
//                                                 {...register("firstName")}
//                                                 value={formData.firstName}
//                                                 onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                                                 className={`form-control ${errors.firstName ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.firstName?.message}
//                                             </div>
//                                         </div>
//                                         <div className="form-group col-5">
//                                             <label className="text-dark">Last Name</label>
//                                             <input
//                                                 name="lastName"
//                                                 type="text"
//                                                 {...register("lastName")}
//                                                 value={formData.lastName}
//                                                 onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                                                 className={`form-control ${errors.lastName ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.lastName?.message}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="form-row">
//                                         <div className="form-group col">
//                                             <label className="text-dark">Email</label>
//                                             <input
//                                                 name="email"
//                                                 type="text"
//                                                 {...register("email")}
//                                                 value={formData.email}
//                                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                                                 className={`form-control ${errors.email ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.email?.message}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="form-row">
//                                         <div className="form-group col">
//                                             <label className="text-dark">Password</label>
//                                             <input
//                                                 name="password"
//                                                 type="password"
//                                                 {...register("password")}
//                                                 value={formData.password}
//                                                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                                                 className={`form-control ${errors.password ? "is-invalid" : ""
//                                                     }`}
//                                             />
//                                             <div className="invalid-feedback">
//                                                 {errors.password?.message}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="mt-4">
//                                         <button type="submit" className="btn btn-primary me-3" disabled={isSubmitting}>
//                                             Save Changes
//                                         </button>
//                                         <button
//                                             type="button"
//                                             className="btn btn-secondary"
//                                             onClick={closeModal}
//                                         >
//                                             Close
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Dashboard;


