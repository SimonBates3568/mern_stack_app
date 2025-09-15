import { FaDumbbell, FaHeart } from "react-icons/fa";

function Footer() {
    return (
        <footer
            style={{
                background: "#222",
                color: "#fff",
                padding: "0.4rem 0",
                position: "fixed",
                left: 0,
                bottom: 0,
                width: "100%",
                textAlign: "center",
                zIndex: 100
            }}
        >
            <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: "1.2rem", marginBottom: "0.2rem" }}>
                    <FaDumbbell style={{ marginRight: "0.3rem" }} />
                    <FaHeart color="#e63946" />
                </div>
                <p style={{ margin: 0, fontSize: "0.95rem" }}>
                    &copy; 2025 <strong>Workout Buddy</strong>. All rights reserved.
                </p>
                <small style={{ marginTop: "0.2rem", color: "#aaa", fontSize: "0.8rem" }}>
                    Made with <FaHeart color="#e63946" /> for fitness lovers.
                </small>
            </div>
        </footer>
    );
}

export default Footer;