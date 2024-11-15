import { useState } from "react";
import AdCard, { AdCardProps } from "../AdCard/AdCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_ADS } from "../../graphql/adQueries";
import GET_ALL_CATEGORIES from "../../graphql/categoryQuery";

export default function RecentAds() {
  const [total, setTotal] = useState(0);

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

  const ads = useQuery(GET_ALL_ADS);

  return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <p>Prix total: {total}</p>
      <section className="recent-ads">
        {ads.loading && <p>Loading...</p>}
        {ads.error && <p>Something went wrong</p>}
        {!ads.loading &&
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
          ))}
      </section>
    </main>
  );
}
