import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import fs from 'browserify-fs'

function App() {
  let [infos, setInfos] = useState([]);

  const write=(a)=>{
    setInfos(a)
    fs.mkdir('/home', function() {
        fs.writeFile('/home/info.txt', a, function() {
            fs.readFile('/home/info.txt', 'utf-8', function(err, data) {
                console.log(data);
            });
        });
    });
  }

  useEffect(() => {
    axios
      .get("https://ifconfig.me/all")
      .then(response => {write(response.data)});
      
  }, []);

  return (
    <div className="App">
      <h2>İp bilgileriniz</h2>
      <code>{JSON.stringify(infos)}</code>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
