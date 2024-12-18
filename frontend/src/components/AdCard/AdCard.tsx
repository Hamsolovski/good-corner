export type AdCardProps = {
  id: string;
  title: string;
  picture: string;
  price: number;
  setTotal: Function;
};

export default function AdCard({
  id,
  title,
  picture,
  price,
  setTotal,
}: AdCardProps) {
  return (
    <div className="ad-card-container">
      <a className="ad-card-link" href={`/ad/${id}`}>
        <img className="ad-card-image" src={picture} alt="" />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </a>
      <button
        className="button"
        onClick={() => {
          setTotal((prevState:number) => prevState + price);
        }}
      >
        Add to cart
      </button>
    </div>
  );
}
