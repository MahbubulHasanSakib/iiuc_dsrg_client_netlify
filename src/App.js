import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AboutScreen from "./screens/AboutScreen";
import ExecutiveScreen from "./screens/ExecutiveScreen";
import HomeScreen from "./screens/HomeScreen";
import PublicationScreen from "./screens/PublicationScreen";
import MembersScreen from "./screens/MembersScreen";
import MemberDetailsScreen from "./screens/MemberDetailsScreen";
import ScrollToTop from "./components/CommonComponents/ScrollToTop";
import AdminScreen from "./screens/AdminScreen";
import EditMemberScreen from "./screens/EditMemberScreen";
import LoginScreen from "./screens/LoginScreen";
import MembersListScreen from "./screens/MembersListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EventsAndNewsScreen from "./screens/EventsAndNewsScreen";
import BlogsScreen from "./screens/BlogsScreen";
import AddEventScreen from "./screens/AddEventScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import EditUserProfileScreen from "./screens/EditUserProfileScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import AddBlogScreen from "./screens/AddBlogScreen";
import BlogDetailsScreen from "./screens/BlogDetailsScreen";
import AddFacultyScreen from "./screens/AddFacultyScreen";
import EditFacultyScreen from "./screens/EditFacultyScreen";
import FacultyListScreen from "./screens/FacultyListScreen";
import GetAutoPassScreen from "./screens/GetAutoPassScreen";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <ScrollToTop/>
    <Routes>
      <Route path="/" exact element={<HomeScreen />} />
      <Route path="/about"  element={<AboutScreen />} />
      <Route path="/me/founder_head" element={<ExecutiveScreen />} />
      <Route path="/advisory-panel" element={<ExecutiveScreen />} />
      <Route path="/faculty-members" element={<ExecutiveScreen />} />
      <Route path="/executive-committee" element={<ExecutiveScreen />} />
      <Route path="/publication"  element={<PublicationScreen />} />
      <Route path="/activities"  element={<EventsAndNewsScreen />} />
      <Route path="/blogs"  element={<BlogsScreen />} />
      <Route path="/members"  element={<MembersScreen />} />
      <Route path="/me/:username"  element={<MemberDetailsScreen />} />
      <Route path="/admin"  element={<AdminScreen />} />
      <Route path="/add-event"  element={< AddEventScreen/>} />
      <Route path="/add-blog"  element={< AddBlogScreen/>} />
      <Route path="/events/:eid"  element={< EventDetailsScreen/>} />
      <Route path="/blogs/:bid"  element={< BlogDetailsScreen/>} />
      <Route path="/editMember/:id"  element={<EditMemberScreen />} />
      <Route path="/editFaculty/:fid"  element={<EditFacultyScreen />} />
      <Route path="/login"  element={<LoginScreen />} />
      <Route path="/membersList"  element={<MembersListScreen />} />
      <Route path="/facultiesList"  element={<FacultyListScreen />} />
      <Route path="/profile"  element={<ProfileScreen />} />
      <Route path="/my-profile"  element={<EditUserProfileScreen />} />
      <Route path="/change-password"  element={<ChangePasswordScreen />} />
      <Route path="/add-faculty"  element={<AddFacultyScreen />} />
      <Route path="/auto-passwords"  element={<GetAutoPassScreen />} />
    
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
