import { useState } from "react";
import AdCard from "../AdCard/AdCard";
import { useSearchParams } from "react-router-dom";
import { useBrowseAdsQuery, useGetAdsByCategoryQuery } from "../../__generated__/types";

export default function RecentAds() {
  const [total, setTotal] = useState(0);
  const [searchParams] = useSearchParams();
  const cat = searchParams.get('category')

  // const fetchData = async () => {
  //   try {
  //     let url = "http://localhost:3000/ads";
  //     if (cat) url = `http://localhost:3000/ads?category=${cat}`;
  //     if (search) url = `http://localhost:3000/ads?search=${search}`;
  //     console.log(url);
  //     const result = await axios.get<AdCardProps[]>(url);
  //     setAds(result.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [cat, search]);

  const ads = useBrowseAdsQuery();
  const filteredAds = useGetAdsByCategoryQuery({variables: {id: cat}})

  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <p>Prix total: {total}</p>
      <section className="recent-ads">
        {ads.loading && <p>Loading...</p>}
        {ads.error && <p>Something went wrong</p>}
        {!ads.data && <p>No content found.</p>}
        {!ads.loading && !ads.error && ads.data && (
          ads.data.browseAds.map((ad) => (
            <div key={ad.title}>
              <AdCard
                id={ad.id}
                picture={ad.picture}
                price={ad.price}
                title={ad.title}
                setTotal={setTotal}
              />
            </div>
          ))
        )}
      </section>
    </main>
  );
}
