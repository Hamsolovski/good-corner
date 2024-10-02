import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "../AdCard/AdCard";
import axios from "axios";



export default function RecentAds() {

    const [ads, setAds] = useState<AdCardProps[]>([]);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get<AdCardProps[]>('http://localhost:3000/ads')
                setAds(result.data)
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, [])


    return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <p>Prix total: {total}</p>
      <section className="recent-ads">
        {ads.map((ad) => (
            <div key={ad.title}>
                <AdCard id={ad.id} link={ad.link} picture={ad.picture} price={ad.price} title={ad.title}/>
                <button 
                    className="button"
                    onClick={() => {
                        setTotal(total + ad.price);
                    }}
                >
                    Add price to total
                </button>
            </div>
            
            
        ))}
        
      </section>
    </main>
    )
}