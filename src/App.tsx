import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { useAppDispatch } from "./hooks/reduxHooks";
import { authSuccess, logout } from "./features/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authSuccess(user));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
