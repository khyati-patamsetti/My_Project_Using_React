import React, { useState } from 'react';
import './DietCard.css';

function Diet() {
  const foodItems = [
    {
      name: 'Stir-Fry Rice Bowl',
      image: 'iteam1.jpg',
      videoUrl: 'https://youtube.com/watch?v=spDs_wzn8To',
      calories: 165,
      protein: 31,
      fats: 3.6,
      description: 'A delicious rice bowl with mixed veggies.',
    },
    {
      name: 'Peanut Butter Oatmeal',
      image: 'iteam2.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=3618ju9EmjY',
      calories: 240,
      protein: 3,
      fats: 22,
      description: 'Nutty oatmeal for a healthy breakfast.',
    },
    {
      name: 'Whole Grain Cereal',
      image: 'iteam3.webp',
      videoUrl: 'https://www.youtube.com/watch?v=ffZVIPB5wQA',
      calories: 222,
      protein: 8,
      fats: 3.5,
      description: 'A quick and healthy cereal option.',
    },
    {
      name: 'Banana Oatmeal',
      image: 'iteam4.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=DJz2sX7WqLM',
      calories: 206,
      protein: 22,
      fats: 13,
      description: 'Delicious banana oatmeal.',
    },
    {
      name: 'Chewy Honey Granola',
      image: 'iteam5.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=AVy_uHZ8s-g',
      calories: 100,
      protein: 10,
      fats: 5,
      description: 'Granola for a quick snack.',
    },
    {
      name: 'Spinach-Mushroom',
      image: 'iteam6.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=yQAJtTbKiZY',
      calories: 284,
      protein: 44,
      fats: 18,
      description: 'Healthy spinach and mushroom dish.',
    },
    {
      name: 'Fruit-Filled French',
      image: 'iteam7.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=-jsTGuLopaI',
      calories: 247,
      protein: 47,
      fats: 14,
      description: 'French toast filled with fruits.',
    },
    {
      name: 'Peach Smoothie',
      image: 'iteam8.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=HxXNq7lTYNk',
      calories: 488,
      protein: 54,
      fats: 18,
      description: 'Refreshing peach smoothie.',
    },
    {
      name: 'Black Bean Chip',
      image: 'iteam9.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=MWRE5veDld4',
      calories: 254,
      protein: 44,
      fats: 9,
      description: 'Crunchy black bean chips.',
    },
    {
      name: 'Tarragon Tuna Salad',
      image: 'iteam10.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=DUy5SG8XniE',
      calories: 234,
      protein: 54,
      fats: 3.5,
      description: 'Tasty tuna salad with tarragon.',
    },
    {
      name: 'Sweet Potato and Egg Skillet',
      image: 'iteam11.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=example11',
      calories: 350,
      protein: 36,
      fats: 10,
      description: 'Hearty sweet potato and egg dish.',
    },
    {
      name: 'Coconut-Ginger Chickpeas',
      image: 'iteam12.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=QrCEtaIcTqU',
      calories: 240,
      protein: 41,
      fats: 19,
      description: 'Chickpeas with coconut and ginger.',
    },
    {
      name: 'Quinoa Chickpea Salad',
      image: 'iteam13.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=UpYOLeov-EI',
      calories: 211,
      protein: 29,
      fats: 1,
      description: 'Nutritious quinoa and chickpea salad.',
    },
    {
      name: 'Classic Avocado Toast',
      image: 'iteam14.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=Wmo1NoYEFPw',
      calories: 100,
      protein: 10,
      fats: 5,
      description: 'Classic avocado toast recipe.',
    },
    {
      name: 'Tuna Nicoise Salad',
      image: 'iteam15.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=7Xj1mYnil2c',
      calories: 233,
      protein: 32,
      fats: 11,
      description: 'Nicoise salad with tuna.',
    },
    {
      name: 'Pan-Roasted Pork Chops',
      image: 'iteam16.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=E3H4MW14zpk',
      calories: 206,
      protein: 45,
      fats: 16,
      description: 'Juicy pan-roasted pork chops.',
    },
    {
      name: 'Market Corn Salad',
      image: 'iteam17.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=fnQbqTo71Rk',
      calories: 310,
      protein: 49,
      fats: 22,
      description: 'Fresh corn salad from the market.',
    },
    {
      name: 'Chicken Tacos',
      image: 'iteam18.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=TKo-SPXASq4',
      calories: 180,
      protein: 31,
      fats: 16,
      description: 'Delicious chicken tacos.',
    },
    {
      name: 'Turkey & Apricot Wraps',
      image: 'iteam19.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=Oe16cBhIE7U',
      calories: 218,
      protein: 29,
      fats: 10,
      description: 'Turkey wraps with apricot.',
    },
    {
      name: 'Chicken, Rice and Beans',
      image: 'iteam20.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=l_cDLLPFjEk',
      calories: 266,
      protein: 38,
      fats: 16,
      description: 'Classic chicken, rice, and beans dish.',
    },
  ];

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const handleFindRecipe = () => {
    const randomIndex = Math.floor(Math.random() * foodItems.length);
    setSelectedRecipe(foodItems[randomIndex]);
    setIsVideoVisible(false);
  };

  const handleMakeClick = () => {
    setIsVideoVisible(true);
  };

  return (
    <div className="diet"> 
      <h1 className='sm'>Select Your Meal</h1>
      <div className="dropdowns">
        <select onChange={(e) => setSelectedDay(e.target.value)} value={selectedDay}>
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <select onChange={(e) => setSelectedMeal(e.target.value)} value={selectedMeal}>
          <option value="">Select Meal</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <button className='fr' onClick={handleFindRecipe}>Find Recipe</button>
      </div>

      <div className={`main ${isVideoVisible ? 'video-visible' : ''}`}>
        {selectedRecipe && (
          <div className='card-container'>
            <div className={`food-card ${isVideoVisible ? 'move-left' : ''}`}>
              <h2>{selectedRecipe.name}</h2>
              <img src={selectedRecipe.image} alt={selectedRecipe.name} className="food-image" />
              <p>{selectedRecipe.description}</p>
              <div className='df'>
                <ul>
                  <li><strong>Calories:</strong> {selectedRecipe.calories} kcal</li>
                  <li><strong>Protein:</strong> {selectedRecipe.protein} g</li>
                  <li><strong>Fats:</strong> {selectedRecipe.fats} g</li>
                </ul>
              </div>
              <button className='make' onClick={handleMakeClick}>Making</button>
            </div>

            {isVideoVisible && (
              <div className="video-container">
                <iframe
                  width="100%"
                  height="100%"
                  src={`${selectedRecipe.videoUrl.replace("watch?v=", "embed/")}?autoplay=1`}
                  title={selectedRecipe.name}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Diet;
