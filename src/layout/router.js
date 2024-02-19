// import React from "react";
// import { Routes,Route } from "react-router-dom";
// import Login from "../component/login";
// import RegistrationComp from "../component/registation";
// import ProductComponet from "../component/products";

// const RouterComponent =()=>{
//   debugger
//     return(
//     <Routes>
//       <Route path="/registration" Component={RegistrationComp} />
//       {/* <Route path ='/login' Component={Login}/> */}
//       {/* <Route path={'login/:token'} Component={ProductComponet} /> */}
//       <Route>
//         path="/login"
//         element={
//           <>
//             <Route index element={<Login />} />
//             <Route path=":token" element={<ProductComponet/>} />
//           </>
//         }
//       </Route>
//       <Route exact path="/" Component={RegistrationComp} /> {/* 👈 Renders at /app/ */}
//     </Routes>
//   );
// }
// export default RouterComponent;
import { Route, Routes } from 'react-router-dom';
import Login from "../component/login";
import ProductComponet from "../component/products";
import RegistrationComp from '../component/registation';

const RouterComponent = () => {
  return (
    //  page routing
      <Routes>
        <Route
          path="/"
          element={
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          }
        />
        <Route path="/registration" element={
            <Routes>
              <Route path="/" element={<RegistrationComp />} />
            </Routes>
          }/>
      </Routes>
    
  );
};

export default RouterComponent;
