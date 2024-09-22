// Import modules:
import React from "react";
import "./User.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../services/api/UpdateUser";
import { setFirstName,setLastName } from "../../services/features/GetUserProfile";
import spinner from "../../assets/svg/spinner.svg";

const User = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const firstName = useSelector(state => state.getUserProfile.firstName);
  const lastName = useSelector(state => state.getUserProfile.lastName);
  const token = useSelector(state => state.loginUser.token);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
    setEditFirstName("");
    setEditLastName("");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setEditFirstName("");
    setEditLastName("");
  };

  const handleChangeFirstName = (e) => {
    setEditFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setEditLastName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await updateUser(editFirstName, editLastName, token);
      if (response.status === 200) {
        setIsLoading(false);
        dispatch(setFirstName(editFirstName));
        dispatch(setLastName(editLastName));
        setIsEditing(false);
        setError(false);
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
      throw new Error(`An error occurred while updating the profile, ${error}`);
    }
  };

  return (
    <section className="user">
      {isEditing ? (
        <>
          <h1>Welcome back</h1>
          {isLoading ? (
            <img src={spinner} alt="Loading..." />
          ) : (
            <>
              {error ? (
                <p className="user__error">
                  An error has occurred : Unable to update profile
                </p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="block__input">
                    <input
                      type="text"
                      required
                      placeholder={firstName || ""}
                      value={editFirstName}
                      onChange={handleChangeFirstName}
                    />
                    <input
                      type="text"
                      required
                      placeholder={lastName || ""}
                      value={editLastName}
                      onChange={handleChangeLastName}
                    />
                  </div>
                  <div className="block__btn">
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}!
          </h1>
          <button onClick={handleEdit} type="button">
            Edit Name
          </button>
        </>
      )}
    </section>
  );
};

// Export User
export default User;
