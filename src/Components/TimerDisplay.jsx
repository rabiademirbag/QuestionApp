import React from "react";
// React Circular Progressbar'ı ve stil oluşturan fonksiyonunu import ediyorum
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// Progressbar için gerekli CSS dosyasının importu
import "react-circular-progressbar/dist/styles.css";

// TimerDisplay componenti timer prop'unu alır
const TimerDisplay = ({ timer }) => {
  // Timer 4 saniyeye gelene kadar sadece rakam olarak gösterilir
  if (timer < 4) {
    // Sayı ekranda yazı olarak gösterilir
    return <div className="timer-text">{timer}</div>;
  }
  // 30 saniyeden geri sayımı yüzdeye çevirir ilk 4 saniye gizlendiği için 26 saniyeye göre oranlanır
  const percentage = ((30 - timer) / 26) * 100;

  return (
    // Progressbar için stil tanımlanır genişlik yükseklik 50px , yukardan ve aşağıdan 10 px dış boşluk ve auto ile yatayda ortalanır
    <div style={{ width: 50, height: 50, margin: "10px auto" }}>
      <CircularProgressbar
      // Dönel ilerleme yüzdesi
        value={percentage}
        // Ortada gösterilecek metolan kalan süre kısmı
        text={`${30 - timer}s`}
        styles={buildStyles({
          // Yazı boyutu
          textSize: "24px",
          // İlerleme yolu rengi
          pathColor: "#00304f",
          // Metin rengi
          textColor: "#00304f",
          // Geriye kalan yolun rengi
          trailColor: "#eee",
        })}
      />
    </div>
  );
};

export default TimerDisplay;
