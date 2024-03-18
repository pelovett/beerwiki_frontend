import "./globals.css";
import Message from "@/app/components/user_message";

export default function Home() {
  return (
    <main style={{ height: "100%" }}>
      <Message />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <p>Drink responsibly!</p>
      </div>
    </main>
  );
}


