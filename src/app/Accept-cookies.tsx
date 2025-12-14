export default function AcceptCookies() {
    const handleClick = () => {
        localStorage.setItem("cookiesAccepted", "true");
        document.querySelector(".accept-cookies")?.remove();
    }
    return (
        <div className="accept-cookies" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000, backgroundColor: "#fff", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", border: "1px solid #ccc" }}>
            <h1>Мы используем cookie файлы. Оставаясь на сайте, вы соглашаетесь <a style={{ color: "blue" }} href="/privacy-policy">с их применением</a></h1>
            <button style={{ padding: "10px 20px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "5px" }} onClick={handleClick}>Принять</button>
        </div>
    );
}