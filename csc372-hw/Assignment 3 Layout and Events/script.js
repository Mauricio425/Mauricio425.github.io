function showDescription(dishId, imgElement) {
    const article = imgElement.closest('.restaurant');
    const container = article.querySelector('.dish-description-container');
    container.innerHTML = dishDescriptions[dishId] || "";
    
    container.classList.add("active");
  }

  const dishDescriptions = {
    steakandshrimp: `
      <div class="dish-details">
        <p><strong>Steak & Shrimp:</strong> <span>$25.19</span></p>
        <p>A juicy steak paired with jumbo grilled shrimp marinated in our special recipe. Served with a lemon wedge, garlic butter, rice, beans, lettuce, guacamole, pico de gallo, tortillas, and a guacamole salad.</p>
        <h4>Extras:</h4>
        <ul class="extras">
          <li>Cheese Dip $9.59</li>
          <li>Rice with cheese sauce $5.99</li>
          <li>Refried beans $3.59</li>
        </ul>
      </div>
    `,
    camaronesaladiabla: `
      <div class="dish-details">
        <p><strong>Camarones a la Diabla:</strong> <span>$20.39</span></p>
        <p>Delicious jumbo shrimp cooked with our diablo sauce and garnished with a lemon wedge and garlic butter. Served with rice, beans, lettuce, guacamole, pico de gallo, and tortillas.</p>
        <h4>Extras:</h4>
        <ul class="extras">
          <li>Cheese Dip $9.59</li>
          <li>Salsa (16 oz) with free bag of chips $2.99</li>
        </ul>
      </div>
    `,
    friedicecream: `
      <div class="dish-details">
        <p><strong>Fried Ice Cream:</strong> <span>$6.99</span></p>
        <p>Rich vanilla ice cream rolled in crispy flakes and deep-fried. Served in a cinnamon-sugared tortilla shell topped with hot fudge and whipped cream.</p>
        <h4>Extras:</h4>
        <ul class="extras">
          <li>French Fries $2.99</li>
        </ul>
      </div>
    `,
    galacticpeach: `
      <div class="dish-details">
        <p><strong>Galactic Peach Parfait:</strong> <span>$4.89</span></p>
        <p>Fresh peaches with homemade sweet cream and marshmallows!</p>
      </div>
    `,
    martiankorn: `
      <div class="dish-details">
        <p><strong>Martian Korn:</strong> <span>$3.69</span></p>
        <p>Mexican style corn with mayo, cotija cheese, and chili powder. Top it off with your choice of chips.</p>
        <h4>Toppings:</h4>
        <ul class="extras">
          <li>Hot Cheetos (+$0.70)</li>
          <li>Takis (+$0.70)</li>
          <li>Doritos (+$0.70)</li>
          <li>Plain</li>
        </ul>
      </div>
    `,
    asteroidbelt: `
      <div class="dish-details">
        <p><strong>Asteroid Belt:</strong> <span>$6.69</span></p>
        <p>MOST POPULAR: A K Dog with fries all in one.</p>
        <h4>Options:</h4>
        <ul class="extras">
          <li>1/2 Mozzarella &amp; 1/2 Sausage (+$0.49)</li>
          <li>The Sausage (all-beef hotdog) (+$0.79)</li>
          <li>Vegetarian Sausage (Morning Star Farms) (+$0.79)</li>
          <li>Condiments: Astro Sauce, Spicy Mayo, Ketchup, Mustard</li>
        </ul>
      </div>
    `,
    santafeturkeypanini: `
    <div class="dish-details">
      <p><strong>Santa Fe Turkey Panini:</strong> <span>$13.00</span></p>
      <p>A panini with bacon, pepper Jack cheese, grilled peppers, lettuce, and chipotle aioli.</p>
    </div>
  `,
  spartanlatte: `
  <div class="dish-details">
    <p><strong>Spartan Latte:</strong> <span>$4.75</span></p>
    <p>Espresso, blackberry, and white chocolate. Enjoy it hot or iced with your choice of milk options.</p>
    <h4>Options:</h4>
    <ul class="extras">
      <li>Hot or Iced</li>
      <li>No Milk</li>
      <li>Whole Milk</li>
      <li>Almond Milk</li>
      <li>Oat Milk</li>
      <li>Extra Espresso Shot</li>
    </ul>
  </div>
`
,
  croissant: `
    <div class="dish-details">
      <p><strong>Croissant:</strong> <span>$4.00</span></p>
      <p>Flaky, butter-rich French pastry with a golden, crisp exterior.</p>
    </div>
  `
    
  };
  
  function showDescription(dishId, imgElement) {

    const article = imgElement.closest('.restaurant');

    const container = article.querySelector('.dish-description-container');

    container.innerHTML = dishDescriptions[dishId] || "";

    container.classList.add("active");
  }
  
let mealPlan = {};

document.addEventListener('DOMContentLoaded', () => {
  const addButtons = document.querySelectorAll('.add-to-plan');
  addButtons.forEach(button => {
    button.addEventListener('click', function () {
      const dishElement = this.closest('.dish-details');
      const dishName = dishElement.dataset.dish;
      const dishPrice = parseFloat(dishElement.dataset.price);

      addDishToMealPlan(dishName, dishPrice);
    });
  });
});

/**
 * add dish, if already exist add one more to quantity
 */
function addDishToMealPlan(dishName, dishPrice) {
  if (mealPlan[dishName]) {
    mealPlan[dishName].quantity += 1;
  } else {
    mealPlan[dishName] = { price: dishPrice, quantity: 1 };
  }
  updateMealPlanDisplay();
}

/**
 * refresh mealplan an dprice
 */
function updateMealPlanDisplay() {
  const mealPlanItems = document.getElementById('meal-plan-items');
  mealPlanItems.innerHTML = ''; // Clear previous content

  let total = 0;
  // Loops through dishes in meal plan
  for (const dish in mealPlan) {
    const { price, quantity } = mealPlan[dish];
    const itemTotal = price * quantity;
    total += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'meal-plan-item';
    itemDiv.innerHTML = `
      <p><strong>${dish}</strong> - $${price.toFixed(2)} x ${quantity} = $${itemTotal.toFixed(2)}</p>
      <button class="add-more" data-dish="${dish}">Add One</button>
      <button class="remove" data-dish="${dish}">Remove One</button>
    `;
    mealPlanItems.appendChild(itemDiv);
  }

  // Update the total
  document.getElementById('meal-plan-total').textContent = 'Total: $' + total.toFixed(2);

  // listeners for add and remove
  attachMealPlanButtons();
}

function attachMealPlanButtons() {
  // Add one more unit of the dish
  const addMoreButtons = document.querySelectorAll('.add-more');
  addMoreButtons.forEach(button => {
    button.addEventListener('click', function () {
      const dish = this.dataset.dish;
      mealPlan[dish].quantity += 1;
      updateMealPlanDisplay();
    });
  });

  // Remove dish items
  const removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach(button => {
    button.addEventListener('click', function () {
      const dish = this.dataset.dish;
      mealPlan[dish].quantity -= 1;
      // Remove dish from the plan if = 0
      if (mealPlan[dish].quantity <= 0) {
        delete mealPlan[dish];
      }
      updateMealPlanDisplay();
    });
  });
}

  