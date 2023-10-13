import React from 'react';
import './App.css';
import NavBar from './Components/Header/NavBar';
import Login from './Components/SigninFunctions/Login';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRouts';
import { Provider} from 'react-redux';
import store from './ReduxStore';
import StaffDashboard from './Components/DashBoards/StaffDashboard';
import PrescriptionForm from './Components/Prescriptions/AddPrescription';
import PrescriptionTable from './Components/Prescriptions/PrescriptionTable';
import PrescriptionDocuments from './Components/Prescriptions/PrescriptionInformation';
import PdfChecking from './Components/PdfChecking';
import AdminProtectedRoutes from './AdminProtectedRoutes';
import AdminDashboard from './Components/DashBoards/Admin/AdminDashboard';
import AddStaff from './Components/SigninFunctions/Admin/AddStaff';
import StaffDetails from './Components/DashBoards/Admin/StaffDetails';
import AddAdmin from './Components/SigninFunctions/Admin/AddAdmin';
import AddDetails from './Components/DashBoards/Admin/AdminDetails';

const App = () => {

  return (
    <Provider store={store}>
      <div className="App">
      <NavBar />
        <Routes>
          
          {/* -------------  Admin Routes -----------------*/}
          <Route exact path="/adminDashboard" element={<AdminProtectedRoutes><AdminDashboard /></AdminProtectedRoutes>}></Route>
          <Route exact path="/adminDisplayPrescription" element={<AdminProtectedRoutes><AdminDashboard /><PrescriptionTable/></AdminProtectedRoutes>} ></Route>         
          <Route exact path="/adminAddPrescription" element={<AdminProtectedRoutes><AdminDashboard /><PrescriptionForm/></AdminProtectedRoutes>}></Route>
          <Route exact path="/AddStaff" element={<AdminProtectedRoutes><AdminDashboard/><AddStaff/></AdminProtectedRoutes>}></Route>
          <Route exact path="/displayStaffs" element={<AdminProtectedRoutes><AdminDashboard/><StaffDetails/></AdminProtectedRoutes>}></Route>
          <Route exact path="/displayAdmins" element={<AdminProtectedRoutes><AdminDashboard/><AddDetails/></AdminProtectedRoutes>}></Route>
          <Route exact path="/AddAdmin" element={<AdminProtectedRoutes><AdminDashboard/><AddAdmin/></AdminProtectedRoutes>}></Route>
          {/* <Route exact path="/prescriptions/:id" element={<AdminProtectedRoutes><AdminDashboard /><PrescriptionDocuments /></AdminProtectedRoutes>}></Route>  */}

          {/* -------------  Staff Routes -----------------*/}
          <Route exact path="/" element={ <Login/> }></Route>
          <Route exact path="/staffDashboard" element={<ProtectedRoutes><StaffDashboard></StaffDashboard></ProtectedRoutes>}></Route>
          <Route exact path="/addPrescription" element={<ProtectedRoutes><StaffDashboard /><PrescriptionForm /></ProtectedRoutes>}></Route>
          <Route exact path="/addPrescription/:id" element={<ProtectedRoutes><StaffDashboard /><PrescriptionForm /></ProtectedRoutes>}></Route> 
          <Route exact path="/displayPrescription" element={<ProtectedRoutes><StaffDashboard /><PrescriptionTable /></ProtectedRoutes>}></Route> 
          <Route exact path="/prescriptions/:id" element={<ProtectedRoutes><StaffDashboard /><PrescriptionDocuments /></ProtectedRoutes>}></Route> 
          <Route exac path="/pdfchecking" element={<PdfChecking/>}></Route>
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
