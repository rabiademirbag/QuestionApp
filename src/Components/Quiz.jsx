import React, { useEffect, useState } from "react";
import './Quiz.css'
import {BrowserRouter as Router, Routes , Route, useNavigate} from 'react-router-dom';
import TimerDisplay from "./TimerDisplay";

/*Soruların olduğu array*/
const questions = [
    {
      question: "Çin Seddini oluşturan taşlar birbirine ne ile tutturulmuştur?",
      options: ["Bambu Harcı", "Anne Duası", "Pirinç Unu", "Noodle"],
      answer: "Pirinç Unu",
      media: "cin-seddi.jpg",
    },
    {
      question: "İlk Pamuk şekeri bulan kişinin mesleği nedir?",
      options: ["Gıda Mühendisi", "Diş Doktoru", "Ev Hanımı", "Güzellik Uzmanı"],
      answer: "Diş Doktoru",
      media: "pamuk.jpg",
    },
    {
      question:
        "Tarkan'ın 'Hüp' klibini izledikten sonra gaza gelip 'Tarkan keşke beni hüpletseydi' diye açıklamda bulunan kişi kimdir?",
      options: ["Gülben Ergen", "Hülya Avşar", "Harika Avcı", "Sevtap Parman"],
      answer: "Gülben Ergen",
      media: "tarkan.jpg",
    },
    {
      question: "Pteronofobi nedir?",
      options: [
        "Yeşil ışık yanar yanmaz korna çalacak korkusu",
        "Fakir kalma korkusu",
        "Taksi bulamama korkusu",
        "Kuş tüyüyle gıdıklanma korkusu",
      ],
      answer: "Kuş tüyüyle gıdıklanma korkusu",
      media: "fobi.jpg",
    },
    {
      question:
        "Ortalama ömürleri 5 yıl olan Japon balıklarının en uzun yaşayanı Tish, bütün istatistikleri alt üst ederek kaç yıl boyunca hayata tutunmayı başarmıştır?",
      options: ["43", "78", "23", "99"],
      answer: "43",
      media: "balik.jpg",
    },
    {
      question:
        "90'lara damgasını vuran 'Bandıra Bandıra' şarkısının söz yazarı kimdir?",
      options: ["Sezen Aksu", "Sibel Can", "Mustafa Sandal", "Bülent Ersoy"],
      answer: "Mustafa Sandal",
      media: "bandira.jpg",
    },
    {
      question:
        "Hangi şarkıcımız yine kendisi gibi şarkıcı olan sevgilisinden ayrıldıktan sonra tam evinin karşısındaki apartmanın tamamını kendi posteriyle kaplatmıştır?",
      options: ["Hande Yener", "Hadise", "Gülşen", "Simge"],
      answer: "Hadise",
      media: "billboard.jpg",
    },
    {
      question: "Antik Roma'da kadınlar parfüm olarak ne kullanıyordu?",
      options: ["Gül Suyu", "Bal", "Gladyatör Teri", "Kan"],
      answer: "Gladyatör Teri",
      media: "parfum.jpg",
    },
    {
      question: "T-Rex'in yaşayan en yakın akrabası aşağıdakilerden hangisidir?",
      options: ["İnekler", "Tavuklar", "Timsahlar", "Köpekler"],
      answer: "Tavuklar",
      media: "trex.jpg",
    },
    {
      question:
        "Her şeyin olduğu gibi mutluluğun da fobisi varmış. Bu fobiye ne ad verilir?",
      options: ["Çerofobi", "Euphobia", "Felicifobia", "Mutluluk Korkusu"],
      answer: "Çerofobi",
      media: "mutluluk.jpg",
    },
  ];
