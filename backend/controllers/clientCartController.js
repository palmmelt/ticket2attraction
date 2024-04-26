const coupon = require("../mock/coupon.json");

module.exports = function (app) {

    app.get("/api/coupon/free",(req,res)=>{
        res.json(coupon);
    })


  //? check coupon
  app.post("/api/coupon/check", (req, res) => {
    try {

      const clientCoupon = req.body.coupon;

      // use coupon to find the coupon obj
      const readCoupon = coupon.find(
        (c) => c.coupon === clientCoupon.toLowerCase()
      );

      //  message out put
      const cantFind = "The coupon is invalid.";
      const found = "Coupon is available";


      //! Check coupons 
      if (!readCoupon && clientCoupon !== 0) {
        res.json({
          status: "NotFound",
          data: { message: cantFind, discount: 0 },
        });
      } else {
        res.json({
          status: "OK",
          data: { message: found, discount: Number(readCoupon.discount) },
        });
      }
    } catch (err) {
      res.json({ status: "error", message: err });
    }
  });

  //? payment
  app.post("/api/request/buy", (req, res) => {
    try {
      const clientCoupon = req.body.coupon;
      const cartItems = req.body.cart;

        //  message out put
      const cantFind = "The coupon is invalid.";
      const bought = "Thank you and wish you happy traveling.";
      const noCart = "Please select product";
  
      //use coupon to find the coupon obj
      const readCoupon = coupon.find(
        (c) => c.coupon.toLowerCase() === clientCoupon.toLowerCase()
      );
  
      //! check cart client
      if (cartItems.length == 0) {
        res.json({ status: "NoItem", data: { message: noCart } });
        return; 
      }

      //! validate coupon
      if (clientCoupon.length !== 0 && typeof readCoupon === "undefined") {
        res.json({ status: "NotFound", data: { message: cantFind } });
        return; 
      }
  
      // cartItems[] to calculation of order
      const total = cartItems.reduce((previousValue, currentItem) => {
        if (currentItem.amount !== undefined) {
          return (
            previousValue + parseFloat(currentItem.price) * currentItem.amount
          );
        } else {
          return previousValue;
        }
      }, 0);
  

      // pre result to out put
      let result;
      if (typeof readCoupon !== "undefined") {
        result = total - Number(readCoupon.discount);
      } else {
        result = total;
      }
  
      //! status ok, client can buy
      res.json({ status: "OK", data: { message: bought, bil: result } });

    } catch (error) {
      console.log(error);
    }
  });
  
};
