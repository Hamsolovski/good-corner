import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdInput, useBrowseCategoriesQuery, useCreateAdMutation } from "../../__generated__/types";

export default function AdForm() {

  const categories = useBrowseCategoriesQuery()
  const [createAd, {error, loading}] = useCreateAdMutation()

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
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
    createAd({ variables: {data: submission as AdInput}});
    navigate('/')
  };

  const [tags, setTags] = useState<string[]>([]);
  const tag = useRef<HTMLInputElement | null>(null);

  const handleTag = () => {
    if (!tags.includes(tag.current!.value)) {
      setTags([...tags, tag.current!.value]);
    }
  };

  if (loading) return <p>'Submitting...'</p>;
  if (error) return <p>`Submission error!' ${error.message}`</p>
  
  return (
    <form onSubmit={handleSubmit} className="ad-post-form">
      <label>
        Ad title <br />
        <input className="text-field" name="title" />
      </label>
      <label>
        Description <br />
        <input className="text-field" name="description" />
      </label>
      <label>
        Owner <br />
        <input className="text-field" name="owner" />
      </label>
      <label>
        Location <br />
        <input className="text-field" name="location" />
      </label>
      <label>
        Price <br />
        <input className="text-field" name="price" />
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
        {!categories.loading && categories.data!.browseCategories.map((cat) => (
          <option value={cat.id} key={cat.id}>
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
