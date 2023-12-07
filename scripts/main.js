// <-----Business Logic------>
const Pizza = function(name,size='small'){
    this.name = name;
    this.size = size;
    this.topping = "";
    this.crust = "";
    Object.defineProperty(this,'price',{
        get: function(){
            switch (this.size) {
                case 'medium': return this.listPrice[1]
                    break;
                case 'large':return this.listPrice[2]
                    break;
                default: return this.listPrice[0]
                    break;
            }
        }
    })
}

Pizza.prototype.getTotalPrice = function(){
    let toppingPrice;
    let crustPrice;
    switch (this.topping) {
        case 'pepperoni': toppingPrice = 100;
            break;
        case 'mushrooms': toppingPrice = 200;
            break;
        case 'onions' : toppingPrice = 80;
            break;
        case 'bacon' : toppingPrice = 150;
            break;
        default: toppingPrice = 0;
            break;
    }

    switch (this.crust) {
        case 'glutenFree': crustPrice = 300;
            break;
        case 'puff': crustPrice = 170;
            break;
        case 'crispy' : crustPrice = 200;
            break;
        case 'classic' : crustPrice = 100;
            break;
        default: crustPrice= 0;
            break;
    }
    

    return toppingPrice + crustPrice + this.price;
   
}

const BigMark = function(name,size){
    Pizza.call(this, name, size);
    this.listPrice = [500,750,1000]
}
BigMark.prototype = new Pizza();

const CheeseLove = function(name,size){
    Pizza.call(this,name,size);
    this.listPrice = [700,1000,1300]
}
CheeseLove.prototype = new Pizza();

const Pepperoni = function(name,size){
    Pizza.call(this,name,size);
    this.listPrice = [650,950,1150]
}
Pepperoni.prototype = new Pizza();

const Napoletana = function(name,size){
    Pizza.call(this,name,size);
    this.listPrice =[900,1100,1600]
}
Napoletana.prototype = new Pizza();

const Diavola = function(name,size){
    Pizza.call(this,name,size);
    this.listPrice = [1000,1500,2000]
}
Diavola.prototype = new Pizza();

const Frutti = function(name,size){
    Pizza.call(this,name,size);
    this.listPrice = [870,1200,1650]
}
Frutti.prototype = new Pizza();

const  availablePizza = [];

const bigMark = new BigMark('Big Mark');
const cheeseLove = new CheeseLove('Cheese Love')
const pepperoni = new Pepperoni('Pepperoni Craze')
const napoletana = new Napoletana('Napoletana')
const diavola = new Diavola('Diavola');
const frutti = new Frutti('Frutti D\'Mare')
availablePizza.push(bigMark,cheeseLove,pepperoni,napoletana,diavola,frutti);

const orders = []

const computeChanges = function(pizza,object,card){
    pizza.size = object.size;
    pizza.topping = object.topping;
    pizza.crust = object.crust;

    const index = orders.findIndex(function(order){
        return order.details.name === pizza.name;
    })

    if(index == -1){
        orders.unshift({
            details:pizza,
            count:1
        })
        updatePrice(card,orders[0].details.getTotalPrice());
        updateCount(card,`1 in Cart`)
        updateCartBadge()
        card.find('.cart-btn').hide();
        card.find('.order-btns').show()
    }else{
        orders[index].details = pizza;
        updatePrice(card,orders[index].details.getTotalPrice() * orders[index].count )
        updateCartBadge()
    }
}
const keepCount = function(pizza,calc,card){
    const index = orders.findIndex(function(order){
        return order.details.name === pizza.name;
    })
    if(index == -1){
        if(calc == 'add'){
            orders.push({
                details:pizza,
                count:1
            })
        updateCount(card,'1 in Cart');
        updateCartBadge()

        }
    }else{
        if(calc == 'add'){
            orders[index].count += 1;
            updateCount(card,`${orders[index].count} in Cart`)
            let price = orders[index].details.getTotalPrice() * orders[index].count;
            updatePrice(card,price)
             updateCartBadge()
        }else{
            if(orders[index].count == 1){
                orders[index].count = 0;
                updateCartBadge()
                updatePrice(card,0)
                updateCount(card,`${orders[index].count} in Cart`)
                card.find('.cart-btn').show();
                card.find('.order-btns').hide()

            }else if(orders[index].count ==0){
                orders.splice(index,1)
            }else{
                orders[index].count -= 1;
                updateCount(card,`${orders[index].count} in Cart`)
                let price = orders[index].details.getTotalPrice() * orders[index].count
                updatePrice(card,price)
                updateCartBadge()
            }
        } 
    }
}

