import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfile } from "../../Redux/Useraction.js";
import User from "../../components/User/User.js";
import Account from "../../components/Account/Account.js";

/* User profile page */
function UserProfile() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  /* Asynchronous function that retrieves user data and updates it with useEffect */
  useEffect(() => {
    if (token) {
      const userData = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/v1/user/profile",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();

            const userData = {
              createdAt: data.body.createdAt,
              updatedAt: data.body.updatedAt,
              id: data.body.id,
              email: data.body.email,
              firstname: data.body.firstName,
              lastname: data.body.lastName,
              username: data.body.userName,
            };
            /* Return user data in redux state */
            dispatch(userProfile(userData));
          } else {
            console.log("error while retrieving profile");
          }
        } catch (error) {
          console.error(error);
        }
      };
      userData();
    }
  }, [dispatch, token]);

  return (
    <div className="profile-page">
      <main className="bg-dark">
        {/* Return user component */}
        <User />

        {/* Hardcoded account components */}
        <Account
          key="1"
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          key="2"
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          key="3"
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
    </div>
  );
}

export default UserProfile;