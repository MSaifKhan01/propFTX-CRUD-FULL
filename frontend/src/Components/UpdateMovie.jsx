import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "../CSS/updateMovie.css"

const UpadteMovie = () => {
  const [title, setTitle] = useState("");
  const [actors, setActors] = useState("");
  const [rating, setRating] = useState("");
 
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getmovieDetails = async () => {
      try {
        let BaseUrl = `https://propftxbackend.onrender.com`
        let result = await fetch(`${BaseUrl}/movie/${params.id}`,{
            method:"GET",
            headers: {
                Authorization: localStorage.getItem("token"),
              },
        });
        result = await result.json();
        setTitle(result.title);
        setActors(result.actors);
        setRating(result.rating);
       
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getmovieDetails();
  }, [params.id]);

  const updatemovie = async () => {
    try {
      let BaseUrl = `https://propftxbackend.onrender.com`
      let result = await fetch(`${BaseUrl}/movie/update-movie/${params.id}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          actors,
          rating,
        }),
      });
      result = await result.json();
  
      Swal.fire({
        text: result.msg,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error updating movie:", error);
  
      Swal.fire({
        text: "Something went wrong",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  

  return (
    <div className="movie">
      <h1>Update Movie</h1>
      <input
        type="text"
        placeholder="Enter movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter movie actors"
        value={actors}
        onChange={(e) => setActors(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter movie rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
    
      <button onClick={updatemovie}>Update Movie</button>
    </div>
  );
};

export default UpadteMovie;