function callKeepCount(id,calc,card){
    switch (id) {
        case 'Big-Mark': keepCount(bigMark,calc,card);
            break;
        case 'Cheese-Love': keepCount(cheeseLove,calc,card);
            break;
        case 'Pepperoni-Craze': keepCount(pepperoni,calc,card);
            break;
        case 'Napoletana': keepCount(napoletana,calc,card);
            break;
        case 'Diavola' :keepCount(diavola,calc,card);
            break;
        case 'Frutti-D\'Mare': keepCount(frutti,calc,card);
            break;
        default:
            break;
    }
}

function updateCount(card,count){
     card.find('.inCart').text(count)
}

function updatePrice(card,price){
    card.find('.price-display').text(price)
}

function clearCart(cart){
    cart.splice(0,cart.length);
    $('.inCart').text(`0 in Cart`);
    $('.cart-btn').show();
    $('.order-btns').hide();
    const currentCard = $('.price-display').closest('.card');
    const pizzaId = currentCard.attr('id')
    resetPrice(currentCard,pizzaId);
    updateCartBadge();

}

function resetPrice(currentCard, pizzaId){
    switch (pizzaId) {
        case 'Big-Mark':
                currentCard.find('.price-display').text(`${bigMark.getTotalPrice()}`)
            break;
        case 'Cheese-Love':
            currentCard.find('.price-display').text(`${cheeseLove.getTotalPrice()}`)
            break;
        case 'Pepperoni-Craze':
            currentCard.find('.price-display').text(`${pepperoni.getTotalPrice()}`)
            break;
        case 'Napoletana':
            currentCard.find('.price-display').text(`${napoletana.getTotalPrice()}`)
            break;
        case 'Diavola':
            currentCard.find('.price-display').text(`${napoletana.getTotalPrice()}`)
            break;
        case 'Frutti-D\'Mare':
            currentCard.find('.price-display').text(`${napoletana.getTotalPrice()}`)
            break;
        default:
            break;
    }
}
function updateCartBadge(){
    let count = 0;
    orders.forEach(function(order){
        count += order.count;
    })
    $('.badge').text(`${count}`)
}
function calculateCheckOutPrice(){
    let total = 0
    orders.forEach(function(order){
        if(order.count !== 0){
            total += order.details.getTotalPrice()*order.count;
        }
    })
    return total;
}
// <----- UI LOGIC ------->
$(function(){

    //add pizza display to the DOM dynamically
    availablePizza.forEach(function(pizza){
        $('#card-display').append(`
            <div class="card" id="${(pizza.name).replace(' ','-')}">
                <div class="card-img-top"></div>
                <div class="card-body">
                    <h5 class="card-title">${pizza.name}</h5>
                    <div class="price-display">${pizza.getTotalPrice()}</div>
                </div>
                <div style="clear:both;"><div>
                <div class="card-footer">
                    <form class="form">
                        <div class="form-row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="size">Size</label>
                                    <select name="size" class="form-control" id="size">
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="topping">Topping</label>
                                    <select name="topping" class="form-control" id="topping">
                                        <option value=""></option>
                                        <option value="pepperoni">Pepperoni</option>
                                        <option value="bacon">Bacon</option>
                                        <option value="mushrooms">Mushrooms</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="crust">Crust</label>
                                    <select name="crust" class="form-control" id="crust">
                                        <option value=""></option>
                                        <option value="crispy">Crispy</option>
                                        <option value="classic">Classic</option>
                                        <option value="glutenFree">Gluten Free</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <button class="btn btn-secondary cart-btn">Add to cart</button>
                    <div class="order-btns">
                        <button class="btn btn-primary add">+</button>
                        <p class="inCart">0 in Cart</p>
                        <button class="btn btn-primary minus">-</button>
                    </div>
                    
                    
                </div>
            </div> 
        `)
    })

    //collect form input to recalculate price
    let arr = [];
    let objArr = [];

    $('form').change(function(){
        arr =[];
        objArr = []
        const result = $(this).serialize();
        const splitted = result.split('&');

        splitted.forEach(element => {
            let data = element.split('=');
            arr.push(data);
        });
        
        arr.forEach(function(element){
            let obj =Object.assign({},{[element[0]]:element[1]})
        
            objArr.push(obj);
        })
        const myObject = {};
        objArr.forEach(function(obj){
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    myObject[key] = obj[key]
                }
            }
        })
        
        const currentCard = $(this).closest('.card');
        const pizzaId = currentCard.attr('id')
        switch (pizzaId) {
            case 'Big-Mark':
                computeChanges(bigMark,myObject,currentCard);
                break;
            case 'Cheese-Love':
                computeChanges(cheeseLove,myObject,currentCard);
                break;
            case 'Pepperoni-Craze':
                computeChanges(pepperoni,myObject,currentCard);
                break;
            case 'Napoletana':
                computeChanges(napoletana,myObject,currentCard)
                break;
            case 'Diavola':
                computeChanges(diavola,myObject,currentCard)
                break;
            case 'Frutti-D\'Mare':
                computeChanges(frutti,myObject,currentCard)
                break;
            default:
                // console.log('Sth broke')
                break;
        }
        

    })

    $('.order-btns').hide();
    $('.cart-btn').click(function(){
        $(this).next().show()
        $(this).hide();
    })

    $('.add').click(function(){
        const card = $(this).closest('.card')
        const id = card.attr('id');
        callKeepCount(id,'add',card)
    })

    $('.minus').click(function(){
        const card = $(this).closest('.card')
        const id  = card.attr('id');
        callKeepCount(id,'minus',card)

    })
   
    $('.close').click(function(){
        $('#mymodal').hide();
        $('#checkoutForm').trigger('reset');
        
    })
    $('.cart').click(function(){
        $('#mymodal').find('#summary').empty();
        $('#mymodal').show();
        $('.hidden').hide();
        const total = calculateCheckOutPrice();
        orders.forEach(function(order,i){
            if(order.count !== 0){
            $('#summary').append(`
                <div>
                    <h3>${order.details.name}</h3>
                    <p>Size :  ${order.details.size}</p>
                    <p>topping : ${order.details.topping}</p>
                    <p> Crust : ${order.details.crust}</p>
                    <p class="lead"> subtotal : ${order.details.getTotalPrice()}</p>
                    <p> count : ${order.count}</p>
                    <p class="lead"> Total : ${order.details.getTotalPrice()*order.count}<p/> 
                    <hr>
                </div>
            `)
            }
        })
        $('.total').html(`<h2>Total : ${total}</h2>`)
        if(total== 0){
            $('.checkout-btn').attr('disabled','')
        }else{
            $('.checkout-btn').removeAttr('disabled')
        }
    })
    
    $('#delivery').change(function(){
        if($(this).is(':checked') && $(this).val() =="delivery"){
            $('.hidden').css({display:'flex'})
            $('.total').html(`<h2>Total : ${calculateCheckOutPrice() + 200} (Inclusive of a $200sh delivery fee)</h2>`);            
        }
    })
    $('#pickup').change(function(){
        if($(this).is(':checked') && $(this).val() =="pickup"){
            $('.hidden').css({display:'none'})
            $('.total').html(`<h2>Total : ${calculateCheckOutPrice()}</h2>`)
        }
    })
    $(".checkout-btn").click(function(){
        clearCart(orders);
        $('#checkoutForm').trigger('reset');
        $('#mymodal').hide();
        $('#alert').append(`
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Order Successful</strong><span id="checkout-alert"> Your order should be ready in about 1 hour!</span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `)
    })
    
})