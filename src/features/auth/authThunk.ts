import { signInWithPhoneNumber } from "firebase/auth";
import type { AppDispatch } from "../../app/store";
import { auth } from "../../services/firebase";
import { setupRecaptcha } from "../../services/firebase";
import { authStart, authSuccess, authFailure } from "./authSlice";

export const sendOtp =
  (phone: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authStart());

      setupRecaptcha();

      const appVerifier = (window as any).recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        appVerifier
      );

      (window as any).confirmationResult = confirmationResult;

      dispatch(authSuccess({ phone }));
    } catch (error: any) {
      dispatch(authFailure(error.message || "Failed to send OTP"));
    }
  };
