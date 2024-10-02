export type AdCardProps = {
  id: number;  
  title: string;
  description?: string;
  createdAt?: Date;
  owner?: string;
  picture: string;
  price: number;
  link: string;
}

export default function AdCard({ id, title, picture, price, link}: AdCardProps) {
   console.log(title, picture, price, link)
    return (
        <div className="ad-card-container">
          <a className="ad-card-link" href={`/ad/${id}`}>
            <img className="ad-card-image" src={picture} alt=""/>
            <div className="ad-card-text">
              <div className="ad-card-title">{title}</div>
              <div className="ad-card-price">{price} €</div>
            </div>
          </a>
        </div>
    )
}