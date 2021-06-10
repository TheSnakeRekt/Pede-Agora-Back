const checkoutControlerService = require('../Business/Checkout/Checkout.service');

class CheckoutControler {

    name = `Checkout Endpoint`;

    constructor(checkoutControlerService){
        this.checkoutControlerService = checkoutControlerService;
    }

    checkoutRestAdapter = (app) => {
        app.post('/checkout', async (req, res)=>{
           const data = await this.checkoutControler.findAll();
           res.send(data);
           res.end()
        });
    }
}

module.exports = new CheckoutControler(checkoutControlerService);