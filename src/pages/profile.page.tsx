import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";
import { IUser } from "../api/types";
import TwoFactorAuth from "../components/TwoFactorAuth";
import useStore from "../store";
import {
  GenerateOtpInput,
  GenerateOtpResponse,
} from "../interfaces/auth.interface";
import axios from "axios";

const ProfilePage = () => {
  const [secret, setSecret] = useState({
    otpauth_url: "",
    base32: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const store = useStore();
  const user = store.authUser;

  const generateQrCode = async ({ authId, email }: GenerateOtpInput) => {
    try {
      store.setRequestLoading(true);
      const { data } = await axios.post<GenerateOtpResponse>(
        "/auth/generate-otp",
        { authId, email }
      );
      store.setRequestLoading(false);

      if (data?.otpAuthUrl) {
        setOpenModal(true);
        setSecret({
          base32: data.secret,
          otpauth_url: data.otpAuthUrl,
        });
      }
    } catch (error: any) {
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const disableTwoFactorAuth = async (authId: string) => {
    if (!store?.authUser) return;
    try {
      store.setRequestLoading(true);
      const { data } = await axios.post<{
        isOtpEnabled: boolean;
      }>("/auth/disable-otp", { authId, email: store.authUser.email });
      store.setRequestLoading(false);
      if (store?.authUser) {
        store.setAuthUser({
          ...store.authUser,
          isOtpEnabled: data.isOtpEnabled || false,
        });
      }
      toast.warning("Two Factor Authentication Disabled", {
        position: "top-right",
      });
    } catch (error: any) {
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  // useEffect(() => {
  //   if (!store.authUser) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <>
      <section className="bg-ct-blue-600  min-h-screen pt-10">
        <div className="max-w-4xl p-12 mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex gap-20 justify-center items-start">
          <div className="flex-grow-2">
            <h1 className="text-2xl font-semibold">Profile Page</h1>
            <div className="mt-8">
              <p className="mb-4">ID: {user?.id}</p>
              <p className="mb-4">Name: {user?.firstName}</p>
              <p className="mb-4">Email: {user?.email}</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">
              Mobile App Authentication (2FA)
            </h3>
            <p className="mb-4">
              Secure your account with TOTP two-factor authentication.
            </p>
            {store.authUser?.isOtpEnabled ? (
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                onClick={() => disableTwoFactorAuth(user?.id!)}
              >
                Disable 2FA
              </button>
            ) : (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                onClick={() =>
                  generateQrCode({ authId: user?.authId!, email: user?.email! })
                }
              >
                Setup 2FA
              </button>
            )}
          </div>
        </div>
      </section>
      {openModal && store?.authUser && (
        <TwoFactorAuth
          base32={secret.base32}
          otpauth_url={secret.otpauth_url}
          authId={store.authUser?.authId!}
          email={store.authUser.email}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default ProfilePage;
