import { FormEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdInput, useBrowseCategoriesQuery, useGetAdByIdQuery, useReplaceAdByIdMutation } from "../../__generated__/types";

export default function UpdateAdForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) throw new Error("id is required")

  const {data: categories, loading: catLoading} = useBrowseCategoriesQuery()
  const {data: ad, loading: adLoading} = useGetAdByIdQuery({
    variables: { id: id },
  });


  const [editAd, {error, loading}] = useReplaceAdByIdMutation()

  const [tags, setTags] = useState<string[]>([]);
  const tag = useRef<HTMLInputElement | null>(null);

  if (loading) return <p>Loading...</p>
  if (error) throw new Error('error')

   const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    console.log('json', formJson)
    const submission = {
      title: formJson.title,
      description: formJson.description,
      price: parseInt(formJson.price as string),
      details: formJson.details,
      category: formJson.category,
      owner: formJson.owner,
      tags: tags,
      location: formJson.location,
    }
    console.log('submission', submission)
    await editAd({ variables: {id: id, data:submission as AdInput}});
    navigate(`/ad/${id}`)
  };


  const handleTag = () => {
    if (!tags.includes(tag.current!.value)) {
      setTags([...tags, tag.current!.value]);
    }
  };

  ad!.getAdById.tags.forEach((tag) => !tags.includes(tag.name) && setTags([...tags, tag.name]))

  if (adLoading) return "loading"
  else {
    return (
      <form onSubmit={handleSubmit} className="ad-post-form">
        <label>
          Ad title <br />
          <input className="text-field" name="title" defaultValue={ad!.getAdById.title} />
        </label>
        <label>
          Description <br />
          <input
            className="text-field"
            name="description"
            defaultValue={ad!.getAdById.description}
          />
        </label>
        <label>
          Owner <br />
          <input className="text-field" name="owner" defaultValue={ad!.getAdById.owner} />
        </label>
        <label>
          Location <br />
          <input
            className="text-field"
            name="location"
            defaultValue={ad!.getAdById.location}
          />
        </label>
        <label>
          Price <br />
          <input className="text-field" name="price" defaultValue={ad!.getAdById.price} />
        </label>
        <label>
          Tags
          <div className="tag-input">
            <input className="text-field" name="tags" ref={tag} />
            <button className="button" type="button" onClick={handleTag}>
              add Tag
            </button>
          </div>
        </label>
        <div className="tag-list">
          {tags.map((tag) => (
            <div className="tag">{tag}</div>
          ))}
        </div>
  
        <select name="category" className="text-field">
          {!catLoading && categories!.browseCategories.map((cat) => (
            <option
              value={cat.id}
              key={cat.id}
              selected={cat.id === ad!.getAdById.category.id}
            >
              {cat.name} 
            </option>
          ))}
        </select>
  
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    );

  }
    
    
}
