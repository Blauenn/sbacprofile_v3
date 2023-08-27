import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/misc/Sidebar/Sidebar.component";
import Loading from "./components/misc/Loading.component";
import PageNotFound from "./components/misc/PageNotFound.component";

// Contexts //
import { useContext_Account } from "./context/Account.context";
import { MajorContextProvider } from "./context/Majors.context";
import { ClassroomContextProvider } from "./context/Classrooms.context";
import { StudentsContextProvider } from "./context/Students.context";
import { TeachersContextProvider } from "./context/Teachers.context";
import { getDataAuthenticated } from "./functions/fetchFromAPI.function";
import { API_ENDPOINT } from "./constants/API_ENDPOINT";

// Lazy page imports //
const Login = lazy(() => import("./pages/Login.page"));

const Home = lazy(() => import("./pages/Home.page"));

const Dashboard = lazy(() => import("./pages/Dashboard.page"));

const Teachers = lazy(() => import("./pages/Teachers.page"));
const Students = lazy(() => import("./pages/Students.page"));

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
    // Fetch all notifications. //
    // Fetch notifications. //

    // Log the user out if user state is empty. //
    if (accessToken == undefined && userInfo == undefined) {
      setIsLoggedIn(false);
    }

    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setIsLoggedIn(true);

      getDataAuthenticated(
        `${API_ENDPOINT}/api/v1/profile/getProfile`,
        storedAccessToken,
        (result: any) => {
          setUserInfo(result);
          localStorage.setItem("userInfo", result);
        }
      );
    }
  }, []);

  return (
    <BrowserRouter>
      {isLoggedIn ? (
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
                        <Route path="*" element={<PageNotFound />}></Route>

                        {/* Home */}
                        <Route path="/home" element={<Home />}></Route>

                        {/* Dashboard */}
                        <Route
                          path="/dashboard"
                          element={<Dashboard />}></Route>

                        {/* Teachers */}
                        <Route path="/teachers" element={<Teachers />}></Route>
                        {/* Students */}
                        <Route path="/students" element={<Students />}></Route>
                        {/* Clubs */}
                        <Route path="/clubs" element={<Clubs />}></Route>

                        {/* Settings */}
                        <Route path="/settings" element={<Settings />}></Route>
                      </Routes>
                    </Suspense>
                  </div>
                </div>
              </TeachersContextProvider>
            </StudentsContextProvider>
          </ClassroomContextProvider>
        </MajorContextProvider>
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
