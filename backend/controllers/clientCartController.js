const coupon = require("../mock/coupon.json");

module.exports = function (app) {

    app.get("/api/coupon/free",(req,res)=>{
        res.json(coupon);
    })


  //! check coupon
  app.post("/api/coupon/check", (req, res) => {
    try {
      const clientCoupon = req.body.coupon;
      const readCoupon = coupon.find(
        (c) => c.coupon === clientCoupon.toLowerCase()
      );

      const cantFind = "The coupon is invalid.";
      const found = "Coupon is available";

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

  //! payment
  app.post("/api/request/buy", (req, res) => {
    try {
      const clientCoupon = req.body.coupon;
      const cartItems = req.body.cart;
  
      const cantFind = "The coupon is invalid.";
      const bought = "Thank you and wish you happy traveling.";
      const noCart = "Please select product";
  
      const readCoupon = coupon.find(
        (c) => c.coupon.toLowerCase() === clientCoupon.toLowerCase()
      );
  
      if (cartItems.length == 0) {
        res.json({ status: "NoItem", data: { message: noCart } });
        return; 
      }

      if (clientCoupon.length !== 0 && typeof readCoupon === "undefined") {
        res.json({ status: "NotFound", data: { message: cantFind } });
        return; 
      }
  
      const total = cartItems.reduce((previousValue, currentItem) => {
        if (currentItem.amount !== undefined) {
          return (
            previousValue + parseFloat(currentItem.price) * currentItem.amount
          );
        } else {
          return previousValue;
        }
      }, 0);
  
      let result;
      if (typeof readCoupon !== "undefined") {
        result = total - Number(readCoupon.discount);
      } else {
        result = total;
      }
  
      res.json({ status: "OK", data: { message: bought, bil: result } });
    } catch (error) {
      console.log(error);
    }
  });
  
};
