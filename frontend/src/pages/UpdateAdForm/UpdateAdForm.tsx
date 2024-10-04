export type TagProps = {
  id: number;
  name: string;
};

import { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Ad, ApiResult } from "../../types/api";

export default function UpdateAdForm() {
  const { id } = useParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    formJson.tags = JSON.stringify(tags);

    console.log(formJson);
    axios.put(`http://localhost:3000/ads/${id}`, formJson);
  };

  const [ad, setAd] = useState<Ad | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const tag = useRef<HTMLInputElement | null>(null);

  const fetchAd = async () => {
    let { data } = await axios.get(`http://localhost:3000/ads/${id}`);
    setAd(data);
    data = data.tags.map((apiTag:ApiResult) => (apiTag.name))
    setTags(data);
  
  };

  const [categories, setCategories] = useState<ApiResult[]>([]);
  const fetchCategories = async () => {
    const { data } = await axios.get<ApiResult[]>(
      "http://localhost:3000/categories"
    );
    setCategories(data);
  };



  const handleTag = () => {
    if (!tags.includes(tag.current!.value)) {
      setTags([...tags, tag.current!.value]);
    }
  };

  useEffect(() => {
    fetchAd();
    fetchCategories();
  }, []);

  if (!ad) return "loading";

  return (
    <form onSubmit={handleSubmit} className="ad-post-form">
      <label>
        Ad title <br />
        <input className="text-field" name="title" defaultValue={ad.title} />
      </label>
      <label>
        Description <br />
        <input
          className="text-field"
          name="description"
          defaultValue={ad.description}
        />
      </label>
      <label>
        Owner <br />
        <input className="text-field" name="owner" defaultValue={ad.owner} />
      </label>
      <label>
        Location <br />
        <input
          className="text-field"
          name="location"
          defaultValue={ad.location}
        />
      </label>
      <label>
        Price <br />
        <input className="text-field" name="price" defaultValue={ad.price} />
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

      <select name="categoryId" className="text-field">
        {categories.map((cat) => (
          <option
            value={cat.id}
            key={cat.id}
            selected={cat.id === ad?.category.id}
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
