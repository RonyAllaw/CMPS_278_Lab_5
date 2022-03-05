const range = document.getElementById("range");
document.getElementById("form2").style.display="none";
document.getElementById("form3").style.display="none";
document.body.style.backgroundColor = "#01dddd";

const getSize = () =>{
    var size = document.getElementById("range");
    return size;
}
const getMeat = () =>{
    const toppings = document.getElementsByName("Meat");
    var checked_toppings = [];
    for(var topping of toppings){
        if (topping.checked){
            checked_toppings.push(topping);
        }
    }
    return checked_toppings;
}
const getVeg = () =>{
    const toppings = document.getElementsByName("Veg");
    var checked_toppings = [];
    for(var topping of toppings){
        if (topping.checked){
            checked_toppings.push(topping);
        }
    }
    return checked_toppings;
}
const getCheese = () =>{
    const regular = document.getElementById("Regular Cheese");
    const noCheese = document.getElementById("No Cheese");
    const ExtraCheese = document.getElementById("Extra Cheese ($3)");
    if (regular.checked){
        return 1;
    }
    if (noCheese.checked){
        return 2;
    }
    if (ExtraCheese.checked){
        return 3;
    }
}
const getPizzaSize = (rangeValue) =>{
    if(rangeValue == 1){
        return "Small";
    }
    else if(rangeValue == 2){
        return "Medium";
    }
    else if(rangeValue == 3){
        return "Large";
    }
    else if(rangeValue == 4){
        return "X-Large";
    }
}
const getPizzaPrice = (rangeValue) =>{
    if(rangeValue == 1){
        return 6;
    }
    else if(rangeValue == 2){
        return 10;
    }
    else if(rangeValue == 3){
        return 14;
    }
    else if(rangeValue == 4){
        return 16;
    }
}
const ChangePizzaSize = (rangeValue) => {
    const pizza = document.getElementById("pizza");
    const pizzaText = document.getElementById("pizzaText");
    if (rangeValue == 1){
        pizza.style.width = "100px";
        pizza.style.height = "100px";
        pizzaText.textContent = getPizzaSize(rangeValue) + " " + getPizzaPrice(rangeValue) + "$";
    }
    else if (rangeValue == 2){
        pizza.style.width = "150px";
        pizza.style.height = "150px";
        pizzaText.textContent = getPizzaSize(rangeValue) + " " + getPizzaPrice(rangeValue) + "$";
    }
    else if (rangeValue == 3){
        pizza.style.width = "200px";
        pizza.style.height = "200px";
        pizzaText.textContent = getPizzaSize(rangeValue) + " " + getPizzaPrice(rangeValue) + "$";
    }
    else if (rangeValue == 4){
        pizza.style.width = "250px";
        pizza.style.height = "250px";
        pizzaText.textContent = getPizzaSize(rangeValue) + " " + getPizzaPrice(rangeValue) + "$";
    }
}
range.addEventListener("change", () => {
    ChangePizzaSize(range.value);
});

const calculateTotal = () => {
    return getPizzaPrice(range.value) + getMeat().length*2 + getVeg().length + (getCheese() == 3 ? 3 : 0);
  }
const fillSummary = () =>{
const SummaryDelivery = document.getElementById("dlvrTo");
const FirstName = document.getElementById("First Name");
const LastName = document.getElementById("Last Name");
const E_mail = document.getElementById("E-mail");
const PhoneNumber = document.getElementById("Phone Number");
const City = document.getElementById("City");
const address = document.getElementById("Address");
SummaryDelivery.textContent = FirstName.value + " " + LastName.value + ", " + E_mail.value + ", " + PhoneNumber.value + ", " + City.value + "-" + address.value;
const orderList = document.getElementById("orderList");
orderList.innerHTML = "";
var li = document.createElement("li");
li.appendChild(document.createTextNode("-" + getPizzaSize(range.value) + " size"));
orderList.append(li);
const toppings = document.getElementById("form1").getElementsByTagName("input");
var checked_toppings = []
for (var topping of toppings){
    if (topping.checked){
        checked_toppings.push(topping);
    }
}
checked_toppings.sort((a, b)=> (a.value > b.value)? 1 : -1);
for(var checked_topping of checked_toppings){
    if(checked_topping.getAttribute("name") != "payment"){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(checked_topping.value));
        orderList.append(li);
    }
    const total = document.getElementById("total");
    total.innerHTML = "Total: " + calculateTotal() + " $";
}
}
const gotoPage = (pageNumber) => {
    if (pageNumber == 1) {
      document.getElementById("form1").style.display="inherit";
      document.getElementById("form2").style.display="none";
      document.getElementById("form3").style.display="none";
      document.body.style.backgroundColor = "#01dddd";
    } else if (pageNumber == 2) {
      document.getElementById("form1").style.display="none";
      document.getElementById("form2").style.display="inherit";
      document.getElementById("form3").style.display="none";
      document.body.style.backgroundColor = "#e93a57";
    } else if (pageNumber == 3) {
      document.getElementById("form1").style.display="none";
      document.getElementById("form2").style.display="none";
      document.getElementById("form3").style.display="inherit";
      document.body.style.backgroundColor = "#3fc38e";
    }
  }

  const checkInfo = () => {
    const form2 = document.getElementById("form2");
    const fields = form2.getElementsByClassName("form2Field");
    for(var field of fields) {
      if (field.value == "") return false;
    }
    return true;
  }

const form1Next = document.getElementById("form1Next");
form1Next.addEventListener("click", (e) => {
  e.preventDefault();
  gotoPage(2);
})

const form2Back = document.getElementById("form2Back")
form2Back.addEventListener("click", (e) => {
  e.preventDefault();
  gotoPage(1);
})

const form2Next = document.getElementById("form2Next")
form2Next.addEventListener("click", (e) => {
  e.preventDefault();
  if (!checkInfo()) {
    alert('Please fill all your details');
    return;
  }
  gotoPage(3);
  fillSummary();
})  

const form3Back = document.getElementById('form3Back')
form3Back.addEventListener("click", (e) => {
  e.preventDefault();
  gotoPage(2);
})

