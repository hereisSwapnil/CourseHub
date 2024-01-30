// components/Toast.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast, removeAllToasts } from "../actions/toastActions";

const Toast = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toasts.toasts);

  const handleToastClose = (id) => {
    dispatch(removeToast(id));
  };

  const handleRemoveAllToasts = () => {
    dispatch(removeAllToasts());
  };

  return (
    <div className="toast-container">
      {/* Custom button to remove all toasts */}
      <button onClick={handleRemoveAllToasts}>Remove All Toasts</button>
      {/* Display individual toasts */}
      {toasts.map((toastInfo) => (
        <div key={toastInfo.id} className={`toast ${toastInfo.type}`}>
          <span>{toastInfo.message}</span>
          <button onClick={() => handleToastClose(toastInfo.id)}>Close</button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
