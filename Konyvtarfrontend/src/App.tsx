import { FormEvent, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

interface Book {
  id: number;
  title: string;
  author: string;
  publish_year: number;
  page_count: number;
}

function App() {
  const [books, setBooks] = useState([] as Book[])
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publish_year, setPublish_year] = useState(0);
  const [page_count, setPage_count] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');


  async function adatlekerdezes(){
    const response = await fetch ('http://localhost:3000/api/books')
    const data = await response.json() as Book[];
    setBooks(data);
  }

  useEffect(() => {
    adatlekerdezes();
  }, [])

  async function ujKonyv(e: FormEvent){
    e.preventDefault();
    const adatok = {
      title, author, publish_year, page_count
    }
    const response = await fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(adatok)
    });
    if (response.ok) {
      setTitle('');
      setAuthor('');
      setPublish_year(0);
      setPage_count(0);
      setErrorMessage('');
      adatlekerdezes();
    } else {
      const hibaObj = await response.json();
      const  hibak = hibaObj.message as string[];
      setErrorMessage(hibak.join('; '));
    }
  }

  return <div className="container-fluid">
    
    <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#ujKonyv"
                  >
                    Új könyv felvétele
                  </a>
                </li>
              </ul>
             </div>
            </div>
          </nav>
        </header>

    <div className="row">
    {
      books.map(books => <div className="col-12 col-sm-6 col-md-4 book">
        <h2>{books.title}</h2>
        <p>{books.author}</p>        
        <p>{books.page_count}</p>
        <p>{books.publish_year}</p>
        <p><img src={'/kepek/' + books.author + '.jpg'} alt="" /></p>
      </div>)
    }
    </div>

    <form onSubmit={ujKonyv} id="ujKonyv">
      <label>
        Cím: <br />
        <input type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
      </label>
      <label>
        Szerző: <br />
        <input type="text" value={title} onChange={(e) => setAuthor(e.currentTarget.value)}/>
      </label>
      <label>
        Kiadási év: <br />
        <input type="number" value={title} onChange={(e) => setPublish_year(parseInt(e.currentTarget.value))}/>
      </label>
      <label>
        Oldalszám: <br />
        <input type="number" value={title} onChange={(e) => setPage_count(parseInt(e.currentTarget.value))}/>
      </label>
      <div className="error">errorMessage</div>
      <input type="submit" value='Új könyv'/>
    </form>

    <footer>
      Készítette: Makker Zsombor
    </footer>
  </div>
}

export default App;