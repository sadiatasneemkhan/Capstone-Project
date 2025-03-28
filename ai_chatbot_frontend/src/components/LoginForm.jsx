
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const styles = {
//   page: {
//     background: "url('https://source.unsplash.com/1600x900/?city,urban') no-repeat center center fixed",
//     backgroundSize: 'cover',
//     height: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontFamily: 'Arial, sans-serif',
//   },
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     padding: '40px',
//     borderRadius: '10px',
//     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
//     maxWidth: '400px',
//     width: '90%',
//   },
//   header: {
//     textAlign: 'center',
//     color: '#d32f2f', // red accent
//     fontSize: '32px',
//     marginBottom: '20px',
//     fontWeight: 'bold',
//   },
//   input: {
//     width: '100%',
//     padding: '12px',
//     marginBottom: '20px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     fontSize: '16px',
//   },
//   button: {
//     backgroundColor: '#d32f2f',
//     color: '#fff',
//     border: 'none',
//     padding: '12px',
//     width: '100%',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginBottom: '10px',
//   },
//   logoutButton: {
//     backgroundColor: '#555',
//     color: '#fff',
//     border: 'none',
//     padding: '12px',
//     width: '100%',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginTop: '20px',
//   },
//   error: {
//     color: '#ff0000',
//     marginBottom: '10px',
//     textAlign: 'center',
//   },
//   success: {
//     color: '#00a000',
//     marginBottom: '10px',
//     textAlign: 'center',
//   },
// };

// const LoginForm = () => {
//   const [loginData, setLoginData] = useState(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
  
//   const navigate = useNavigate(); // React Router hook

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');
//     try {
//       const response = await fetch('http://localhost:8000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         setErrorMsg(errorData.detail || 'Login failed');
//       } else {
//         const data = await response.json();
//         setLoginData(data);
        
//         // Redirect to the main page
//         navigate('/main');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setErrorMsg('An error occurred during login');
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         {!loginData ? (
//           <>
//             <div style={styles.header}>Urban System Login</div>
//             {errorMsg && <p style={styles.error}>{errorMsg}</p>}
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username"
//                 style={styles.input}
//                 required
//               />
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 style={styles.input}
//                 required
//               />
//               <button type="submit" style={styles.button}>Login</button>
//             </form>
//           </>
//         ) : (
//           <div>
//             <div style={styles.header}>Welcome!</div>
//             <p style={styles.success}>Login Successful</p>
//             {/* This message is displayed briefly before redirecting. */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

// src/LoginForm.jsx



//2.



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const styles = {
//   page: {
//     background: "url('https://source.unsplash.com/1600x900/?city,urban') no-repeat center center fixed",
//     backgroundSize: 'cover',
//     height: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontFamily: 'Arial, sans-serif',
//   },
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     padding: '40px',
//     borderRadius: '10px',
//     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
//     maxWidth: '400px',
//     width: '90%',
//   },
//   header: {
//     textAlign: 'center',
//     color: '#d32f2f', // red accent
//     fontSize: '32px',
//     marginBottom: '20px',
//     fontWeight: 'bold',
//   },
//   input: {
//     width: '100%',
//     padding: '12px',
//     marginBottom: '20px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     fontSize: '16px',
//   },
//   button: {
//     backgroundColor: '#d32f2f',
//     color: '#fff',
//     border: 'none',
//     padding: '12px',
//     width: '100%',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginBottom: '10px',
//   },
//   registerButton: {
//     backgroundColor: '#555', // Grey for contrast
//     color: '#fff',
//     border: 'none',
//     padding: '12px',
//     width: '100%',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginTop: '10px',
//   },
//   error: {
//     color: '#ff0000',
//     marginBottom: '10px',
//     textAlign: 'center',
//   },
// };

// const LoginForm = () => {
//   const [loginData, setLoginData] = useState(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');

//   const navigate = useNavigate(); // React Router navigation hook

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');

//     try {
//       const response = await fetch('http://localhost:8000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setErrorMsg(errorData.detail || 'Login failed');
//       } else {
//         const data = await response.json();
//         setLoginData(data);
//         navigate('/main'); // Redirect to the main dashboard after login
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setErrorMsg('An error occurred during login');
//     }
//   };

//   const handleRegisterRedirect = () => {
//     navigate('/register'); // Redirect to the registration page
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <div style={styles.header}>Urban System Login</div>
//         {errorMsg && <p style={styles.error}>{errorMsg}</p>}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             style={styles.input}
//             required
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             style={styles.input}
//             required
//           />
//           <button type="submit" style={styles.button}>Login</button>
//         </form>
//         <button onClick={handleRegisterRedirect} style={styles.registerButton}>
//           Register
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


// //2.

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const styles = {
//   page: {
//     background: "url('https://source.unsplash.com/1600x900/?city,urban') no-repeat center center fixed",
//     backgroundSize: 'cover',
//     height: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontFamily: 'Arial, sans-serif',
//   },
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 0.95)',
//     padding: '40px',
//     borderRadius: '10px',
//     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
//     maxWidth: '400px',
//     width: '90%',
//   },
//   header: {
//     textAlign: 'center',
//     color: '#d32f2f', // red accent
//     fontSize: '32px',
//     marginBottom: '20px',
//     fontWeight: 'bold',
//   },
//   input: {
//     width: '100%',
//     padding: '12px',
//     marginBottom: '20px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     fontSize: '16px',
//   },
//   button: {
//     backgroundColor: '#d32f2f',
//     color: '#fff',
//     border: 'none',
//     padding: '12px',
//     width: '100%',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginBottom: '10px',
//   },
//   registerButton: {
//     backgroundColor: '#555', // Grey for contrast
//     color: '#fff',
//     border: 'none',
//     padding: '12px',
//     width: '100%',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginTop: '10px',
//   },
//   error: {
//     color: '#ff0000',
//     marginBottom: '10px',
//     textAlign: 'center',
//   },
// };

// const LoginForm = () => {
//   const [loginData, setLoginData] = useState(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');

//   const navigate = useNavigate(); // React Router navigation hook

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg('');

//     try {
//       const response = await fetch('http://localhost:8000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         // If errorData.detail is an array, join the messages.
//         let errorMessage = 'Login failed';
//         if (Array.isArray(errorData.detail)) {
//           errorMessage = errorData.detail.map(err => err.msg).join(', ');
//         } else if (typeof errorData.detail === 'object' && errorData.detail !== null) {
//           errorMessage = errorData.detail.msg || JSON.stringify(errorData.detail);
//         } else if (typeof errorData.detail === 'string') {
//           errorMessage = errorData.detail;
//         }
//         setErrorMsg(errorMessage);
//       } else {
//         const data = await response.json();
//         setLoginData(data);
//         navigate('/main'); // Redirect to the main dashboard after login
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setErrorMsg('An error occurred during login');
//     }
//   };

//   const handleRegisterRedirect = () => {
//     navigate('/register'); // Redirect to the registration page
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <div style={styles.header}>Urban System Login</div>
//         {errorMsg && <p style={styles.error}>{errorMsg}</p>}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             style={styles.input}
//             required
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             style={styles.input}
//             required
//           />
//           <button type="submit" style={styles.button}>Login</button>
//         </form>
//         <button onClick={handleRegisterRedirect} style={styles.registerButton}>
//           Register
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: {
    background: "url('https://source.unsplash.com/1600x900/?city,urban') no-repeat center center fixed",
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
    maxWidth: '400px',
    width: '90%',
  },
  header: {
    textAlign: 'center',
    color: '#d32f2f', // red accent
    fontSize: '32px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    padding: '12px',
    width: '100%',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  registerButton: {
    backgroundColor: '#555', // Grey for contrast
    color: '#fff',
    border: 'none',
    padding: '12px',
    width: '100%',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: '#ff0000',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

const LoginForm = () => {
  const [loginData, setLoginData] = useState(null);
  const [email, setEmail] = useState(''); // Changed from username to email
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate(); // React Router navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Changed payload field to email
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = 'Login failed';
        if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map(err => err.msg).join(', ');
        } else if (typeof errorData.detail === 'object' && errorData.detail !== null) {
          errorMessage = errorData.detail.msg || JSON.stringify(errorData.detail);
        } else if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        }
        setErrorMsg(errorMessage);
      } else {
        const data = await response.json();
        setLoginData(data);
        navigate('/main'); // Redirect to the main dashboard after login
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMsg('An error occurred during login');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to the registration page
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>Urban System Login</div>
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email} // Changed from username to email
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" // Updated placeholder
            style={styles.input}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <button onClick={handleRegisterRedirect} style={styles.registerButton}>
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
