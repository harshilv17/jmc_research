const modules = [
  { name: "Products", desc: "Create & manage the catalogue", status: "planned" },
  { name: "Collections", desc: "Group products into lines", status: "planned" },
  { name: "Inventory", desc: "Stock, reservations, locations", status: "planned" },
  { name: "Orders", desc: "Order & fulfilment pipeline (OMS)", status: "planned" },
  { name: "Inquiries", desc: "Storefront enquiries / leads", status: "planned" },
  { name: "Journal", desc: "Editorial content", status: "planned" },
];

export default function Dashboard() {
  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "64px 24px" }}>
      <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a24b" }}>
        Jatin Malik Couture
      </p>
      <h1 style={{ fontSize: 32, fontWeight: 300, marginTop: 8 }}>
        Admin · OMS
      </h1>
      <p style={{ color: "#9b968c", marginTop: 8 }}>
        In-house content & order management. Modules below are scaffolded and
        wired to the API as each phase lands.
      </p>

      <div
        style={{
          marginTop: 40,
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {modules.map((m) => (
          <div
            key={m.name}
            style={{
              border: "1px solid #2a2a2c",
              borderRadius: 8,
              padding: 20,
              background: "#161617",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 18, fontWeight: 500 }}>{m.name}</h2>
              <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9b968c" }}>
                {m.status}
              </span>
            </div>
            <p style={{ color: "#9b968c", fontSize: 14, marginTop: 8 }}>{m.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
