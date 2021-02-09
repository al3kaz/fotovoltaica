import React from "react";

const LoginPage = ({ handleLogin }) => {
  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Nazwa użytkownika</label>
        <input type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Hasło</label>
        <input type="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
    </form>
  );
};

export default LoginPage;
