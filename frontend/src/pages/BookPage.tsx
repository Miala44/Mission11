import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeTitle from '../components/WelcomeTitle';
import BookList from '../components/BookList';
import CartSummary from '../components/CartSummary';

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      {/* Floating Cart Summary in the top right */}
      <div className="position-absolute top-0 end-0 p-3">
        <CartSummary />
      </div>

      <div className="jumbotron">
        {/* <h1 className="display-4">Welcome to Our Book shop!</h1> */}
        <WelcomeTitle />
        <p className="lead">This is Amelia Adams's Mission 12 Book Shop app.</p>
        <hr className="my-4" />
        <p>Browse our collection and find your next great read.</p>
      </div>
      {/* Page Title */}

      {/* Main Content Row */}
      <div className="row">
        {/* Sidebar (Filters) */}
        <div className="col-md-3">
          <div className="p-3 border rounded bg-light">
            <h4>Categories</h4>
            <CategoryFilter
              selectedCategories={selectedCategories}
              onCheckBox={setSelectedCategories}
            />
          </div>
        </div>

        {/* Main Book List */}
        <div className="col-md-9">
          <div className="p-3">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
