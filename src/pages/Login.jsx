import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth({ setIsAuthenticated }) {
    const [isLoginMode, setIsLoginMode] = useState(true); // Stato per alternare tra Login e Registrazione
    const [name, setName] = useState(""); // Necessario solo per la registrazione
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const url = isLoginMode ? "http://localhost:5000/auth/login" : "http://localhost:5000/auth/register";
        const body = isLoginMode ? { email, password } : { name, email, password };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) throw new Error("Errore durante l'autenticazione");

            const data = await response.json();
            localStorage.setItem("token", data.token);
            setIsAuthenticated(true);
            navigate("/dashboard");
        } catch (err) {
            setError("Errore: " + err.message);
        }
    };

    return (
        <div>
            <h2>{isLoginMode ? "Login" : "Registrazione"}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                {!isLoginMode && (
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLoginMode ? "Accedi" : "Registrati"}</button>
            </form>

            <button onClick={() => setIsLoginMode(!isLoginMode)}>
                {isLoginMode ? "Non hai un account? Registrati" : "Hai già un account? Accedi"}
            </button>
        </div>
    );
}

export default Auth;
