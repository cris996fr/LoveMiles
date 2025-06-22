import React, { useState, useRef } from 'react';

const questions = [
  { question: "Quelle est ta couleur préférée ?", options: ["Rouge ❤️", "Bleu 💙", "Vert 💚", "Jaune 💛"] },
  { question: "Préférez-vous passer du temps à :", options: ["Lire un livre", "Sortir avec des amis", "Faire du sport", "Regarder un film"] },
  // ... les 18 autres questions à ajouter ici ...
];

export default function App() {
  const [location, setLocation] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const audioRef = useRef(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = answer;
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      alert("QCM terminé, merci !");
    }
  };

  const playVoiceMessage = () => {
    if (audioRef.current) audioRef.current.play();
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxWidth: 400, margin: 'auto' }}>
      <h1 style={{ color: '#e91e63' }}>LoveMiles 💞</h1>

      {!location ? (
        <button onClick={getLocation} style={{ padding: 10, backgroundColor: '#e91e63', color: 'white', border: 'none', borderRadius: 10, marginBottom: 20 }}>
          Partager ma position
        </button>
      ) : (
        <p>Votre position : {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
      )}

      <button onClick={playVoiceMessage} style={{ padding: 10, backgroundColor: '#f8bbd0', color: '#880e4f', border: 'none', borderRadius: 10, marginBottom: 20 }}>
        🎧 Écouter un message
      </button>
      <audio ref={audioRef} preload="auto" >
        <source src="/voice/voix1.mp3" type="audio/mpeg" />
      </audio>

      <div>
        <h2>{questions[currentQ].question}</h2>
        {questions[currentQ].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            style={{ display: 'block', margin: '5px 0', padding: 10, borderRadius: 10, backgroundColor: '#f3e5f5', border: 'none' }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
