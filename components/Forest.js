"use client";

export default function Forest() {
    return (
        <div style={{
            backgroundImage: "url('/Forest.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",

            height: "100vh",
            width: "100%",
            color: "white",
            textAlign: "center", 
            padding: "150px"

        }}>

            <div style={{
                width: "800px",
                height: "200px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "30px"
            }}>
                <h1 style={{ fontSize: "60px" }}>50 million</h1>
                <p style={{
                    marginTop: "30px"
                }}>Every year, 50 million tonnes of e-waste is discarded, which poisons the land, water, and air.</p>
                <p style={{
                    marginTop: "5px"}}>Now, let's go underground and help collect e-waste objects!</p>
            </div>
        </div>
    );
}