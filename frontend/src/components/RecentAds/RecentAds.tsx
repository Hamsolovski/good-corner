import AdCard from "../AdCard/AdCard";



export default function RecentAds() {

    const ads = [
        {
            imgUrl: "/images/table.webp",
            title: "Table",
            link: "/ad/table",
            price: "120 €"
        },
        {
            imgUrl: "/images/dame-jeanne.webp",
            title: "Dame-Jeanne",
            link: "/ad/dame-jeanne",
            price: "75 €"
        },
        {
            imgUrl: "/images/vide-poche.webp",
            title: "Vide-Poche",
            link: "/ad/vide-poche",
            price: "4 €"
        },
        {
            imgUrl: "/images/vaisselier.webp",
            title: "Vaisselier",
            link: "/ad/vaisselier",
            price: "900 €"
        },
        {
            imgUrl: "/images/bougie.webp",
            title: "Bougie",
            link: "/ad/bougie",
            price: "8 €"
        },
        {
            imgUrl: "/images/porte-magazine.webp",
            title: "Porte-Magazine",
            link: "/ad/porte-magazine",
            price: "45 €"
        }
        
    ]


    return (
    <main className="main-content">
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
            <AdCard link={ad.link} imgUrl={ad.imgUrl} price={ad.price} title={ad.title} key={ad.title}/>
        ))}
        
      </section>
    </main>
    )
}