import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Home from './components/landing';
import Signin from './components/signincomponent';
import Signup from './screens/singup';
import Recover from './components/recoverpassword';
import PageNotFound from './components/404';
import Dashboardscreen from './screens/dashboardscreen';
import Friendscreen from './screens/friendscreen';
import Inobxscreen from './screens/inbox';
import Createpage from './screens/createpagescreen';
import Creategroup from './screens/creategroupscreen';
import Notifications from './screens/notificationscreen';
import Events from './screens/eventscreen';
import Signupdone from './components/signupsuccess';
import Profile from './screens/profilescreen';
import Verifysucess from './components/verifysucess';

const App = () => {
  return (
    <Router>
		<Routes>
			<Route path="/" exact element={<Home />} />
			<Route path="/signin" element={<Signin />} />
			<Route path="/joinus" element={<Signup />} />
			<Route path="/signupdone" element={<Signupdone />} />
			<Route path="/verifysucess" element={<Verifysucess />} />
			<Route path="/recover" element={<Recover />} />
			<Route path="/dashboard" element={<Dashboardscreen />} />
			<Route path="/friends" element={<Friendscreen />} />
			<Route path="/inbox" element={<Inobxscreen />} />
			<Route path="/createPage" element={<Createpage />} />
			<Route path="/createGroup" element={<Creategroup />} />
			<Route path="/notifications" element={<Notifications />} />
			<Route path="/events" element={<Events />} />
			<Route path="/editprofile" element={<Profile />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
		<Footer/>
	</Router>
  )
};

export default App;
