import React, { useEffect, useState } from "react";
import { IUser, Profile } from "../api/types";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../store";

const Prescreen: React.FC = () => {
  const store = useStore();
  const navigate = useNavigate();
  // const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const localProfiles = localStorage.getItem("profiles");

  //   if (localProfiles) {
  //     setProfiles(JSON.parse(localProfiles));
  //   }
  // }, []);

  const handleProfileSelection = async (profile: Profile) => {
    try {
      setLoading(true);
      const { data } = await axios.get<IUser>("/user/single/" + profile.id);
      const payload: IUser = {
        ...data,
        isOtpEnabled: store?.loginResponse?.isOtpEnabled || false,
      };
      store.setAuthUser(payload);
      localStorage.setItem("__user", JSON.stringify(payload));
      navigate("/profile");

      //  if (profile.role?.toLowerCase().includes("admin")) {
      //    // navigate to admin page
      //  } else {
      //    //  navigate to student page

      //  }
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="profiles max-w-md mx-auto">
      <h1 className="text-3xl">Choose account</h1>
      <ul>
        {store?.loginResponse?.profiles.map((profile) => (
          <li key={profile.id}>
            <button
              className="btn"
              onClick={() => handleProfileSelection(profile)}
            >
              {profile.name}

              {profile?.examType
                ? profile?.examType
                : profile?.isStaff
                ? " Staff"
                : "No exam type found"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prescreen;
