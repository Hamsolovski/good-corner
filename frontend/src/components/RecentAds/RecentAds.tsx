import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "../AdCard/AdCard";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function RecentAds() {

    const [ads, setAds] = useState<AdCardProps[]>([]);
    const [searchParams] = useSearchParams();
    const cat = searchParams.get('category')

    const [total, setTotal] = useState(0);

    useEffect(() => {
        console.log(cat)
        const fetchData = async () => {
                try {
                    const result = await axios.get<AdCardProps[]>(cat ? `http://localhost:3000/ads?category=${cat}` : 'http://localhost:3000/ads')
                    console.log()
                    setAds(result.data)
                } catch (error) {
                    console.error(error)
                }            
        };
        fetchData();
    }, [cat])


    return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <p>Prix total: {total}</p>
      <section className="recent-ads">
        {ads.map((ad) => (
            <div key={ad.title}>
                <AdCard id={ad.id} picture={ad.picture} price={ad.price} title={ad.title} total={total} setTotal={setTotal}/>
            </div>
            
            
        ))}
        
      </section>
    </main>
    )
}