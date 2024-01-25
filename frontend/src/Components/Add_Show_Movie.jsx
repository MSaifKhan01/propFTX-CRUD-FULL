import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "../CSS/Movie.css";

const MovieManagement = () => {
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [movieList, setmovieList] = useState([]);
  const [fileInput, setFileInput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("userID", userID);

    let BaseUrl = `https://propftxbackend.onrender.com`; 

    try {
      const response = await fetch(`${BaseUrl}/movie/add-movie`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      if (response.ok) {
        
        const { Msz } = await response.json()
       

        if (Msz === "A New Movie has been added") {
          Swal.fire({
            title: Msz,
            icon: "success",
          });
          GetingMovieList();
        }
      } else {
        Swal.fire({
          title: "Something went wrong",
          icon: "error",
        });
        console.error("Error uploading movie. Status:", response.status);
      }
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
      });
      console.error("Error uploading movie:", error);
    }
  };

  const DeleteMovie = async (id) => {
    try {
      let BaseUrl = `https://propftxbackend.onrender.com`; 
      const response = await fetch(`${BaseUrl}/movie/delete-movie/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        GetingMovieList();
        Swal.fire({
          title: "Movie deleted successfully",
          icon: "success",
        });
      } else {
        console.error("Error deleting movie. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleUpdate = async (id) => {
  
};


  const GetingMovieList = async () => {
    try {
      let BaseUrl = `https://propftxbackend.onrender.com`; 
      const response = await fetch(`${BaseUrl}/movie`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const movies = await response.json();
      console.log(movies)

      if (Array.isArray(movies)) {
        setmovieList(movies);
      } else {
        console.error("Invalid response format. Expected an array:", movies);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    setUserID(localStorage.getItem("userID"));
    GetingMovieList();
  }, []);

  return (
    <div>
      <h2>Movie Management</h2>
      <form id="uploadForm" onSubmit={handleSubmit}>
  <label htmlFor="titleInput">Title:</label>
  <input type="text" id="titleInput" name="title" required />
  <br />
  <br />
  <label htmlFor="actorsInput">Actors:</label>
  <input type="text" id="actorsInput" name="actors" required />
  <br />
  <br />
  <label htmlFor="ratingInput">Rating:</label>
  <input type="number" id="ratingInput" name="rating" min="0" max="10" required />
  <br />
  <br />
  <label htmlFor="fileInput">Choose a movie Image:</label>
  <input
    type="file"
    id="fileInput"
    name="file"
    ref={(input) => setFileInput(input)}
    required
  />
  <br />
  <br />
  <button type="submit">Upload Movie</button>
</form>


      <hr />




      <h2>Movie List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Actors</th>
            <th>Rating</th>
            <th>Release Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>
         
          <img src={movie.image} alt="Movie Poster" style={{ maxWidth: "100px" }} />
        </td>
              <td >{movie.actors}</td>
              <td>{movie.rating}</td>
              <td>{movie.releaseYear}</td>
              <td>
                <button className="deleteBtn" onClick={() => DeleteMovie(movie._id)}>
                  Delete
                </button>
                

                <button className="updateBtn">
              <Link to={"/update/" + movie._id}>Update Movie</Link>
            </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieManagement;
