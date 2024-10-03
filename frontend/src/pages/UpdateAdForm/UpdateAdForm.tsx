export type TagProps = {
  id: number;
  name: string;
};

import { FormEvent, useEffect, useRef, useState } from "react";
import { CategoriesProps } from "../../components/Header/Header";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateAdForm() {
  const id = useParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    formJson.tags = JSON.stringify(tags);

    console.log(formJson);
    axios.put(`/ads/${id}`, formJson);
  };

  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const fetchCategories = async () => {
    const { data } = await axios.get<CategoriesProps[]>("http://localhost:3000/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [tags, setTags] = useState<string[]>([]);
  const tag = useRef<HTMLInputElement | null>(null);

  const handleTag = () => {
    if (!tags.includes(tag.current!.value)) {
      setTags([...tags, tag.current!.value]);
    }
  };

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
          <div>{tag}</div>
        ))}
      </div>

      <select name="categoryId" className="text-field">
        {categories.map((cat) => (
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