function Quiz(){
  //ilgili sorunun indexini tutan questionIndex ve onu güncelleyebileceğim setQuestionIndex fonksiyonu
  //başlangıç değeri 0 =>ilk sorunun indexi 0 olduğu için
  const [questionIndex,setQuestionIndex]=useState(0);
  //kullanıcının verdiği cevapları saklayacağım liste başlangıç değeri boş
  const [answerList,setAnswerList]=useState([]);
  //timer 1 den başlıyor
  const [timer,setTimer]=useState(1);
  //sorunun cevaplanıp cevaplanmadığını tutan hasAnswered ve onu güncelleyebileceğim setHasAnswered başlangıç değeri false
  const [hasAnswered, setHasAnswered] = useState(false);
  //soruların bitip bitmediğini kontrol etmek için kullanacağım useState
  const [isFinished,setIsFinished]=useState(false);
  //kullanıcının seçtiği optionu tutan selectedOption ve güncellenmesi için setSelectedOption
  const [selectedOption,setSelectedOption]=useState("");
  //Animasyon için useState
  const [animate, setAnimate] = useState(false);
  //Home Page yönlendirmesi için navigate tanımladım
  const navigate=useNavigate();

  //Question index değiştikçe animasyon tetiklenir
  useEffect(() => {
    // önce animasyonu kaldırır
    setAnimate(false); 
     // sonra tekrar ekler
    const timeout = setTimeout(() => setAnimate(true), 10);
     // useEffect her çalıştığında eski timeout'u temizler
    return () => clearTimeout(timeout);
    //sadece questionIndex değiştiğinde bu efekt çalışır
  }, [questionIndex]);

  useEffect(() => {
    let interval;
  //henüz süre dolmadıysa ve ccevap verilmediyse
    if (!hasAnswered && timer < 30) {
      // Zamanlayıcı başlatıyorum
      interval = setInterval(() => {
        //zamanı 1'er saniye arttııyorum
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  //süre doldu fakat cevap verilmediyse sonraki soruya geçer
    if (timer === 30 && !hasAnswered) {
      nextQuestion();
    }
   // Her useEffect tetiklendiğinde önceki interval temizlenir
    return () => clearInterval(interval);
    //timer hasAnwered ve questionIndex değişirse bu useEffect tetiklenir
  }, [timer, hasAnswered, questionIndex]);
  
  // Verilen cevapların işlendiği fonksiyon
  function handleAnswer(option){
    //Eğer cevap verildiyse tekrar vermesi engellenir
    if (hasAnswered) return;
    //O anki soruyu questions arrayinden alıyorum
    const qurrentQuestion=questions[questionIndex];
    //verilen cevabı setSelectedOption ile güncelliyorum
    setSelectedOption(option);
    //Kullanıcının cevaplarını tuttuğum listeye eskilerini de tutup yenilerini {soru:indexi,selected:verilen cevap, correct:true ya da false}
    //olacak şekilde tutuyorum
    setAnswerList((prev)=>[
      ...prev,
      {question:questionIndex,selected:option, correct:option===qurrentQuestion.answer },
  ])
  //cevap verildiği için bu state'i true olarak güncelliyorum
  setHasAnswered(true);
  //1 sn sonra yeni soruya geçiyorum
  setTimeout(()=>{
    nextQuestion();
  },1000)
  }

  //Bir sonraki soruya geçişi sağlayacak fonksiyon
  function nextQuestion () {
    //Eğer sorular bittiyse yani o anki sorunun indexi+1 questions arrayinin uzunluğundan büyükse (son soruda 9+1=10 olur ve true gelir)
    if (questionIndex + 1 >= questions.length) {
      // Test bittiği için setFinished state'i true olarak güncellenir
      setIsFinished(true);
    }
    //Sorular bitmediyes
    else {
      //Sorunun indexi 1 arttırılır (bir sonraki soruya geçiş)
      setQuestionIndex((prev) => prev + 1);
      //Sayaç baştan başlar
      setTimer(1);
      // Yeni soruda henüz cevap verilmediği için false yapılır
      setHasAnswered(false);
      // Seçili cevap temizlenir
      setSelectedOption("");
    }
  }
  //Testi tekrar başlatmak için fonksiyon
  function restartQuiz() {
    //QuestionIndexi sıfırlanıp ilk soruya geçilir
    setQuestionIndex(0);
    //Henüz cevap olmayacağı için liste sıfırlanır
    setAnswerList([]);
    //Timer 1'den başlatılır
    setTimer(1);
    // Henüz cevap verilmediği için hasAnswered false yapılır
    setHasAnswered(false);
    //Test henüz bitmediği için isFinished false yapılır
    setIsFinished(false);
    //Seçili cevap temizlenir
    setSelectedOption("");
  }

  
// Eğer test bitmişse sonucu gösteren ekran render edilir
if (isFinished) {
  return (
    // Sonuç ekranı için dış kapsayıcı div
    <div className="result">
      {/* Sonuç kartı için iç div */}
      <div className="result-div">
        {/* Testin tamamlandığını belirten başlık */}
        <h2>Test Bitti</h2>
        {/* Doğru cevap sayısı */}
        <p>Doğru: {answerList.filter(a => a.correct).length}</p>
        {/* Yanlış cevap sayısı (cevap verilmiş ama yanlış olanlar) */}
        <p>Yanlış: {answerList.filter(a => a.selected && !a.correct).length}</p>
        {/* Boş bırakılan soru sayısı */}
        <p>Boş: {questions.length - answerList.length}</p>

        {/* Her bir soruya ait detayları gösteren alan */}
        <div className="answer-summary">
          {/* Tüm soruları map ile dönüyorum */}
          {questions.map((q, index) => {
            // Bu soruya ait kullanıcı cevabını buluyorum
            const answer = answerList.find((a) => a.question === index);
            // Eğer cevap verilmişse kullanıcı cevabını alıyorum yoksa "Boş" yazıyorum
            const userAnswer = answer ? answer.selected : "Boş";
            // Eğer cevap verilmişse doğru mu yanlış mı kontrol ediyorum
            const isCorrect = answer ? answer.correct : false;

            return (
              // Her soru için ayrı bir kutucuk render ediyorum
              <div key={index} style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                {/* Soru metni */}
                <p><strong>{index + 1}. Soru:</strong> {q.question}</p>
                {/* Kullanıcının verdiği cevap */}
                <p><strong>Verdiğiniz Cevap:</strong> {userAnswer}</p>
                {/* Doğru cevap */}
                <p><strong>Doğru Cevap:</strong> {q.answer}</p>
                <p>
                  {/* Cevabın durumunu (doğru/yanlış/boş) gösteriyorum */}
                  <strong>Durum:</strong>{" "}
                  {answer
                    ? isCorrect
                      // Doğru cevapsa yeşil
                      ? <span style={{ color: "green" }}>Doğru</span>
                      // Yanlış cevapsa kırmızı
                      : <span style={{ color: "red" }}>Yanlış</span>
                      // Cevap verilmemişse gri
                    : <span style={{ color: "gray" }}>Boş</span>}
                </p>
              </div>
            );
          })}
        </div>

        <button onClick={restartQuiz} className="restart-button">
          Teste Tekrar Başla
        </button>
        <button onClick={() => navigate('/')}>Ana Sayfaya Geri Dön</button>
      </div>
    </div>
  );
}

    {/*Test bitmediyse Şu anki soruyu questions dizisinden alır*/}
    const current = questions[questionIndex];
    return (
      /* Tüm quiz alanı için genel div */
        <div className="quiz">
          {/*Card yapısı için div animate true ise fade-in sınıfı eklenir ve animasyon oynar, değilse sadece "quiz-card" olarak kalır*/}
          <div className={`quiz-card ${animate ? "fade-in" : ""}`}>
            {/*Kaçıncı soruda olunduğu bilgisi (index 0'dan başladığı için +1 verdim)*/}
            <h2>Soru {questionIndex + 1}</h2>
            {/*görselleri ve soruyu içeren div*/}
            <div className="quiz-images">
              {/*Her bir görselin yolu*/}
              <img src={`/pictures/${current.media}`} alt="soru görseli" />
              {/*İlgili soru*/}
              <p>{current.question}</p>
            </div>
            {/*Seçenekler için genel div*/}
            <div className="options">
              {/*Seçeneklerin 4 sn sonra gelmesi için eğer timer 4 olduysa*/}
              {timer >= 4 &&
              /*o anki sorunun şıkları map edilir ve her bir şık için button oluşturulur*/
              current.options.map((opt, i) => (
              <button
                /*butona uniqe key değeri*/
                key={i}
                /*herhangi bir butona tıklandığında yani cevap verildiğinde handleAnswer çağrılır*/
                onClick={() => handleAnswer(opt)}
                /*cevap verildiyse diğer butonlar disabled olur*/
                disabled={hasAnswered}
              >
              {/* Seçeneğin metni verilir */}
              {opt}
              </button>
              ))
              }
            </div>
            {/*Timer için genel div ve timerın yazılması*/}
            <TimerDisplay timer={timer} />
          </div>
        </div>
    );
  };
export default Quiz;