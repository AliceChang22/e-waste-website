"use client";
import { useState, useEffect } from "react";

export default function SortingGame() {

    const items = [
        { name: "Old Laptop (slow working)", correct: "reuse" },
        { name: "Bluetooth Speaker (fully working)", correct: "reuse" },
        { name: "Desktop monitor (works, older model)", correct: "reuse" },
        { name: "Gaming Console", correct: "reuse" },
        { name: "Working iPhone 11", correct: "reuse" },
        { name: "Phone with cracked screen", correct: "repair" },
        { name: "Laptop with failing battery", correct: "repair" },
        { name: "Headphones with broken ear cushion", correct: "repair" },
        { name: "Tablet that won't charge", correct: "repair" },
        { name: "Keyboard with stuck keys", correct: "repair" },
        { name: "Old router (not working)", correct: "recycle" },
        { name: "Dead power bank", correct: "recycle" },
        { name: "Tangled charging cables", correct: "recycle" },
        { name: "Broken microwave", correct: "recycle" },
        { name: "Not working printer", correct: "recycle" },
        { name: "Loose lithium-ion battery", correct: "special" },
        { name: "Swollen phone battery", correct: "special" },
        { name: "CRT television", correct: "special" },
        { name: "Ink cartridge", correct: "special" },
        { name: "Fluorescent light bulb", correct: "special" }
    ];

    const [selected, setSelected] = useState(null);
    const [fallingItem, setFallingItem] = useState(null);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [target, setTarget] = useState({ x: 0, y: 0 });
    const [falling, setFalling] = useState(false);
    const [sorted, setSorted] = useState([]);
    const [itemWidth, setItemWidth] = useState(0);
    const [score, setScore] = useState(0);
    // const [message, setMessage] = useState("");

    function selectItem(item, e) {
        setSelected(item);

        const rect = e.currentTarget.getBoundingClientRect();

        setLeft(rect.left);
        setTop(rect.top);
        setItemWidth(rect.width);
    }

    function placeItem(category, e) {

        if (!selected) return;

        const rect = e.currentTarget.getBoundingClientRect();

        const targetX = rect.left + rect.width / 2 - 80;
        const targetY = rect.top + 20;

        setLeft(targetX);
        setTarget({ x: targetX, y: targetY });

        setFallingItem(selected);
        setFalling(true);
        setSorted(prev => [...prev, selected]);

        if (selected.correct === category) {
            setScore(prev => prev + 1);
        }

        setSelected(null);
    }

    useEffect(() => {

        if (!falling) return;

        let animation;

        function animate() {

            setTop(prev => {
                if (prev >= target.y) {
                    setFalling(false);
                    setFallingItem(null);
                    cancelAnimationFrame(animation);
                    return prev;
                }
                return prev + 8;
            });

            animation = requestAnimationFrame(animate);
        }

        animation = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animation);

    }, [falling, target]);

    const styles = {
        container: { background: "#31004c", color: "white", height: "100vh", width: "100vw", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "18px", textAlign: "center" },
        title: { marginBottom: 20, fontFamily: "'Georgia', serif", },
        itemsGrid: { display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 20, width: "100%", maxWidth: 1100 },
        item: { backgroundImage: "linear-gradient(45deg,#6047c2, #8137b0)", padding: "12px", borderRadius: "10px", cursor: "pointer", fontSize: 14, minHeight: 85, maxWidth:190, fontSize:18},
        categories: { display: "flex", justifyContent: "space-around", width: "100%", maxWidth: 900, marginBottom: 30, fontSize:20, textTransform:"uppercase",fontFamily: "'Georgia', serif", },
        category: { padding: "25px", borderRadius: "14px", width: 160, height: 120, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", },
    };

    return (

        <div style={styles.container}>
            {/* Score label - top right corner */}
    <div style={{position: "absolute",top: 20,right: 20,background: "#6047c2ff",padding: "10px 20px",borderRadius: 30,fontSize: 20,fontFamily: "'Georgia', serif",
    }}>
        Score: {score}
    </div>
            <h1 style={styles.title}>Sort the items into the right box!</h1>

            {sorted.length === items.length && (
                <div>
                    <h1 style={{fontSize:48,padding:20}}>Game Complete!</h1>
                    <div></div>
                    <h2>Final Score: {score}</h2>
                </div>
            )}


            <div style={styles.itemsGrid}>
                {items.map((item, index) => {
                    const isSorted = sorted.some(sortedItem => sortedItem.name === item.name);
                    return (
                        <div
                            key={index}
                            style={{
                                ...styles.item,
                                visibility: isSorted ? "hidden" : "visible",
                                outline: selected?.name === item.name ? "3px solid white" : "none"
                            }}
                            onClick={(e) => !isSorted && selectItem(item, e)}
                        >
                            {item.name}
                        </div>
                    )

                })}

            </div>

            {fallingItem && (
                <div style={{ position: "fixed", left: 0, top: 0, width: itemWidth, transform: `translate(${left}px,${top}px)`, background: "#9c84ff", padding: "10px", borderRadius: "8px", pointerEvents: "none", zIndex: 1000 }}>
                    {fallingItem.name}
                </div>
            )}

            <div style={styles.categories}>

                <div style={{ height: "auto" }} onClick={(e) => placeItem("reuse", e)}>
                    <img src="/Reuse.png" style={{ width: 150, height: 150, objectFit: "contain", paddingBottom: 20 }} />
                    <p>Reuse</p>
                </div>
                <div style={{ height: "auto" }} onClick={(e) => placeItem("repair", e)}>
                    <img src="/Repair.png" style={{ width: 150, height: 150, objectFit: "contain", paddingBottom: 20 }} />
                    <p>Repair</p>
                </div>
                <div style={{ height: "auto" }} onClick={(e) => placeItem("recycle", e)}>
                    <img src="/Recycle.png" style={{ width: 150, height: 150, objectFit: "contain", paddingBottom: 20 }} />
                    <p>Recycle</p>
                </div>
                <div style={{ height: "auto" }} onClick={(e) => placeItem("special", e)}>
                    <img src="/Special.png" style={{ width: 150, height: 150, objectFit: "contain", paddingBottom: 20 }} />
                    <p>Special</p>
                </div>
            </div>
        </div>
    );
}