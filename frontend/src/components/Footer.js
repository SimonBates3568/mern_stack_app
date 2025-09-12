import { FaDumbbell, FaHeart } from "react-icons/fa";

function Footer() {
    return (
        <footer
            style={{
                background: "#222",
                color: "#fff",
                padding: "1.5rem 0",
                position: "fixed",
                left: 0,
                bottom: 0,
                width: "100%",
                textAlign: "center",
                zIndex: 100
            }}
        >
            <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    <FaDumbbell style={{ marginRight: "0.5rem" }} />
                    <FaHeart color="#e63946" />
                </div>
                <p style={{ margin: 0 }}>
                    &copy; 2025 <strong>Workout Buddy</strong>. All rights reserved.
                </p>
                <small style={{ marginTop: "0.5rem", color: "#aaa" }}>
                    Made with <FaHeart color="#e63946" /> for fitness lovers.
                </small>
            </div>
        </footer>
    );
}

export default Footer;