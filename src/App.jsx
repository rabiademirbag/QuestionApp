import './App.css'
import {BrowserRouter as Router, Routes , Route, useNavigate} from 'react-router-dom';
import Quiz from './Components/Quiz'

function HomePage(){
  /*Router kullanacağım için navigate tanımlıyorum*/
  const navigate=useNavigate();
  return(
  <div>
  {/*Genel kapsayıcı*/}
    <div className="content">
      {/*Card yapısının divi*/}
      <div className="card">
        {/*Logo için div*/}
        <div className="logo">
          qA
          </div>
          {/*Ana sayfanın başlığı*/}
          <h4>QUIZ APP</h4>
          {/*Test kuralları için ul*/}
          <ul>
          {/*Her bir li elementinde test kuralları var*/}
          <li>Quiz 10 sorudan oluşmaktadır</li>
          <li>Her soru ekranda en fazla 30sn gözükür</li>
          <li>İlk 4sn cevap şıkları görünmez</li>
          <li>Geçmiş sorulara dönülemez</li>
          </ul>
          {/*Teste başlama butonu ve navigate ile Quize yönlendirme*/}
          <button onClick={()=>navigate('/Quiz')}>Teste Başla</button>
      </div>
    </div>
  </div>
  )
}

function App() {
  return (
    <Router>
      {/* Uygulama içinde yönlendirme yapılacak tüm yollar burada tanımlanır */}
      <Routes>
        {/* Kullanıcı "/" yoluna gittiğinde HomePage gösterilir */}
        <Route path='/' element={<HomePage/>}/>
        {/* Kullanıcı "/Quiz" yoluna gittiğinde Quiz  gösterilir */}
        <Route path='/Quiz' element={<Quiz/>}/>
      </Routes>
    </Router>
  )
}

export default App;
