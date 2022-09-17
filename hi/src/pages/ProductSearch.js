import { useParams } from "react-router";
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from "react"

function Search() {
  const [searchData, setSearchData] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "http://localhost:3000/ProductSearch?입력값=" + params.입력값
      );
       console.log(result.data.result);
       setSearchData(result.data.result);
    }
    fetchData();
  }, []);
};





export default Search;