// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/homepage/header";
// import Toggle from "./components/homepage/toggle";
// import RegistrationForm from "./components/LoginSignin/registration";
// import GenderSelection from "./components/Fitness/fit";
// import GoalSelection from "./components/Fitness/GoalSelection";
// import FocusAreaSelection from "./components/Fitness/focus";
// import HeightSelection from "./components/Fitness/heightselection";
// import WeightSelection from "./components/Fitness/weight";
// import Dashboard from "./components/Dashboard/dashboard";

// const App = () => {
//   return (
//    <Dashboard/>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigate from "./components//navigate/navigate";
import Meditation from "./components/Contact/contact";
import Exercise from "./components/LoginSignin/login-signup";
import Diet from "./components/Nutritious/cardtask";
import Yoga from "./components/servicespage/ServicesPage";
import PeriodCalendar from "./components/PeriodCalendar/calendar";
import Dashboard from "./components/Dashboard/dashboard";

export default function App() {
    return (
        // <Router>
        //     <Routes>
        //         {/* Main Wellness Hub Page */}
        //         <Route path="/naviagte" element={<Navigate />} />

        //         {/* Individual Wellness Topic Pages */}
        //         <Route path="/meditation" element={<Meditation />} />
        //         <Route path="/exercise" element={<Exercise />} />
        //         <Route path="/diet" element={<Diet />} />
        //         <Route path="/yoga" element={<Yoga />} />
        //         <Route path="/period-calendar" element={<PeriodCalendar />} />
        //     </Routes>
        // </Router>
        <>
        {/* <Dashboard/>     */}
        {/* <Navigate/> */}
        <PeriodCalendar/>
        </>
    );
}


