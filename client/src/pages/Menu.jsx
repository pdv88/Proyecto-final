import React from "react";

function Menu() {
  document.title = "Menu | Little Lemon";

  function menuMaker(dishes){
        return dishes.map((dish) => {
            return (
              <div className="dishCard" key={dish.id}>
                <img src={dish.src} alt={dish.dish} />
                <div className="dishCard_datos">
                  <h3>{dish.dish}</h3>
                  <p>{dish.description}</p>
                  <h3 className="price">${dish.price.toFixed(2)}</h3>
                  <button className="addToCart" onClick={()=>addToCart(dish)}>Add to cart</button>
                </div>
              </div>
            );
          })
  }

  function addToCart(product) {
    let cart = localStorage.getItem("cart");
    if(!cart) {
        let emptyArray = [];
        emptyArray.push(product);
        localStorage.setItem("cart",JSON.stringify(emptyArray));
    } else {
        let cartArray = JSON.parse(cart || "[]");
        cartArray.push(product);
        localStorage.setItem("cart",JSON.stringify(cartArray));
    }
}

  const breakfast = [
    {
      id:'b01',
      src: "/breakfasts/bread_butter_jam.jpg",
      dish: "Pane Burro e Marmellata",
      description:
        "A quintessential Italian breakfast staple, this simple yet satisfying combination of bread, butter, and jam is a popular choice for those seeking a sweet treat as part of their Italian-style breakfast.",
      price: 2.3,
    },
    {
      id:'b02',
      src: "/breakfasts/cornetto_and_milk.jpg",
      dish: "Cornetto",
      description:
        "Cornetto (the Italian version of the French croissants) is a delectable type of pastry often filled with cream, jam, chocolate, or even almond paste (cornetto alle mandorle).",
      price: 2.0,
    },
    {
      id:'b03',
      src: "/breakfasts/fette_biscottate.jpg",
      dish: "Fette Biscottate",
      description:
        "Fette biscottate are thin, crispy slices of bread that have been baked twice to achieve their unique texture. These scrumptious toasts boast a subtly sweet flavor, making them a popular choice at breakfast time.",
      price: 2.0,
    },
    {
      id:'b04',
      src: "/breakfasts/italian_biscotti.jpg",
      dish: "Biscotti",
      description:
        "As one of Italy’s most popular breakfast foods, biscotti are crunchy, sweet cookies traditionally enjoyed alongside coffee or tea. These delightful treats are designed for dipping into hot beverages, allowing the flavors to meld and create a perfect harmony of taste and texture.",
      price: 3.5,
    },
    {
      id:'b05',
      src: "/breakfasts/nutella.jpg",
      dish: "Pane e Nutella",
      description:
        "This is the way to go regarding sweet food. Bread or toast is generously spread with Nutella, a widely popular chocolate hazelnut spread that has become a beloved staple in many Italian households. This delectable combination creates a rich and satisfying treat perfect for starting the day on a sweet note.",
      price: 4.3,
    },
    {
      id:'b06',
      src: "/breakfasts/cereals_milk.jpg",
      dish: "Cereali",
      description:
        "Italians enjoy a variety of breakfast cereals, both hot and cold, as part of a healthy breakfast. Options range from muesli and granola to classic cornflakes, providing energy and nutrition to start the day on the right foot.",
      price: 1.8,
    },
    {
      id:'b07',
      src: "/breakfasts/saccottino.jpg",
      dish: "Saccottino",
      description:
        "A small, delightful pastry filled with chocolate, cream, or fruit preserves, the saccottino is a popular choice for a sweet and satisfying Italian breakfast. Its soft, flaky exterior gives way to a delicious, rich filling, making it a morning treat that’s hard to resist.",
      price: 3.8,
    },
    {
      id:'b08',
      src: "/breakfasts/cannoli.jpg",
      dish: "Cannoli",
      description:
        "A Sicilian pastry known for its crispy shell filled with sweet, creamy ricotta, cannoli can also be found with savory fillings in some regions. Though traditionally enjoyed as a dessert, these indulgent pastries can sometimes make their way onto the Italian breakfast table for a special treat.",
      price: 5.6,
    },
    {
      id:'b09',
      src: "/breakfasts/maritozzi.jpg",
      dish: "Maritozzi",
      description:
        "Maritozzi are sweet buns often filled with whipped cream or custard. These delicious pastries are particularly popular in Rome and are a favorite morning treat for many Italians. The soft, fluffy texture of the bun combined with the sweet filling makes Maritozzi a delightful addition to any Italian breakfast spread.",
      price: 4.6,
    },
    {
      id:'b10',
      src: "/breakfasts/cantuccini.jpg",
      dish: "Cantucci",
      description:
        "Crunchy almond cookies, cantucci are typically served with sweet dessert wine. Though traditionally enjoyed as a dessert, these delectable cookies can also appear during breakfast, providing a tasty, nutty treat to pair with coffee or tea.",
      price: 3.5,
    }
  ];

  const lunch = [
    {
      id:'m01',
      src: "/meals/lasagne.jpg",
      dish: "Lasagne alla Bolognese",
      description:
        "Lasagna Alla Bolognese is a popular dish all over the world, featuring multiple layers of beef, tomato, and onion bolognese sauce, bechamel sauce, and lasagne pasta sheets until the cheesy top. This is a rich and warming dish that goes perfectly with a bold red wine.",
      price: 6.50,
    },
    {
      id:'m02',
      src: "/meals/fettuccine.jpg",
      dish: "Fettuccine al Pomodoro",
      description:
        "Pomodoro is another classical Italian dish that is delicious in its simplicity. Pomodoro simply means “tomato,” and it is the tomato and basil sauce that gives this dish its iconic fresh taste. It is the perfect light dish to relax with after a long day exploring.",
      price: 5.30,
    },
    {
      id:'m03',
      src: "/meals/gnocchi.jpg",
      dish: "Gnocchi di Patate",
      description:
        "Gnocchi di patate is a popular alternative to pasta, traditionally eaten at lunch in central Italy and made by grandmothers across the nation. Gnocchi can be eaten with most pasta sauces, so there are many exciting gnocchi flavours you can try.",
      price: 4.80,
    },
    {
      id:'m04',
      src: "/meals/melanzane.jpg",
      dish: "Melanzane alla Parmigiana",
      description:
        "Another traditional but famous Italian dish served on La Bella Vita cruises is Melanzane Alla Parmigiana. This dish is thick and baked, deeply warming your insides on colder evenings. It is made with thinly sliced aubergine that is then topped with cheese.",
      price: 7.20,
    },
    {
      id:'m05',
      src: "/meals/pizza-margherita.jpg",
      dish: "Pizza Margherita",
      description:
        "Perhaps even more famous than pasta is the pizza Margherita, which is the most simple pizza with just tomato sauce and buffalo mozzarella cheese. ",
      price: 7.80,
    },
    {
      id:'m06',
      src: "/meals/vitello-tonnato.jpg",
      dish: "Vitello Tonnato",
      description:
        "Vitello tonnato is another veal dish, with its literal translation being “tunnied veal.” It is a dish designed for the long evenings of an elegant summer. The veal is cooked, cut into thin slices, and then chilled",
      price: 9.50,
    },
    {
      id:'m07',
      src: "/meals/tortellini.jpg",
      dish: "Tortellini",
      description:
        "Tortellini are an ancient food from Bologna and Modena. It is diffused in all the central-Italy, sometimes with different names, like for example cappelletti in Marche. It is egg pasta stuffed with meat and closed (strictly by hand) according to the unmistakable shape. They are served in broth during the Christmas period or on New Year’s Day, according to local traditions.",
      price: 4.8,
    },
    {
      id:'m08',
      src: "/meals/meatballs.jpeg",
      dish: "Meatballs in sauce",
      description:
        "Meatballs in sauce are one of the most classic recipes, which can be found all over Italy. It is one of the tastiest ways to cook a minced meat. Nice balls of meat cooked long in abundant tomato sauce. A rich and healthy dish, to accompany with bread.",
      price: 9.50,
    },
    {
      id:'m09',
      src: "/meals/risotto.jpg",
      dish: "Risotto",
      description:
        "Risotto, like pasta, can be prepared with thousands of ingredients. The best known is definitely the one called alla milanese that is with saffron, precious spice with unmistakable flavor and color. In any case the rice should never be boiled, but toasted, nuanted with wine and slowly cooked with the constant addition of broth.",
      price: 6.20,
    },
    {
      id:'m10',
      src: "/meals/amatriciana.jpg",
      dish: "Amatriciana",
      description:
        "Amatriciana pasta, derived from the city of Amatrice, is a pride of Roman gastronomy and Lazio in general. Unfortunately, it suffers many bad imitations, but tradition would require the use of jowl, pecorino cheese and tomato. The most suitable pasta format? The bucatini!",
      price: 8.50,
    }
  ];

  const dinner = [
    {
      src: "/dinners/florentine_steak.jpg",
      dish: "Florentine steak",
      description:
        "As the word itself says, Florentine comes from Florence. In this case there is no doubt: a scottona steak with bone, between 1kg and 1.5 kg, at least 5 cm thick. The cooking is essential: it must be grilled for 5 minutes on each side, without ever exceeding the 149 ºF. It must be served strictly rare!",
      price: 18.50,
    },
    {
      src: "/dinners/carbonara.jpg",
      dish: "Carbonara",
      description:
        "Crispy jowl and not bacon! And the creamy part of the dressing is obtained with raw egg, pecorino cheese and some cooking water. Do not forget the pepper and let’s go over in chorus: no cooking cream! No cooking cream! No cooking cream!",
      price: 7.0,
    },
    {
      src: "/dinners/arancini.jpg",
      dish: "Arancini",
      description:
        "Arancini are fried rice balls. There are two main types: Roman and Sicilian. Both are filled with ragu or tomato sauce, mozzarella cheese, and Arborio rice, used to make risotto. The difference is that the Sicillian arancino recipes typically add beef and peas.",
      price: 8.30,
    },
    {
      src: "/dinners/focaccia.jpg",
      dish: "Focaccia",
      description:
        "Italian dough is so good that it needed a special bread to homage it. Focaccia is an oven-baked Italian bread in between flatbread and pizza. Depending on the region, it may look different, it may have different ingredients and toppings, and even a different name. In the Tuscan area it is known as schiacciata, in Basilicata, strazzata, and crescia in Umbria. It is typically a bread with herb toppings and olive oil. Perfect for a starter or just as an afternoon snack.",
      price: 3.5,
    },
    {
      src: "/dinners/italian_cheese.jpg",
      dish: "Italian Cheese",
      description:
        "Strong, soft, creamy, grained, sweet, or salty, how can anyone say no to a good piece of cheese? As is common with every Italian food, each region has mastered a specific type of cheese, but all are equally good.",
      price: 11.00,
    },
    {
      src: "/dinners/ossobuco.jpg",
      dish: "Ossobuco",
      description:
        "Ossobuco is a dish from Milan and is the best example of elaborate Italian cuisine. It is slowly cooked and may take up to three hours to be ready, but that results in a meat so delicious and tender that it’s going to be worth the wait.",
      price: 18.30,
    },
    {
      src: "/dinners/truffles.jpg",
      dish: "Truffles",
      description:
        "One of the best gifts Italy has given the world, even though it is possible to find truffles in a few other places, no other country produces them with such quality and volume. Truffles are a highly aromatic fungus that are found near the tree roots in the forests of Piedmont and Umbria between the months of November and March.",
      price: 14.50,
    },
    {
      src: "/dinners/ravioli.jpg",
      dish: "Ravioli",
      description:
        "Ravioli are usually served boiled with a sauce as a first course, or boiled and served in broth as a traditional winter dish. Ravioli fillings include diverse varieties of meat, cheese, and vegetables, and they vary from region to region. There are also sweet ravioli, which are usually deep-fried.",
      price: 6.60,
    },
    {
      src: "/dinners/puglia_tiella.jpg",
      dish: "Puglia Tiella",
      description:
        "Traditionally, the mussels are opened with a knife when still raw and used in this dish. Here, they are just-cooked and their cooking liquid is used to flavour the whole dish.",
      price: 4.6,
    },
    {
      src: "/dinners/baked_ziti.jpg",
      dish: "Baked Ziti ",
      description:
        "Crunchy almond cookies, cantucci are typically served with sweet dessert wine. Though traditionally enjoyed as a dessert, these delectable cookies can also appear during breakfast, providing a tasty, nutty treat to pair with coffee or tea.",
      price: 3.5,
    },
  ];

  return (
    <>
      <section id="menu">
        <div className="container">
          <h1>Menu</h1>
          <h2>Breakfast</h2>
          <div className="cards_container">
            {menuMaker(breakfast)}
          </div>
          <h2>Lunch</h2>
          <div className="cards_container">
            {menuMaker(lunch)}
          </div>
          <h2>Dinner</h2>
          <div className="cards_container">
            {menuMaker(dinner)}
          </div>
        </div>
      </section>
    </>
  );
}

export default Menu;
