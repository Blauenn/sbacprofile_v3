import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getDataAuthenticated } from "./functions/fetchFromAPI.function";
import Sidebar from "./components/misc/Sidebar/Sidebar.component";
import Loading from "./components/misc/Loading.component";
import PageNotFound from "./components/misc/PageNotFound.component";
import { admin_access_only } from "./functions/permissionChecks.function";
import { API_ENDPOINT } from "./constants/ENDPOINTS";

// Contexts //
import { useContext_Account } from "./context/Account.context";
import { MajorContextProvider } from "./context/Majors.context";
import { ClassroomContextProvider } from "./context/Classrooms.context";
import { StudentsContextProvider } from "./context/Students.context";
import { TeachersContextProvider } from "./context/Teachers.context";
import { LeaveNoticesContextProvider } from "./context/LeaveNotices.context";
import { ClubsContextProvider } from "./context/Clubs.context";
import { AnnouncementsContextProvider } from "./context/Announcements.context";
import { RequestFormsContextProvider } from "./context/RequestForms.context";

// Lazy page imports //
const Login = lazy(() => import("./pages/Login.page"));

const Home = lazy(() => import("./pages/Home.page"));
const Announcements = lazy(() => import("./pages/Announcements.page"));

// Admin //
const Admin_announcements = lazy(
  () => import("./pages/AdminOnly/Admin_announcements.page")
);
const Admin_classrooms = lazy(
  () => import("./pages/AdminOnly/Admin_classrooms.page")
);
const Admin_students = lazy(
  () => import("./pages/AdminOnly/Admin_students.page")
);
const Admin_teachers = lazy(
  () => import("./pages/AdminOnly/Admin_teachers.page")
);
const Admin_clubs = lazy(() => import("./pages/AdminOnly/Admin_clubs.page"));
const Admin_leaveNotices = lazy(
  () => import("./pages/AdminOnly/Admin_leaveNotices.page")
);
const Admin_requestForms = lazy(
  () => import("./pages/AdminOnly/Admin_requestForms.page")
);

const Head_students = lazy(() => import("./pages/HeadOnly/Head_students.page"));
const Head_teachers = lazy(() => import("./pages/HeadOnly/Head_teachers.page"));
const Head_clubs = lazy(() => import("./pages/HeadOnly/Head_clubs.page"));
const Head_leaveNotices = lazy(
  () => import("./pages/HeadOnly/Head_leaveNotices.page")
);
const Head_requestForms = lazy(
  () => import("./pages/HeadOnly/Head_requestForms.page")
);

const Dashboard = lazy(() => import("./pages/Dashboard.page"));
const LeaveNotices = lazy(() => import("./pages/LeaveNotices.page"));
const RequestForms = lazy(() => import("./pages/RequestForms.page"));

const Teachers = lazy(() => import("./pages/Teachers.page"));
const Students = lazy(() => import("./pages/Students.page"));

const Club = lazy(() => import("./pages/Club.page"));
const Clubs = lazy(() => import("./pages/Clubs.page"));

const Settings = lazy(() => import("./pages/Settings.page"));

