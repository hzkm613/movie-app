import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams(); // Extract the movie ID from the URL params
  const [detail, setDetails] = useState(null); // Set the initial state to null
  const [loading, setLoading] = useState(true); // Loading state for when the data is being fetched

  const getDetails = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetails(json.data.movie); // Set the movie details from the response
    setLoading(false); // Set loading to false once data is fetched
  };

  useEffect(() => {
    getDetails(); // Call the function when the component mounts
  }, [id]); // Re-fetch the movie details whenever the `id` changes

  if (loading) {
    return <div>Loading...</div>; // Show loading text until data is fetched
  }

  if (!detail) {
    return <div>Movie details not found!</div>; // Show an error message if movie details aren't found
  }

  return (
    <div>
      <h1>{detail.title}</h1>
      <p>{detail.year}</p>
      <p>{detail.summary}</p>
      <img src={detail.medium_cover_image} alt={detail.title} />
      <div>
        <strong>Genres:</strong>
        <ul>
          {detail.genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Detail;
