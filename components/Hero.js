"use client";

export default function Hero() {

    return (
        <div style={{
            height: "100vh", /* 100% of the viewport height */
            width: "100vw",  /* 100% of the viewport width */
            overflow: "hidden"
        }}>
            <img src="/HeroImage.png" style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
            }}/>; 
            
        </div>
    );
}