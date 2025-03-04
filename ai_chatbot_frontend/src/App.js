
// // import React from 'react';
// // import LoginForm from './components/LoginForm'; // Ensure the path is correct
// // function App() {
  
// //   return (
// //     <div className="App">
// //       <LoginForm />
// //     </div>
// //   );
// // }

// // export default App;

// // src/App.js
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LoginForm from './components/LoginForm';
// import MainPage from './MainPage';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Login page as the default route */}
//         <Route path="/" element={<LoginForm />} />
        
//         {/* Main page with nested routes for additional sections */}
//         <Route path="/main/*" element={<MainPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UrbanRegistrationForm from './components/UrbanRegistrationForm';
import ChatbotPage from './components/ChatbotPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<UrbanRegistrationForm />} />
        <Route path="/main" element={<ChatbotPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