const Root = () => {
  const {
    accessToken,
    setAccessToken,
    userInfo,
    setUserInfo,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext_Account();

  // Check if the user is already logged in //
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setIsLoggedIn(true);

      if (accessToken) {
        getDataAuthenticated(
          `${API_ENDPOINT}/api/v1/profile/getProfile`,
          accessToken,
          (result: any) => {
            setUserInfo(result);
            localStorage.setItem("userInfo", result);
          }
        );
      } else {
        setIsLoggedIn(false);
      }
    }
  }, [accessToken, setAccessToken, setIsLoggedIn, setUserInfo]);

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <AnnouncementsContextProvider>
          <ClubsContextProvider>
            <RequestFormsContextProvider>
              <LeaveNoticesContextProvider>
                <MajorContextProvider>
                  <ClassroomContextProvider>
                    <StudentsContextProvider>
                      <TeachersContextProvider>
                        <div className="flex flex-row">
                          <Sidebar />

                          <div className="relative ms-20 me-8 my-16 | sm:ms-32 sm:me-20 sm:my-20 | lg:ms-40 lg:me-28 | w-full">
                            <Suspense fallback={<Loading />}>
                              <Routes>
                                {/* No URL */}
                                <Route
                                  path=""
                                  element={<Navigate to="/home" replace />}
                                />
                                <Route
                                  path="/login"
                                  element={<Navigate to="/home" replace />}
                                />
                                {/* Page not found */}
                                <Route
                                  path="*"
                                  element={<PageNotFound />}></Route>

                                {/* Home */}
                                <Route path="/home" element={<Home />}></Route>
                                {/* Announcements */}
                                <Route
                                  path="/announcements"
                                  element={<Announcements />}></Route>

                                {/* Admin only */}
                                {/* Announcements */}
                                <Route
                                  path="/admin/announcements"
                                  element={
                                    admin_access_only(
                                      userInfo.profile_position
                                    ) ? (
                                      <Admin_announcements />
                                    ) : (
                                      <PageNotFound />
                                    )
                                  }></Route>
                                {/* Classrooms */}
                                <Route
                                  path="/admin/classrooms"
                                  element={
                                    admin_access_only(
                                      userInfo.profile_position
                                    ) ? (
                                      <Admin_classrooms />
                                    ) : (
                                      <PageNotFound />
                                    )
                                  }></Route>
                                {/* Students */}
                                <Route
                                  path="/admin/students"
                                  element={
                                    admin_access_only(
                                      userInfo.profile_position
                                    ) ? (
                                      <Admin_students />
                                    ) : (
                                      <PageNotFound />
                                    )
                                  }></Route>
                                {/* Teachers */}
                                <Route
                                  path="/admin/teachers"
                                  element={
                                    admin_access_only(
                                      userInfo.profile_position
                                    ) ? (
                                      <Admin_teachers />
                                    ) : (
                                      <PageNotFound />
                                    )
                                  }></Route>
                                {/* Clubs */}
                                <Route
                                  path="/admin/clubs"
                                  element={
                                    admin_access_only(
                                      userInfo.profile_position
                                    ) ? (
                                      <Admin_clubs />
                                    ) : (
                                      <PageNotFound />
                                    )
                                  }></Route>
                                {/* Leave notices */}
                                <Route
                                  path="/admin/leaveNotices"
                                  element={
                                    admin_access_only(
                                      userInfo.profile_position
                                    ) ? (
                                      <Admin_leaveNotices />
                                    ) : (
                                      <PageNotFound />
                                    )
                                  }></Route>
                                {/* Request forms */}
                                <Route
                                  path="/admin/requestForms"
                                  element={
                                    admin_access_only(
                                      userInfo.profile_position
                                    ) ? (
                                      <Admin_requestForms />
                                    ) : (
                                      <PageNotFound />
                                    )
                                  }></Route>

                                {/* Dashboard */}
                                <Route
                                  path="/dashboard"
                                  element={<Dashboard />}></Route>

                                {/* Head of department only */}
                                {/* Head students */}
                                <Route
                                  path="/majors/students"
                                  element={<Head_students />}></Route>
                                {/* Head teachers */}
                                <Route
                                  path="/majors/teachers"
                                  element={<Head_teachers />}></Route>
                                {/* Head clubs */}
                                <Route
                                  path="/majors/clubs"
                                  element={<Head_clubs />}></Route>
                                {/* Head leave notices */}
                                <Route
                                  path="/majors/leaveNotices"
                                  element={<Head_leaveNotices />}></Route>
                                {/* Head request forms */}
                                <Route
                                  path="/majors/requestForms"
                                  element={<Head_requestForms />}></Route>

                                {/* Leave notices */}
                                <Route
                                  path="/leaveNotices"
                                  element={<LeaveNotices />}></Route>
                                {/* Request forms */}
                                <Route
                                  path="/requestForms"
                                  element={<RequestForms />}></Route>

                                {/* Teachers */}
                                <Route
                                  path="/teachers"
                                  element={<Teachers />}></Route>
                                {/* Students */}
                                <Route
                                  path="/students"
                                  element={<Students />}></Route>
                                {/* Clubs */}
                                <Route
                                  path="/clubs"
                                  element={<Clubs />}></Route>
                                {/* Current club */}
                                <Route path="/club" element={<Club />}></Route>

                                {/* Settings */}
                                <Route
                                  path="/settings"
                                  element={<Settings />}></Route>
                              </Routes>
                            </Suspense>
                          </div>
                        </div>
                      </TeachersContextProvider>
                    </StudentsContextProvider>
                  </ClassroomContextProvider>
                </MajorContextProvider>
              </LeaveNoticesContextProvider>
            </RequestFormsContextProvider>
          </ClubsContextProvider>
        </AnnouncementsContextProvider>
      ) : (
        <Suspense>
          <Routes>
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={
                <Login
                  setAccessToken={setAccessToken}
                  setUserInfo={setUserInfo}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
          </Routes>
        </Suspense>
      )}
    </BrowserRouter>
  );
};

export default Root;
