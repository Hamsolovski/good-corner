import { Link, useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { ApiResult } from "../../types/api";
import { useDeleteAdByIdMutation, useGetAdByIdQuery } from "../../__generated__/types";

export default function AdDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  
  if (!id) throw new Error("id is required")

  const ad = useGetAdByIdQuery({
    variables: { id: id },
  });

  const [deleteAd, { loading }] = useDeleteAdByIdMutation({
    variables: { id: id },
    onCompleted: () => {
      navigate("/");
    },
    onError: (err) => {
      console.error("Error deleting ad:", err);
    },
  });

  const handleDelete = () => {
    deleteAd();
  };

  const updateAd = async () => {
    navigate(`/ad/${id}/update`);
  };

  return (
    <main className="main-content">
      {ad.loading ? <p>loading</p> : null}
      {!ad.loading && (
        <>
          <h2 className="ad-details-title">{ad.data!.getAdById.title} - {ad.data!.getAdById.location}</h2>
          <section className="ad-details">
            <div className="ad-details-image-container">
              <img
                className="ad-details-image"
                src={ad.data!.getAdById.picture}
              />
            </div>
            <div className="ad-details-info">
              <div className="ad-details-price">
                {ad.data!.getAdById.price} €
              </div>
              <div className="ad-details-description">
                {ad.data!.getAdById.description}
              </div>
              <div className="tag-list">
                <div className="tag-list">
                  {ad.data!.getAdById.tags.map((tag: ApiResult) => (
                    <div className="tag">{tag.name}</div>
                  ))}
                </div>
              </div>
              <hr className="separator" />
              <div className="ad-details-owner">
                Ad created by <b>{ad.data!.getAdById.owner}</b> on{" "}
                {ad &&
                  DateTime.fromISO(ad.data!.getAdById.createdAt).toLocaleString(
                    DateTime.DATETIME_SHORT
                  )}
                .
              </div>
              <Link
                to={`mailto:${ad.data!.getAdById.owner}`}
                className="button button-primary link-button"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
                  stroke="currentcolor"
                  strokeWidth="2.5"
                  fill="none"
                >
                  <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
                </svg>
                Send an email
              </Link>
            </div>
          </section>
          <button className="button" onClick={handleDelete} disabled={loading}>
            Delete ad
          </button>
          <button className="button" onClick={updateAd}>
            Update ad
          </button>
        </>
      )}
    </main>
  );
}
