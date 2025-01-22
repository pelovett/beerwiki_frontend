// components/logout_buttom.js

"use client"; // Mark this component as a client-side component

const LogoutButton = () => {
  const handleLogout = () => {
    window.document.cookie =
      "login_cookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    window.location.href = "/user/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
