import express from "express"
import upload from "../middleware/multer.js";
import verifyAdmin from "../middleware/admin.js";
import { addProduct, singleProduct ,removeProduct,listProduct  } from "../Controllers/productController.js"

const productRouter = express.Router();

productRouter.post("/add",upload.fields([{name:"image1",maxcount: 1 },{name:"image2",maxcount: 1 },{name:"image3",maxcount: 1 },{name:"image4",maxcount: 1 }]), addProduct)
productRouter.get("/list", listProduct)

productRouter.post("/remove" ,removeProduct )
productRouter.get("/single" , singleProduct)


export default productRouter;