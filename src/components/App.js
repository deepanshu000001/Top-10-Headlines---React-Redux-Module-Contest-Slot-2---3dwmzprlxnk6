const yourAPIKey = '9a4657f688747803b290fafc1421de36';
import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    
    let url =`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${yourAPIKey}`;
    // https://gnews.io/ register to get APIKEY

    async function getData(){
      setLoading(true);
      const res = await fetch(url);
      const result = await res.json();

      setNewsData(result.articles);
      setLoading(false);

    }

    getData();

  },[category])

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      { loading ?<p className='loader'>Loading...</p> :
      <ol>

          {
          newsData.map(news=>(
            <li key="">
          <img className='news-img' src={news?.image} alt={news?.title}/>
          <section className='new-title-content-author'>
            <h3 className='news-title'>{news?.title}</h3>
            <section className='new-content-author'>
              <p className='news-description'>{news?.description}</p>
              <p className='news-source'><strong>Source:</strong> {news?.source?.name}</p>
            </section>
          </section>
        </li>
          ))
          }

      </ol> }
    </div>
  )
}


export default App;
