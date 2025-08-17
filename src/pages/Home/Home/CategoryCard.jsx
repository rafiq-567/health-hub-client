import { Link } from 'react-router';

const CategoryCard = ({ category }) => {
  const { categoryName, imageURL, medicineCount, description } = category  || {};
    

  return (
    
      <div className="rounded shadow p-4 hover:shadow-lg transition bg-white">
        <img src={imageURL} alt={name} className="w-full h-30 object-cover rounded" />
        <h3 className="text-lg font-semibold mt-2">{categoryName}</h3>
       
        <p className="text-md text-gray-600"><span className='font-bold'>Medicine Count:</span> {medicineCount} Medicines</p>
        <p className="text-md text-gray-600"><span className='font-bold'>Description:</span> {description} </p>
        <Link to={`/categories/${categoryName}`}>
        <button className='btn btn-primary mt-2'>See More</button></Link>
      </div>
    
  );
};

export default CategoryCard;
