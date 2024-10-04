import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "../AdCard/AdCard";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function RecentAds() {
  const [ads, setAds] = useState<AdCardProps[]>([]);
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("category");
  const search = searchParams.get("search");

  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      let url = "http://localhost:3000/ads";
      if (cat) url = `http://localhost:3000/ads?category=${cat}`;
      if (search) url = `http://localhost:3000/ads?search=${search}`;
      console.log(url);
      const result = await axios.get<AdCardProps[]>(url);
      setAds(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cat, search]);

  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <p>Prix total: {total}</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.title}>
            <AdCard
              id={ad.id}
              picture={ad.picture}
              price={ad.price}
              location={ad.location}
              title={ad.title}
              setTotal={setTotal}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
