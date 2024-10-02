import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdCardProps } from "../../components/AdCard/AdCard";
import axios from "axios";

export default function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState<AdCardProps>();

  const fetchData = async () => {
    try {
      const { data } = await axios.get<AdCardProps>(
        `http://localhost:3000/ad/${id}`
      );
      setAd(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="ad-details">
      <h1>
        {ad?.title} - {ad?.price} €
      </h1>
      <img className="ad-details-image" src={ad?.picture} />
      <p>{ad?.description}</p>
      <h2>Who's selling it ?</h2>
      <p>Contact : {ad?.owner}</p>
      <p>Created : {ad?.createdAt?.toString().slice(0, 10)}</p>
    </main>
  );
}
