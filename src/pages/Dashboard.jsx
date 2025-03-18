import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");  // Se non c'è il token, rimanda al login
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/auth/dashboard", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Accesso negato");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
        navigate("/login");
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <p>Benvenuto, {user.name}!</p>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
}

export default Dashboard;
