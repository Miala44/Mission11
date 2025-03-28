import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  onCheckBox,
}: {
  selectedCategories: string[];
  onCheckBox: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Book/getbookcategory'
        );
        const data = await response.json();
        console.log('Categories fetched!', data);
        setCategories(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCategories();
  }, []);

  function checkBoxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    // setSelectedCategories(updatedCategories);
    onCheckBox(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h5>Categories</h5>
      <div className="category-list">
        {categories.map((cat) => (
          <div className="category-item" key={cat}>
            <input
              className="category-checkbox"
              type="checkbox"
              id={cat}
              value={cat}
              onChange={checkBoxChange}
            />
            <label htmlFor={cat}>{cat}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
