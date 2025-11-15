

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const Razorpay = require("razorpay");
// // const axios = require('axios');
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
//  const path = require("path");
// const multer = require('multer');
// const fs = require('fs').promises
// const app = express();
// // const https = require('https')
// const jwt = require('jsonwebtoken')
// // const Razorpay = require("razorpay");
// // const util = require('util');
// // const unlink = util.promisify(fs.unlink);
// const port = process.env.PORT || 8081;
// app.use(cors());
// app.use(bodyParser.json());
// const SECRET_KEY = "your_secret_key";
// app.use('/uploads', express.static('uploads'));
// app.use(express.json()); // To parse JSON request body

// mongoose
//   .connect('mongodb+srv://root:1234@cluster0.ofeco44.mongodb.net/Ecomm')
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const categorySchema = new mongoose.Schema({
//   categoryId: { type: Number, required: true, unique: true },
//   categoryName: { type: String, required: true },
//   categoryCode: { type: String, required: true },

//   Products: [
//     {
//       productName: { type: String, required: true },
//       productCode: { type: String, required: true },
//     },
//   ],

// });


// const Category = mongoose.model('Category', categorySchema);
// const getNextCategoryId = async () => {
//   const lastCategory = await Category.findOne().sort({ categoryId: -1 });
//   return lastCategory ? lastCategory.categoryId + 1 : 1;
// };

// // Helper to get next category ID
// app.get('/api/next-category-id', async (req, res) => {
//   try {
//     const nextCategoryId = await getNextCategoryId();
//     res.status(200).json({ categoryId: nextCategoryId });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch next category ID', details: error.message });
//   }
// });


// // Route to add a category
// app.post('/api/add-category', async (req, res) => {
//   try {
//     const { categoryName, categoryCode } = req.body;
// console.log("reqbody", req.body)
//     if (!categoryName) {
//       return res.status(400).json({ error: 'Category name is required' });
//     }

//     const categoryId = await getNextCategoryId();
//     console.log("catid", categoryId)
//     const newCategory = new Category({ categoryId, categoryName, categoryCode });
//     await newCategory.save();
// console.log("newcat", newCategory)
//     res.status(201).json({ message: 'Category saved successfully', categoryId });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to save category', details: error.message });
//     console.error('Error saving category:', error);
//   }
// });
// // Get all categories
// app.get('/api/categories', async (req, res) => {
//   try {
//     const categories = await Category.find({}, 'categoryId categoryName categoryCode'); // Fetch only necessary fields
//     res.status(200).json(categories);
//     console.log("cat", categories)
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching categories' });
//   }
// });


// app.post('/api/add-productname', async (req, res) => {
//   const { categoryId, productName, productCode } = req.body;
//   console.log("ho", req.body)

//   try {
//     const category = await Category.findOne({ categoryId });
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     category.Products.push({ productName, productCode });
//     await category.save();

//     res.status(200).json({ message: 'Subcategory added successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error adding subcategory' });
//   }
// });

// app.get('/api/products/:categoryId', async (req, res) => {
//   try {
//     const category = await Category.findOne({ categoryId: req.params.categoryId });

//     if (category && category.Products) {
//       res.status(200).json(category.Products);
//       console.log("hi", category.Products)// Send the subcategories array
//     } else {
//       res.status(404).json({ message: 'No subcategories found' });
//     }
//   } catch (error) {
//     console.error('Error fetching subcategories:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// app.get('/api/edit/categories', async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// // API to edit a category
// app.put('/api/category/:id', async (req, res) => {
//   const { id } = req.params;
//   const { categoryName, categoryCode } = req.body;

//   try {
//     await Category.findByIdAndUpdate(id, { categoryName, categoryCode });
//     res.json({ message: 'Category updated successfully!' });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// // API to delete a category
// app.delete('/api/category/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     await Category.findByIdAndDelete(id);
//     res.json({ message: 'Category deleted successfully!' });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// const transporter = nodemailer.createTransport({
//   host: "smtp-mail.outlook.com",
//   port: 587,
//   secure: false, // TLS
//   auth: {
//     user: "Support@terraclenz.com",
//     pass: "czhrjxhfdvymnftg",
//   },
//   tls: {
//     ciphers: "SSLv3",
//   },
// });
// const productSchema = new mongoose.Schema({
//   productId: { type: String }, // Unique product identifier
//   ratings: { type: [Number], default: [] }, // Array of ratings (1-5 stars)
//   reviews: [{
//     review: { type: String, required: true },
//     rating: { type: Number, required: true },
//     name: { type: String },
//     email: { type: String },
//     createdAt: { type: Date, default: Date.now }
//   }],
//   categoryId: { type: Number, required: true },
//   aromas: [{
//     name: String,
//     images: [String], // Array of image filenames
//     sizes: [{
//       size: { type: String, required: true },
//       unit: { type: String, required: true },
//       quantity: { type: Number, required: true },
//       price: { type: Number, required: true },
//       offer: { type: Number, default: 0 },
//       sellingPrice: {
//         type: Number,
//         required: true,
//         default: function () {
//           return this.price - (this.price * (this.offer / 100));
//         }
//       },
//       sizeId: { type: String }
//     }]
//   }],
//   caption: { type: String },
//   description: { type: String },
//   uses: { type: String },
//    keyFeatures: { type: String },
//   ingredients: { type: String },
//   howToUse: { type: String },
// customerReviews: { type: String },
//   productName: { type: String, required: true },
//   productCode: { type: String, required: true },
//   categoryCode: { type: String, required: true },
//   categoryName: { type: String, required: true },
   
// }, { timestamps: true });

// productSchema.pre('save', async function (next) {
//   const product = this;

//   // Generate base productId
//   const productId = `${product.categoryCode.toUpperCase()}-${product.productCode.toUpperCase()}`;

//   // Set the base productId
//   product.productId = productId;

//   // Process each aroma and its sizes
//   if (product.aromas && product.aromas.length > 0) {
//     product.aromas.forEach(aroma => {
//       // Generate aroma letters for the sizeId
//       const words = aroma.name.split(' ');
//       let aromaLetters;

//       if (words.length === 1) {
//         // For single word, take first and last letter
//         const word = words[0];
//         aromaLetters = word.charAt(0).toUpperCase() + word.charAt(word.length - 1).toUpperCase();
//       } else {
//         // For multiple words, take first letter of each word
//         aromaLetters = words.map(word => word.charAt(0).toUpperCase()).join('');
//       }

//       // Generate sizeIds for each size in this aroma
//       if (aroma.sizes && aroma.sizes.length > 0) {
//         aroma.sizes.forEach(sizeObj => {
//           // Combine size and unit for the sizeId
//           const formattedSize = `${sizeObj.size}${sizeObj.unit}`.toUpperCase().replace(/\s+/g, '');
//           sizeObj.sizeId = `${productId}-${aromaLetters}-${formattedSize}`;
//         });
//       }
//     });
//   }

//   next();
// });



// const Product = mongoose.model("Productsforterra", productSchema);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//     return cb(new Error('Only image files are allowed!'), false);
//   }
//   cb(null, true);
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB
//   }
// });

// // Helper function to clean up uploaded files
// const cleanupFiles = async (files) => {
//   if (!files) return;

//   const filesToDelete = Array.isArray(files) ? files : Object.values(files).flat();
//   for (const file of filesToDelete) {
//     try {
//       await fs.unlink(file.path);
//     } catch (err) {
//       console.error('Error deleting file:', err);
//     }
//   }
// };

// app.post('/api/add-product', upload.fields([
//   { name: 'aromaImages', maxCount: 50 },
//   { name: 'images', maxCount: 10 }
// ]), async (req, res) => {
//   try {
//     console.log('Received form data:', req.body);
//     console.log('Received files:', req.files);

//     const aromasMetadata = JSON.parse(req.body.aromasMetadata || '[]');

//     const aromaImages = req.files.aromaImages || [];
//     const mainImages = req.files.images || [];

//     let currentImageIndex = 0;
//     const aromas = aromasMetadata.map(aroma => {
//       const aromaImageCount = aroma.imageCount;
//       const aromaImageFiles = aromaImages.slice(currentImageIndex, currentImageIndex + aromaImageCount);
//       currentImageIndex += aromaImageCount;

//       return {
//         name: aroma.name,
//         images: aromaImageFiles.map(file => `/uploads/${file.filename}`),
//         sizes: aroma.sizes
//       };
//     });

//     // ✅ Create the product document with NEW FIELDS
//     const product = new Product({
//       productName: req.body.productName,
//       productCode: req.body.productCode,
//       categoryId: req.body.categoryId,
//       categoryName: req.body.categoryName,
//       categoryCode: req.body.categoryCode,
//       caption: req.body.caption,
//       description: req.body.description,
//       uses: req.body.uses,
//       aromas: aromas,
//       mainImages: mainImages.map(file => `/uploads/${file.filename}`),

//       // ✅ Add these lines
//       keyFeatures: req.body.keyFeatures,
//       ingredients: req.body.ingredients,
//       howToUse: req.body.howToUse,
//       customerReviews: req.body.customerReviews 
//     });

//     await product.save();

//     res.json({
//       message: 'Product added successfully',
//       productId: product._id
//     });
//   } catch (error) {
//     // Cleanup uploaded files on error
//     if (req.files) {
//       Object.values(req.files).flat().forEach(file => {
//         fs.unlink(file.path, err => {
//           if (err) console.error('Error deleting file:', err);
//         });
//       });
//     }

//     console.error('Error saving product:', error);
//     res.status(500).json({
//       error: 'Failed to save product',
//       details: error.message
//     });
//   }
// });
// app.get('/api/preview/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'server Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//     console.log("products", products)
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // Get single product
// app.get('/api/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'server Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });



// app.post("/api/login", async (req, res) => {
//   const { identifier, password } = req.body;

//   try {
//     const user = await User.findOne({
//       $or: [{ email: identifier }, { mob_number: identifier }],
//     });

//     if (!user) {
//       return res.status(400).json({ message: "User does not exist" });
//     }

//     else if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     else {

//       const token = jwt.sign(
//         {
//           firstname: user.firstname,
//           lastname: user.lastname,
//           email: user.email,
//           id: user._id,
//           phoneNumber: user.mob_number,
//           role: user.role
//         },
//         SECRET_KEY,
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({ message: "Login successful", token: token });
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// const userSchema = new mongoose.Schema({
//   firstname: String,
//   lastname: String,
//   mob_number: String,
//   email: String,
//   password: String,
//   role: { type: String, default: 'user' },
//    profileImage: String, // <-- Add this
  
// });

// const User = mongoose.model("User", userSchema);
// app.get("/api/products/:productId/stock", async (req, res) => {
//   const { productId } = req.params;
//   const { sizeId } = req.query;

//   console.log("Received stock request:", { productId, sizeId });

//   try {
//     if (!sizeId) {
//       console.log("Missing sizeId");
//       return res.status(400).json({ error: "sizeId is required" });
//     }

//     const product = await Product.findOne({ productId });
//     if (!product) {
//       console.log("Product not found");
//       return res.status(404).json({ error: "Product not found" });
//     }

//     let foundSize = null;

//     for (const aroma of product.aromas) {
//       const match = aroma.sizes.find((s) => s.sizeId === sizeId);
//       if (match) {
//         foundSize = match;
//         break;
//       }
//     }

//     if (!foundSize) {
//       console.log("Size not found");
//       return res.status(404).json({ error: "Size not found for this product" });
//     }

//     console.log("Returning stock:", foundSize.quantity);
//     return res.status(200).json({ stock: foundSize.quantity });
//   } catch (err) {
//     console.error("Stock fetch error:", err);
//     return res.status(500).json({ error: err.message || "Server error" });
//   }
// });


// const razorpay = new Razorpay({
//   key_id: "rzp_test_qUmhUFElBiSNIs",
//   key_secret: "wsBV1ts8yJPld9JktATIdOiS",


// });
// app.post("/api/create-order", async (req, res) => {
//   const { amount } = req.body;

//   const options = {
//     amount: amount, // Amount in paise
//     currency: "INR",
//     receipt: "receipt#1",
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json({ order_id: order.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });



// // const orderSchema = new mongoose.Schema({
// //   orderId: {
// //     type: String,
// //     required: true,
// //     unique: true
// //   },
// //   ShipmentId: {
// //     type: String,
// //   },
// //   AWBcode: {
// //     type: String,
// //   },
// //   shiporderId: { type: String, },
// //   orderDate: {
// //     type: Date,
// //     default: Date.now
// //   },
// //   customerId: {
// //     type: String,
// //     required: true
// //   },
// //   customerDetails: {
// //     shippingAddress: {
// //       fullName: String,
// //       email: String,
// //       phoneNumber: String,
// //       addressLine1: String,
// //       addressLine2: String,
// //       city: String,
// //       state: String,
// //       pinCode: String,
// //       country: String
// //     },
// //     billingAddress: {
// //       fullName: String,
// //       email: String,
// //       phoneNumber: String,
// //       addressLine1: String,
// //       addressLine2: String,
// //       city: String,
// //       state: String,
// //       pinCode: String,
// //       country: String
// //     }
// //   },
// //   products: [{
// //     productId: {
// //       type: String,
// //       required: true
// //     },
// //     sizeId: {
// //       type: String,
// //       required: true
// //     },
// //     productName: {
// //       type: String,
// //       required: true
// //     },
// //     price: {
// //       type: Number,
// //       required: true
// //     },
// //     quantity: {
// //       type: Number,
// //       required: true,
// //       min: 1
// //     },
// //     size: String,
// //     image: String
// //   }],
// //   paymentDetails: {
// //   productPrice: {
// //     type: Number,
// //     required: true
// //   },
// //   totalAmount: {
// //     type: Number,
// //     required: true
// //   },
// //   status: {
// //     type: String,
// //     enum: ['pending', 'completed', 'failed', 'refunded'],
// //     default: 'pending'
// //   },
// //   paymentId: {
// //     type: String,
// //     required: true
// //   },
// //   paymentSignature: {
// //     type: String,
// //     required: true
// //   },
// //   gstNumber: {
// //     type: String,
// //     default: null
// //   }
// // },

// //   orderStatus: {
// //     type: String,
// //     enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
// //     default: 'pending'
// //   },
// //   deliveryStatus: { type: String, default: "pending" },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   },
// //   updatedAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // }, {
// //   timestamps: true
// // });

// // // Keep only essential indexes
// // orderSchema.index({ customerId: 1, createdAt: -1 });

// // // Pre-save middleware to update timestamps
// // orderSchema.pre('save', function (next) {
// //   this.updatedAt = new Date();
// //   next();
// // });

// // // Useful virtual for total items
// // orderSchema.virtual('totalItems').get(function () {
// //   return this.products.reduce((sum, product) => sum + product.quantity, 0);
// // });



// // const Order = mongoose.model('Order', orderSchema);




// // app.post('/api/orders/create', async (req, res) => {
// //   // Start a session for transaction
// //   const session = await mongoose.startSession();
// //   session.startTransaction();

// //   try {
// //     // Extract order details from request body
// //     const {
// //       orderId,
// //       orderDate,
// //       customerId,
// //       customerDetails,
// //       products,
// //       paymentDetails,
// //       orderStatus
// //     } = req.body;

// //     console.log('Starting order creation with products:', JSON.stringify(products, null, 2));

// //     // Create new order in database
// //     const newOrder = new Order({
// //       orderId,
// //       orderDate,
// //       customerId,
// //       customerDetails: {
// //         shippingAddress: customerDetails.shippingAddress,
// //         billingAddress: customerDetails.billingAddress
// //       },
// //       products: products.map(product => ({
// //         productId: product.productId,
// //         sizeId: product.sizeId,
// //         productName: product.productName,
// //         price: product.price,
// //         quantity: product.quantity,
// //         size: product.size,
// //         image: product.image
// //       })),
// //       paymentDetails: {
// //         productPrice: paymentDetails.productPrice,
// //         totalAmount: paymentDetails.totalAmount,
// //         status: paymentDetails.status,
// //         paymentId: paymentDetails.paymentId,
// //         paymentSignature: paymentDetails.paymentSignature,
// //         gstNumber:paymentDetails.gstNumber,
// //       },
// //       orderStatus,
// //       createdAt: new Date(),
// //       updatedAt: new Date()
// //     });

// //     // Save the order with session
// //     const savedOrder = await newOrder.save({ session });
// //     console.log('Order saved successfully:', savedOrder.orderId);

// //     // Update product quantities
// //     console.log('Starting quantity updates for products...');

// //     for (const product of products) {
// //       console.log(`Processing product: ${product.productId}, size: ${product.sizeId}, quantity: ${product.quantity}`);

// //       // Find the product
// //       const productDoc = await Product.findOne({
// //         productId: product.productId
// //       }).session(session);
// //       console.log("findproducts", productDoc);
// //       if (!productDoc) {
// //         console.error(`Product not found: ${product.productId}`);
// //         throw new Error(`Product not found: ${product.productId}`);
// //       }

// //       // Find the size index
// //       // const sizeIndex = productDoc.sizes.findIndex(s => s.sizeId === product.sizeId);
// //       const aromaContainingSize = productDoc.aromas?.find(aroma =>
// //         aroma.sizes?.some(size => size.sizeId === product.sizeId)
// //       );

// //       // Find the size index within that aroma
// //       const sizeIndex = aromaContainingSize
// //         ? aromaContainingSize.sizes.findIndex(s => s.sizeId === product.sizeId)
// //         : -1;
// //       if (sizeIndex === -1) {
// //         console.error(`Size not found for product: ${product.productId}, size: ${product.sizeId}`);
// //         console.log('Available sizes:', JSON.stringify(productDoc.sizes, null, 2));
// //         throw new Error(`Size ${product.sizeId} not found for product ${product.productId}`);
// //       }

// //       // const currentQuantity = productDoc.sizes[sizeIndex].quantity;
// //       // const newQuantity = currentQuantity - product.quantity;

// //       // console.log(`Updating quantity for product ${product.productId}:`);
// //       // console.log(`- Current quantity: ${currentQuantity}`);
// //       // console.log(`- Reducing by: ${product.quantity}`);
// //       // console.log(`- New quantity will be: ${newQuantity}`);

// //       // if (newQuantity < 0) {
// //       //   throw new Error(
// //       //     `Insufficient quantity for product ${product.productName} size ${product.size}. ` +
// //       //     `Available: ${currentQuantity}, Requested: ${product.quantity}`
// //       //   );
// //       // }

// //       // // Update the quantity
// //       // productDoc.sizes[sizeIndex].quantity = newQuantity;

// //       // // Save the updated product
// //       // await productDoc.save({ session });
// //       // console.log(`Successfully updated quantity for product ${product.productId}`);
// //       if (sizeIndex === -1) {
// //         console.error(`Size not found for product: ${product.productId}, size: ${product.sizeId}`);
// //         console.log('Available sizes:', JSON.stringify(aromaContainingSize.sizes, null, 2));
// //         throw new Error(`Size ${product.sizeId} not found for product ${product.productId}`);
// //       }

// //       // Now you can update the quantity as before
// //       const currentQuantity = aromaContainingSize.sizes[sizeIndex].quantity;
// //       const newQuantity = currentQuantity - product.quantity;

// //       console.log(`Updating quantity for product ${product.productId}:`);
// //       console.log(`- Current quantity: ${currentQuantity}`);
// //       console.log(`- Reducing by: ${product.quantity}`);
// //       console.log(`- New quantity will be: ${newQuantity}`);

// //       if (newQuantity < 0) {
// //         throw new Error(
// //           `Insufficient quantity for product ${product.productName} size ${product.size}. ` +
// //           `Available: ${currentQuantity}, Requested: ${product.quantity}`
// //         );
// //       }

// //       // Update the quantity
// //       aromaContainingSize.sizes[sizeIndex].quantity = newQuantity;

// //       // Save the updated product
// //       await productDoc.save({ session });
// //       console.log(`Successfully updated quantity for product ${product.productId}`);
// //     }

// //     // Commit the transaction
// //     await session.commitTransaction();
// //     console.log('Transaction committed successfully');

// //     // Send email confirmation (commented out as in original code)
// //     // await sendOrderConfirmationEmail(savedOrder);
// //     const customerEmail = savedOrder.customerDetails.billingAddress.email;
// //     if (customerEmail) {
// //       await sendOrderConfirmationEmail(savedOrder, customerEmail);
// //     }
// //     res.status(201).json({
// //       success: true,
// //       orderId: savedOrder.orderId,
// //       message: 'Order created successfully'
// //     });

// //   } catch (error) {
// //     console.error('=== Order Creation Failed ===');
// //     console.error('Error message:', error.message);
// //     console.error('Error stack:', error.stack);

// //     // Rollback the transaction
// //     await session.abortTransaction();
// //     console.log('Transaction rolled back due to error');

// //     res.status(500).json({
// //       success: false,
// //       message: 'Failed to create order',
// //       error: error.message
// //     });

// //   } finally {
// //     // End the session
// //     await session.endSession();
// //     console.log('Session ended');
// //   }
// // });

// const orderSchema = new mongoose.Schema({
//   orderId: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   ShipmentId: {
//     type: String,
//   },
//   AWBcode: {
//     type: String,
//   },
//   shiporderId: { 
//     type: String, 
//   },
//   orderDate: {
//     type: Date,
//     default: Date.now
//   },
//   customerId: {
//     type: String,
//     required: true
//   },
//   customerDetails: {
//     shippingAddress: {
//       fullName: String,
//       email: String,
//       phoneNumber: String,
//       addressLine1: String,
//       addressLine2: String,
//       city: String,
//       area: String, // Added area field
//       state: String,
//       pinCode: String,
//       country: String
//     },
//     billingAddress: {
//       fullName: String,
//       email: String,
//       phoneNumber: String,
//       addressLine1: String,
//       addressLine2: String,
//       city: String,
//       state: String,
//       pinCode: String,
//       country: String
//     }
//   },
//   products: [{
//     productId: {
//       type: String,
//       required: true
//     },
//     sizeId: {
//       type: String,
//       required: true
//     },
//     productName: {
//       type: String,
//       required: true
//     },
//     price: {
//       type: Number,
//       required: true
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 1
//     },
//     size: String,
//     image: String,
//     weight: Number // Added weight field
//   }],
//   shipping: { // Added shipping object
//     courier: String,
//     weight: Number,
//     cost: Number,
//     estimatedDays: Number
//   },
//   paymentDetails: {
//     productPrice: {
//       type: Number,
//       required: true
//     },
//     shippingCost: { // Added shippingCost field
//       type: Number,
//       default: 0
//     },
//     totalAmount: {
//       type: Number,
//       required: true
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'completed', 'failed', 'refunded'],
//       default: 'pending'
//     },
//     paymentId: {
//       type: String,
//       required: true
//     },
//     paymentSignature: {
//       type: String,
//       required: true
//     },
//     gstNumber: {
//       type: String,
//       default: null
//     }
//   },
//   orderStatus: {
//     type: String,
//     enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
//     default: 'pending'
//   },
//   deliveryStatus: { 
//     type: String, 
//     default: "pending" 
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true
// });

// // Keep only essential indexes
// orderSchema.index({ customerId: 1, createdAt: -1 });

// // Pre-save middleware to update timestamps
// orderSchema.pre('save', function (next) {
//   this.updatedAt = new Date();
//   next();
// });

// // Useful virtual for total items
// orderSchema.virtual('totalItems').get(function () {
//   return this.products.reduce((sum, product) => sum + product.quantity, 0);
// });

// const Order = mongoose.model('Order', orderSchema);

// app.post('/api/orders/create', async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const {
//       orderId,
//       orderDate,
//       customerId,
//       customerDetails,
//       products,
//       shipping, // Added shipping
//       paymentDetails,
//       orderStatus
//     } = req.body;

//     console.log('Starting order creation with products:', JSON.stringify(products, null, 2));

//     // Create new order in database
//     const newOrder = new Order({
//       orderId,
//       orderDate,
//       customerId,
//       customerDetails: {
//         shippingAddress: customerDetails.shippingAddress,
//         billingAddress: customerDetails.billingAddress
//       },
//       products: products.map(product => ({
//         productId: product.productId,
//         sizeId: product.sizeId,
//         productName: product.productName,
//         price: product.price,
//         quantity: product.quantity,
//         size: product.size,
//         image: product.image,
//         weight: product.weight || 0 // Add weight
//       })),
//       shipping: { // Add shipping object
//         courier: shipping?.courier || '',
//         weight: shipping?.weight || 0,
//         cost: shipping?.cost || 0,
//         estimatedDays: shipping?.estimatedDays || 0
//       },
//       paymentDetails: {
//         productPrice: paymentDetails.productPrice,
//         shippingCost: paymentDetails.shippingCost || 0, // Add shippingCost
//         totalAmount: paymentDetails.totalAmount,
//         status: paymentDetails.status,
//         paymentId: paymentDetails.paymentId,
//         paymentSignature: paymentDetails.paymentSignature,
//         gstNumber: paymentDetails.gstNumber,
//       },
//       orderStatus,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     });

//     // Save the order with session
//     const savedOrder = await newOrder.save({ session });
//     console.log('Order saved successfully:', savedOrder.orderId);

//     // Update product quantities
//     console.log('Starting quantity updates for products...');

//     for (const product of products) {
//       console.log(`Processing product: ${product.productId}, size: ${product.sizeId}, quantity: ${product.quantity}`);

//       const productDoc = await Product.findOne({
//         productId: product.productId
//       }).session(session);
      
//       console.log("findproducts", productDoc);
      
//       if (!productDoc) {
//         console.error(`Product not found: ${product.productId}`);
//         throw new Error(`Product not found: ${product.productId}`);
//       }

//       const aromaContainingSize = productDoc.aromas?.find(aroma =>
//         aroma.sizes?.some(size => size.sizeId === product.sizeId)
//       );

//       const sizeIndex = aromaContainingSize
//         ? aromaContainingSize.sizes.findIndex(s => s.sizeId === product.sizeId)
//         : -1;
        
//       if (sizeIndex === -1) {
//         console.error(`Size not found for product: ${product.productId}, size: ${product.sizeId}`);
//         console.log('Available sizes:', JSON.stringify(aromaContainingSize?.sizes, null, 2));
//         throw new Error(`Size ${product.sizeId} not found for product ${product.productId}`);
//       }

//       const currentQuantity = aromaContainingSize.sizes[sizeIndex].quantity;
//       const newQuantity = currentQuantity - product.quantity;

//       console.log(`Updating quantity for product ${product.productId}:`);
//       console.log(`- Current quantity: ${currentQuantity}`);
//       console.log(`- Reducing by: ${product.quantity}`);
//       console.log(`- New quantity will be: ${newQuantity}`);

//       if (newQuantity < 0) {
//         throw new Error(
//           `Insufficient quantity for product ${product.productName} size ${product.size}. ` +
//           `Available: ${currentQuantity}, Requested: ${product.quantity}`
//         );
//       }

//       aromaContainingSize.sizes[sizeIndex].quantity = newQuantity;
//       await productDoc.save({ session });
//       console.log(`Successfully updated quantity for product ${product.productId}`);
//     }

//     // Commit the transaction
//     await session.commitTransaction();
//     console.log('Transaction committed successfully');

//     // Send email confirmation
//     const customerEmail = savedOrder.customerDetails.billingAddress.email;
//     if (customerEmail) {
//       try {
//         await sendOrderConfirmationEmail(savedOrder, customerEmail);
//         console.log('Email sent successfully');
//       } catch (emailError) {
//         console.error('Email sending failed, but order was created:', emailError);
//         // Don't throw error - order is already saved
//       }
//     }

//     res.status(201).json({
//       success: true,
//       orderId: savedOrder.orderId,
//       order: savedOrder, // Return full order object
//       message: 'Order created successfully'
//     });

//   } catch (error) {
//     console.error('=== Order Creation Failed ===');
//     console.error('Error message:', error.message);
//     console.error('Error stack:', error.stack);

//     await session.abortTransaction();
//     console.log('Transaction rolled back due to error');

//     res.status(500).json({
//       success: false,
//       message: 'Failed to create order',
//       error: error.message
//     });

//   } finally {
//     await session.endSession();
//     console.log('Session ended');
//   }
// });

// async function sendOrderConfirmationEmail(order, customerEmail) {
//   // Create a transporter for sending the email
//   // Fetch product details for each ordered item
//   console.log("mailorder:",order)
//   const products = await Promise.all(
//     order.products.map(async (item) => {
//       const product = await Product.findOne({productId:item.productId});


//       return {
//         name: product.productName,

//         quantity: item.quantity,
//         price: item.price,
//         // image: `http://localhost:5000/uploads/${product.images[0].fileName}`,
//         image: `https://terraclenz.com/uploads/${product.image}`,
//       };
//     })
//   );

//   // Email content
//   // Calculate the total price for each item (Price + Refundable Price) and total refundable amount
//   let totalAmount = 0;

//   let orderTotal = 0; // Total for all products in the order


//   // Check delivery type and add delivery charge accordingly

  

  
//   products.forEach((item) => {
//     const productTotal = (item.price ) * item.quantity; // Correct total for each product
//     orderTotal += productTotal; // Add to the overall order total
//     totalAmount += item.price * item.quantity; // Total without refundable price
//   });




//   const mailOptions = {
//     from: '',
//     to: customerEmail,
//     subject: `Order Confirmation - ${order.orderId}`,
//     html: `
//       <table width="60%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: none;">
//         <tr>
//           <td style="background-color:rgb(29, 78, 37); padding: 20px;">
//             <h1 style="color:rgb(255, 255, 255); margin: 0;">Thank you for your order, ${order.customerDetails.billingAddress.fullName}!</h1>
//           </td>
//         </tr>

//         <p>Hello ${order.customerDetails.billingAddress.fullName} ,</p>
//         <p>Thank you for booking with us. For any query WhatsApp us on  7022519222.</p>



//         <tr>
//           <td style="padding: 20px;">
//             <p>Your order has been successfully placed with the following details:</p>
//             <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #0D3B66;">
//               <tr style="background-color: #0D3B66; color: white;">
//                 <th style="padding: 10px; text-align: left;">Order ID</th>
//                 <th style="padding: 10px; text-align: left;">Order Date</th>
//                 <th style="padding: 10px; text-align: left;">Payment Status</th>

//               </tr>
//               <tr>
//                 <td style="padding: 10px; border-bottom: 1px solid #0D3B66;">${order.orderId}</td>
//                 <td style="padding: 10px; border-bottom: 1px solid #0D3B66;">${new Date(order.orderDate).toLocaleDateString()}</td>
//                 <td style="padding: 10px; border-bottom: 1px solid #0D3B66;">${order.paymentDetails.status}</td>


                
//               </tr>
//             </table>
//             <h2 style="color: #0D3B66;">Ordered Products:</h2>
//             <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #0D3B66;">
//               <tr style="background-color: #0D3B66; color: white;">
//                 <th style="padding: 10px; text-align: left;">Image</th>
//                 <th style="padding: 10px; text-align: left;">Product</th>
                
//                 <th style="padding: 10px; text-align: right;">Quantity</th>
//                 <th style="padding: 10px; text-align: right;">Price</th>
//               </tr>
//               ${products
//                 .map(
//                   (item) => `
//                     <tr>
//                       <td style="padding: 10px; border-bottom: 1px solid #0D3B66;"><img src="${item.image}" alt="${item.name}" style="max-width: 100px;"></td>
//                       <td style="padding: 10px; border-bottom: 1px solid #0D3B66;">${item.name}</td>
                     
//                       <td style="padding: 10px; border-bottom: 1px solid #0D3B66; text-align: right;">${item.quantity}</td>
//                       <td style="padding: 10px; border-bottom: 1px solid #0D3B66; text-align: right;">₹${item.price} <br> <span style="font-size: 12px;">(Refundable) ₹${item.refundablePrice}</span></td>
//                     </tr>
//                   `)
//                 .join('')}





                
//             </table>
            
//             <h2 style="color: #0D3B66;">Order Summary:</h2>
//             <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #0D3B66;">
//               <tr style="background-color: #0D3B66; color: white;">
//                 <th style="padding: 10px; text-align: left;">Product</th>
//                 <th style="padding: 10px; text-align: right;">Price</th>
            
//                 <th style="padding: 10px; text-align: right;">Total</th>
//               </tr>
             
//                 ${products
//                   .map(
//                     (item) => `
//                       <tr>
//                         <td style="padding: 10px; border-bottom: 1px solid #0D3B66;">${item.productName}</td>
//                         <td style="padding: 10px; border-bottom: 1px solid #0D3B66; text-align: right;">₹${item.price}</td>

//                         <td style="padding: 10px; border-bottom: 1px solid #0D3B66; text-align: right;">₹${item.price  * item.quantity}</td>
//                       </tr>
//                     `)
//                   .join('')}
               
                
//                 <tr>
//                   <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total Amount:</td>
//                   <td style="padding: 10px; text-align: right; font-weight: bold;">₹${orderTotal}</td>
//                 </tr>
                
//             </table>
//             <p>We will notify you once your order is dispatched.</p>
//             <p>Thank you for shopping with us!</p>
//           </td>
//         </tr>
//       </table>
//     `,
//   };

//   // Send the email
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Order confirmation email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }

// app.get("/api/orders/:orderId", async (req, res) => {
//   try {
//     const order = await Order.findOne({ orderId: req.params.orderId });
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching order", error });
//   }
// });
// app.get('/api/order/:id', async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     console.log(orderId)

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     res.json(order);
//     console.log("order", order)
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require('multer');
const fs = require('fs').promises
const app = express();
const https = require('https')
const jwt = require('jsonwebtoken')
const Razorpay = require("razorpay");
const util = require('util');
const unlink = util.promisify(fs.unlink);
const port = process.env.PORT || 8081;
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(express.json()); // To parse JSON request body
// MongoDB Connection
mongoose
  .connect('mongodb+srv://root:1234@cluster0.ofeco44.mongodb.net/Ecomm')
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const SHIPROCKET_BASE_URL = 'https://apiv2.shiprocket.in/v1/external';
const EMAIL = 'business@terrainternational.in'; // Replace with your Shiprocket email
const PASSWORD = 'Terra@2024';       // Replace with your Shiprocket password
// const FLASK_URL = 'https://terrabot.onrender.com/api/chat';
const FLASK_URL = 'https://api.etpl.ai/api/chat';
// const FLASK_URL = 'https://6e65-34-16-186-74.ngrok-free.app/api/chat';
// const FLASK_URL = 'https://friendly-enigma-7v5xr5v49767cpp5g-5000.app.github.dev/api/chat';
let stoken = null;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

const authenticate = async () => {
  try {
    const response = await axios.post(`${SHIPROCKET_BASE_URL}/auth/login`, {
      email: EMAIL,
      password: PASSWORD,
    });
    stoken = response.data.token;
    console.log('Authentication successful', response);
  } catch (error) {
    console.error('Authentication failed:', error.response.data);
  }
};

app.post('/api/shipping-rates', async (req, res) => {
  const { pickup_postcode, delivery_postcode, weight, cod } = req.body;

  if (!pickup_postcode || !delivery_postcode || !weight) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Ensure we have a valid token before making API calls
  if (!stoken) {
    await authenticate(); // Re-authenticate if the token is missing
  }

  try {
    const response = await axios.get(
      `${SHIPROCKET_BASE_URL}/courier/serviceability/`,
      {
        params: { pickup_postcode, delivery_postcode, cod, weight },
        headers: { Authorization: `Bearer ${stoken}` },
      }
    );

    console.log('Shiprocket API Response:', response.data);

    // Ensure the API response has the expected structure
    if (!response.data || !response.data.data || !response.data.data.available_courier_companies) {
      return res.status(500).json({ error: 'Invalid response format from Shiprocket API.' });
    }

    // Filter out all courier names containing "India Post"
    const filteredCouriers = response.data.data.available_courier_companies.filter(
      courier => !courier.courier_name.toLowerCase().includes("air")
    );

    // Send filtered response
    res.json({ data: { available_courier_companies: filteredCouriers } });
  } catch (error) {
    console.error('Error fetching shipping rates:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch shipping rates from Shiprocket API.' });
  }
});


app.post('/api/shiprocket/place-order', async (req, res) => {
  try {
    const orderDetails = req.body; // Get order details from request
    console.log("input",orderDetails)
    if (!stoken) {
      await authenticate(); // Re-authenticate if the token is missing
    }
    const response = await axios.post(
      `${SHIPROCKET_BASE_URL}/orders/create/adhoc`,
      orderDetails,
      {
        headers: { Authorization: `Bearer ${stoken}` },
      }
    );
    res.json(response.data);
    console.log("shiporder",response.data)
    const { order_id, shipment_id } = response.data;
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderDetails.order_id }, // Find by orderId
      {
        shiporderId: order_id.toString(),
        ShipmentId: shipment_id.toString()
      },
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found in database' });
    }
    const awbresponse = await axios.post(
      `${SHIPROCKET_BASE_URL}/courier/assign/awb`,
      {
        "shipment_id": shipment_id,
        "courier_id": orderDetails.courier_id
      },
      {
        headers: { Authorization: `Bearer ${stoken}` }
      }
    );
    console.log("awb",awbresponse)
  } catch (error) {
    console.error('Error placing order:', error.response.data);
    res.status(500).json(error.response.data);
  }
});

// app.get('/api/tracking/:trackingId', async (req, res) => {
//   try {
//     const trackingId = req.params.trackingId;
//     if (!stoken) {
//       await authenticate(); // Re-authenticate if the token is missing
//     }
//     const response = await axios.get(
//       `${SHIPROCKET_BASE_URL}/courier/track/shipment/${trackingId}`,
//       {
//         headers: { Authorization: `Bearer ${stoken}` },
//       }
//     );
//     res.json(response.data);
  
//   } catch (error) {
//     console.error('Error tracking order:', error.response.data);
//     res.status(500).json(error.response.data);
//   }
// });



app.get('/api/tracking/:trackingId', async (req, res) => {
  try {
    const trackingId = req.params.trackingId;
    
    if (!stoken) {
      await authenticate(); // Re-authenticate if the token is missing
    }

    // Fetch tracking details from Shiprocket
    const response = await axios.get(
      `${SHIPROCKET_BASE_URL}/courier/track/shipment/${trackingId}`,
      {
        headers: { Authorization: `Bearer ${stoken}` },
      }
    );

    // Extract current_status from the response
    const currentStatus = response.data?.tracking_data?.shipment_track?.[0]?.current_status;

    if (!currentStatus) {
      return res.status(404).json({ message: "Tracking status not found" });
    }

    // Update the order's deliveryStatus in the database
    const updatedOrder = await Order.findOneAndUpdate(
      { ShipmentId: trackingId }, 
      { deliveryStatus: currentStatus, updatedAt: new Date() }, 
      { new: true } // Returns the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return both tracking details and the updated order
    res.json(response.data);

  } catch (error) {
    console.error('Error tracking order:', error?.response?.data || error.message);
    res.status(500).json({ error: error?.response?.data || "Internal Server Error" });
  }
});


const categorySchema = new mongoose.Schema({
  categoryId: { type: Number, required: true, unique: true },
  categoryName: { type: String, required: true },
  categoryCode: { type: String, required: true },
 categoryImage: { type: String }, 
  Products: [
    {
      productName: { type: String, required: true },
      productCode: { type: String, required: true },
    },
  ],

});


const Category = mongoose.model('Category', categorySchema);
const getNextCategoryId = async () => {
  const lastCategory = await Category.findOne().sort({ categoryId: -1 });
  return lastCategory ? lastCategory.categoryId + 1 : 1;
};

// Helper to get next category ID
app.get('/api/next-category-id', async (req, res) => {
  try {
    const nextCategoryId = await getNextCategoryId();
    res.status(200).json({ categoryId: nextCategoryId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch next category ID', details: error.message });
  }
});


// Route to add a category
// app.post('/api/add-category', async (req, res) => {
//   try {
//     const { categoryName, categoryCode } = req.body;

//     if (!categoryName) {
//       return res.status(400).json({ error: 'Category name is required' });
//     }

//     const categoryId = await getNextCategoryId();
//     const newCategory = new Category({ categoryId, categoryName, categoryCode });
//     await newCategory.save();

//     res.status(201).json({ message: 'Category saved successfully', categoryId });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to save category', details: error.message });
//   }
// });

app.post('/api/add-category', upload.single("categoryImage"), async (req, res) => {
  try {
    const { categoryName, categoryCode } = req.body;

    if (!categoryName || !categoryCode) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const categoryId = await getNextCategoryId();

    const newCategory = new Category({
      categoryId,
      categoryName,
      categoryCode,
      categoryImage: req.file ? req.file.path : null, // <--- Save image path
    });

    await newCategory.save();

    res.status(201).json({ 
      message: 'Category saved successfully', 
      categoryId,
      imagePath: newCategory.categoryImage 
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to save category', details: error.message });
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({}, 'categoryId categoryName categoryCode'); // Fetch only necessary fields
    res.status(200).json(categories);
    console.log("cat", categories)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});
app.post('/api/add-productname', async (req, res) => {
  const { categoryId, productName, productCode } = req.body;
  console.log("ho", req.body)

  try {
    const category = await Category.findOne({ categoryId });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.Products.push({ productName, productCode });
    await category.save();

    res.status(200).json({ message: 'Subcategory added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding subcategory' });
  }
});

app.get('/api/products/:categoryId', async (req, res) => {
  try {
    const category = await Category.findOne({ categoryId: req.params.categoryId });

    if (category && category.Products) {
      res.status(200).json(category.Products);
      console.log("hi", category.Products)// Send the subcategories array
    } else {
      res.status(404).json({ message: 'No subcategories found' });
    }
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// // Define Product Rating Schema and Model
// const productSchema = new mongoose.Schema({

//   productId: { type: String }, // Unique product identifier
//   ratings: { type: [Number], default: [] }, // Array of ratings (1-5 stars)
//   reviews: [{ // Array of reviews
//     review: { type: String, required: true }, // Review content
//     rating: { type: Number, required: true }, // Rating score (1-5)
//     name: { type: String , },
//     email: { type: String , },
//     createdAt: { type: Date, default: Date.now }
//   }],
//   categoryId: { type: Number, required: true }, // References the category ID
//   // References the subcategory ID
//   Aroma: { type: String, required: true }, // Product name
//   caption: { type: String }, // Product caption
//   description: { type: String }, // Product description
//   uses: { type: String }, // Users for the product
//   productName: { type: String, required: true },
//   productCode: { type: String, required: true },
//   categoryCode: { type: String, required: true },
//   categoryName: { type: String, required: true },
//   // uses: { type: String, required: true },
//   sizes: [
//     {
//       size: { type: String, required: true }, // Size name

//       quantity: { type: Number, required: true }, // Quantity for the size
//       price: { type: Number, required: true }, // Price for the size
//       offer: { type: Number, default: 0 }, // Offer percentage for the size
//       sellingPrice: {
//         type: Number,
//         required: true,
//         default: function () {
//           return this.price - (this.price * (this.offerPercentage / 100));
//         },

//       }, // Calculated selling price
//       sizeId: { type: String, },
//     },
//   ],
//   images: [{ type: String }], // Array of image URLs or paths
// }, { timestamps: true });

// productSchema.pre('save', async function (next) {
//   const product = this;
//   const words = product.Aroma.split(' ');
//   let aromaLetters;
//   if (words.length === 1) {
//     // For single word, take first and last letter
//     const word = words[0];
//     aromaLetters = word.charAt(0).toUpperCase() + word.charAt(word.length - 1).toUpperCase();
//   } else {
//     // For multiple words, take first letter of each word
//     aromaLetters = words.map(word => word.charAt(0).toUpperCase()).join('');
//   }

//   // Generate productId (e.g., combining categoryId, subcategoryId, and timestamp)
//   const timestamp = Date.now().toString(); // Use timestamp for uniqueness

//   const productId = `${product.categoryCode.toUpperCase()}-${product.productCode.toUpperCase()}-${aromaLetters}`;

//   product.productId = productId;

//   // Assign the generated productId to the product
//   if (product.sizes && product.sizes.length > 0) {
//     product.sizes.forEach(sizeObj => {
//       // Convert size to uppercase and remove spaces for consistent IDs
//       const formattedSize = sizeObj.size.toUpperCase().replace(/\s+/g, '');
//       sizeObj.sizeId = `${productId}-${formattedSize}`;
//     });
//   }

//   // Continue with the save operation
//   next();
// });


const productSchema = new mongoose.Schema({
  productId: { type: String }, // Unique product identifier
  ratings: { type: [Number], default: [] }, // Array of ratings (1-5 stars)
  reviews: [{
    review: { type: String, required: true },
    rating: { type: Number, required: true },
    name: { type: String },
    email: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  categoryId: { type: Number, required: true },
  aromas: [{
    name: String,
    images: [String], // Array of image filenames
    sizes: [{
      size: { type: String, required: true },
      unit: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      offer: { type: Number, default: 0 },
      sellingPrice: {
        type: Number,
        required: true,
        default: function () {
          return this.price - (this.price * (this.offer / 100));
        }
      },
      sizeId: { type: String }
    }]
  }],
  caption: { type: String },
  description: { type: String },
  uses: { type: String },
   keyFeatures: { type: String },
  ingredients: { type: String },
  howToUse: { type: String },
  customerReviews: { type: String },
  productName: { type: String, required: true },
  productCode: { type: String, required: true },
  categoryCode: { type: String, required: true },
  categoryName: { type: String, required: true },
   
}, { timestamps: true });

productSchema.pre('save', async function (next) {
  const product = this;

  // Generate base productId
  const productId = `${product.categoryCode.toUpperCase()}-${product.productCode.toUpperCase()}`;

  // Set the base productId
  product.productId = productId;

  // Process each aroma and its sizes
  if (product.aromas && product.aromas.length > 0) {
    product.aromas.forEach(aroma => {
      // Generate aroma letters for the sizeId
      const words = aroma.name.split(' ');
      let aromaLetters;

      if (words.length === 1) {
        // For single word, take first and last letter
        const word = words[0];
        aromaLetters = word.charAt(0).toUpperCase() + word.charAt(word.length - 1).toUpperCase();
      } else {
        // For multiple words, take first letter of each word
        aromaLetters = words.map(word => word.charAt(0).toUpperCase()).join('');
      }

      // Generate sizeIds for each size in this aroma
      if (aroma.sizes && aroma.sizes.length > 0) {
        aroma.sizes.forEach(sizeObj => {
          // Combine size and unit for the sizeId
          const formattedSize = `${sizeObj.size}${sizeObj.unit}`.toUpperCase().replace(/\s+/g, '');
          sizeObj.sizeId = `${productId}-${aromaLetters}-${formattedSize}`;
        });
      }
    });
  }

  next();
});



const Product = mongoose.model("Productsforterra", productSchema);



// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       const uploadPath = path.join(__dirname, './uploads'); // Folder for uploads
//       cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//       const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//       const ext = path.extname(file.originalname);
//       cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   }
// });




// Helper function to clean up uploaded files
const cleanupFiles = async (files) => {
  if (!files) return;

  const filesToDelete = Array.isArray(files) ? files : Object.values(files).flat();
  for (const file of filesToDelete) {
    try {
      await fs.unlink(file.path);
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  }
};

app.post('/api/add-product', upload.fields([
  { name: 'aromaImages', maxCount: 50 },
  { name: 'images', maxCount: 10 }
]), async (req, res) => {
  try {
    console.log('Received form data:', req.body);
    console.log('Received files:', req.files);

    const aromasMetadata = JSON.parse(req.body.aromasMetadata || '[]');

    const aromaImages = req.files.aromaImages || [];
    const mainImages = req.files.images || [];

    let currentImageIndex = 0;
    const aromas = aromasMetadata.map(aroma => {
      const aromaImageCount = aroma.imageCount;
      const aromaImageFiles = aromaImages.slice(currentImageIndex, currentImageIndex + aromaImageCount);
      currentImageIndex += aromaImageCount;

      return {
        name: aroma.name,
        images: aromaImageFiles.map(file => `/uploads/${file.filename}`),
        sizes: aroma.sizes
      };
    });

    // ✅ Create the product document with NEW FIELDS
    const product = new Product({
      productName: req.body.productName,
      productCode: req.body.productCode,
      categoryId: req.body.categoryId,
      categoryName: req.body.categoryName,
      categoryCode: req.body.categoryCode,
      caption: req.body.caption,
      description: req.body.description,
      uses: req.body.uses,
      aromas: aromas,
      mainImages: mainImages.map(file => `/uploads/${file.filename}`),

      // ✅ Add these lines
      keyFeatures: req.body.keyFeatures,
      ingredients: req.body.ingredients,
      howToUse: req.body.howToUse,
      customerReviews: req.body.customerReviews ? JSON.parse(req.body.customerReviews) : []
    });

    await product.save();

    res.json({
      message: 'Product added successfully',
      productId: product._id
    });
  } catch (error) {
    // Cleanup uploaded files on error
    if (req.files) {
      Object.values(req.files).flat().forEach(file => {
        fs.unlink(file.path, err => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    }

    console.error('Error saving product:', error);
    res.status(500).json({
      error: 'Failed to save product',
      details: error.message
    });
  }
});














// Multer instance
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, './uploads'); // Folder for uploads
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     // Get the product name from the request body
//     const productName = req.body.name || 'product'; // Fallback to 'product' if name is not provided
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//     const ext = path.extname(file.originalname);
//     // Use the product name in the filename (sanitize name to avoid invalid characters)
//     const sanitizedProductName = productName.replace(/[^a-zA-Z0-9]/g, '_');
//     cb(null, `${sanitizedProductName}-${uniqueSuffix}${ext}`);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
//   fileFilter: (req, file, cb) => {
//     const allowedExtensions = /jpeg|jpg|png|gif/;
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (allowedExtensions.test(ext)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only images are allowed!'));
//     }
//   }
// });
// const uploadDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.post('/api/add-product', upload.array('images', 5), async (req, res) => {
//   try {
//     const { categoryId, subcategoryId, categoryCode, categoryName, productCode, productName, Aroma, caption, description, uses, sizes } = req.body;
//     console.log("products", req.body)
//     let aromaArray = [];
//     if (Aroma) {
//       if (typeof Aroma === 'string') {
//         try {
//           // Try parsing as JSON
//           const parsed = JSON.parse(Aroma);
//           aromaArray = Array.isArray(parsed) ? parsed : [Aroma];
//         } catch (e) {
//           // If not valid JSON, check if comma-separated
//           aromaArray = Aroma.includes(',') ? 
//             Aroma.split(',').map(item => item.trim()) : 
//             [Aroma];
//         }
//       } else if (Array.isArray(Aroma)) {
//         // Already an array
//         aromaArray = Aroma;
//       }
//     }

//     // Parse sizes
//     let parsedSizes = [];
//     try {
//       parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
//     } catch (e) {
//       console.error('Error parsing sizes:', e);
//     }



//     // Save image paths
//     const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

//     const newProduct = new Product({
//       categoryId,
//       subcategoryId,
//       Aroma: aromaArray,
//       categoryCode, categoryName,
//       productCode, productName,
//       caption,
//       description,
//       uses,
//       sizes: JSON.parse(sizes), // Parse sizes if sent as a JSON string
//       images: imagePaths
//     });

//     await newProduct.save();
//     res.status(201).json({ message: 'Product added successfully!', product: newProduct });
//   } catch (error) {
//     console.error('Error adding product:', error);
//     res.status(500).json({ message: 'Failed to add product', error });
//   }
// });

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Middleware
const SECRET_KEY = "your_secret_key";
//for email
app.post("/api/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { mob_number: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    else if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    else {

      const token = jwt.sign(
        {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          id: user._id,
          phoneNumber: user.mob_number,
          role: user.role
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login successful", token: token });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  mob_number: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' },
   profileImage: String, // <-- Add this
  
});

const User = mongoose.model("User", userSchema);
app.post('/api/profile', async (req, res) => {
  try {
    const { firstname, lastname, mob_number, email, password, dob } = req.body;
    const newUser = new User({ firstname, lastname, mob_number, email, password, dob });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

app.put("/api/profile/:phone", async (req, res) => {
  const { phone } = req.params;
  const { firstname, lastname, email, dob, password } = req.body;

  try {
    const user = await User.findOne({ mob_number: phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.dob = dob;
    user.password = password;

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});
app.get("/api/profile", async (req, res) => {
  const { phone } = req.query;

  try {
    const user = await User.findOne({ mob_number: phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
});

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profile');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}-${file.fieldname}.${ext}`);
  }
});

const profileUpload = multer({ storage: profileStorage });

app.post('/api/profile/upload/:phone', profileUpload.single('profileImage'), async (req, res) => {
  try {
    const { phone } = req.params;
    const user = await User.findOne({ mob_number: phone });

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profileImage = req.file.filename;
    await user.save();

    res.status(200).json({
      message: 'Profile image uploaded',
      imageUrl: `/uploads/profile/${user.profileImage}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading profile image' });
  }
});

// DELETE profile image
app.delete("/api/profile/image/:phone", async (req, res) => {
  const { phone } = req.params;

  try {
    const user = await User.findOne({ mob_number: phone });
    if (!user || !user.profileImage) {
      return res.status(404).json({ message: "Profile image not found" });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, "uploads", "profile", user.profileImage);
    await fs.unlink(filePath).catch(err => {
      console.warn("File already deleted or not found:", err.message);
    });

    // Remove image from user record
    user.profileImage = undefined;
    await user.save();

    res.status(200).json({ message: "Profile image deleted" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete profile image" });
  }
});




// Update user profile


// const HARD_CODED_PHONE = "9876543210"; // Hardcoded phone number
// const HARD_CODED_OTP = "123456"; // Hardcoded OTP for testing
// const HARD_CODED_role = 'user'
// let sentOtp = null; // Store the OTP temporarily (simulating a real scenario)

// // Endpoint to send OTP
// app.post("/api/send-otp", (req, res) => {
//   const { phoneNumber } = req.body;

//   if (!phoneNumber) {
//     return res.status(400).json({ message: "Phone number is required." });
//   }

//   if (phoneNumber === HARD_CODED_PHONE) {
//     // Simulate sending OTP (store it temporarily)
//     sentOtp = HARD_CODED_OTP;
//     console.log(`OTP sent to ${phoneNumber}: ${HARD_CODED_OTP}`); // Simulate OTP sending
//     return res.status(200).json({ message: "OTP sent successfully." });
//   } else {
//     return res.status(404).json({ message: "Phone number not found." });
//   }
// });

// // Endpoint to verify OTP and login
// app.post("/api/verify-otp-login", (req, res) => {
//   const { phoneNumber, otp } = req.body;

//   if (!phoneNumber || !otp) {
//     return res.status(400).json({ message: "Phone number and OTP are required." });
//   }

//   if (phoneNumber === HARD_CODED_PHONE && otp === sentOtp) {
//     // Generate a JWT token
//     const token = jwt.sign(
//       {
//         phoneNumber: HARD_CODED_PHONE,
//         id: "user123", // Replace with a real user ID from the database in a real application
//         type: "otp",
//         role: HARD_CODED_role
//       },
//       SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     // Respond with success
//     return res.status(200).json({ message: "OTP login successful", token });
//   } else {
//     return res.status(401).json({ message: "Invalid OTP or phone number." });
//   }
// });

const otpStore = {};

// Send OTP
app.post("/api/send-otp", (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number required" });
  }

  const normalizedPhone = phoneNumber.replace(/\D/g, '');
  const formattedPhone = normalizedPhone.startsWith('91') ? normalizedPhone : `91${normalizedPhone}`;

  const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
  const sender = "Tclenz";

  const message = `Use ${otp} as your OTP to verify the transaction on Terra Clenz. This code is valid for 5 minutes and don't disclose -Excerpt Technologies Pvt Ltd`;

  const params = new URLSearchParams({
    apikey: "MzY2MzZhNDU2NzY0NGE2NjRhNTI1YTdhNDI2YTUyNjQ=",
    numbers: formattedPhone,
    sender: sender,
    message: message,
    template_id: "1107173754816873398"
  });

  const options = {
    hostname: "api.textlocal.in",
    path: `/send/?${params}`,
    method: "GET",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const request = https.request(options, response => {
    let data = '';

    response.on('data', chunk => data += chunk);
    response.on('end', () => {
      otpStore[normalizedPhone] = {
        otp: otp,
        phoneNumber: normalizedPhone, // Store phone number with OTP
        expiresAt: Date.now() + 300000 // 5 minutes
      };

      console.log('OTP Stored:', {
        phone: normalizedPhone,
        otp: otp
      });

      res.json({
        message: "OTP sent successfully",
        phoneNumber: normalizedPhone
      });
    });
  });

  request.on('error', error => {
    console.error('SMS API Error:', error);
    res.status(500).json({ error: "Failed to send OTP" });
  });

  request.end();
});

// Verify OTP and generate token with phone number
// app.post("/api/verify-otp", (req, res) => {
//   const { phoneNumber, otp } = req.body;

//   if (!phoneNumber || !otp) {
//     return res.status(400).json({ error: "Phone number and OTP are required" });
//   }

//   const normalizedPhone = phoneNumber.replace(/\D/g, '');
//   const storedData = otpStore[normalizedPhone];

//   if (!storedData) {
//     return res.status(401).json({ error: "No OTP found for this number" });
//   }

//   if (Date.now() > storedData.expiresAt) {
//     delete otpStore[normalizedPhone];
//     return res.status(401).json({ error: "OTP has expired" });
//   }

//   if (storedData.otp !== otp) {
//     return res.status(401).json({ error: "Invalid OTP" });
//   }

//   // OTP verified successfully - Generate token with phone number
//   const token = jwt.sign(
//     { 
//       phoneNumber: normalizedPhone,  // Store phone number in token
//       role: 'user',
//       type: 'otp',
//       isVerified: true
//     },
//     SECRET_KEY,
//     { expiresIn: '24h' }  // Token valid for 24 hours
//   );

//   // Clean up OTP store
//   delete otpStore[normalizedPhone];

//   // Return success with token
//   res.json({ 
//     message: "Phone number verified successfully",
//     phoneNumber: normalizedPhone,
//     token: token,
//     success: true
//   });
// });

app.post("/api/verify-otp", (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({
      error: "Phone number and OTP are required"
    });
  }

  const normalizedPhone = phoneNumber.replace(/\D/g, '');
  const storedData = otpStore[normalizedPhone];

  // Check if OTP data exists
  if (!storedData) {
    return res.status(401).json({
      error: "No OTP found for this number",
      canResend: true
    });
  }

  // Check if OTP has expired
  if (Date.now() > storedData.expiresAt) {
    // Delete the expired OTP
    delete otpStore[normalizedPhone];

    return res.status(401).json({
      error: "OTP has expired",
      canResend: true
    });
  }

  // Check if OTP is correct
  if (storedData.otp !== otp) {
    return res.status(401).json({
      error: "Invalid OTP"
    });
  }

  // Additional check: Ensure OTP is used within 5 minutes
  if (Date.now() > storedData.expiresAt) {
    // Delete the expired OTP
    delete otpStore[normalizedPhone];

    return res.status(401).json({
      error: "OTP verification time has passed",
      canResend: true
    });
  }

  // OTP verified successfully - Generate token with phone number
  const token = jwt.sign(
    {
      phoneNumber: normalizedPhone,
      role: 'user',
      type: 'otp',
      isVerified: true
    },
    SECRET_KEY,
    { expiresIn: '24h' }
  );

  // Clean up OTP store
  delete otpStore[normalizedPhone];

  // Return success with token
  res.json({
    message: "Phone number verified successfully",
    phoneNumber: normalizedPhone,
    token: token,
    success: true
  });
});

// Serve Static Files


// API Endpoints

// GET /api/product/ratings - Fetch average rating and total ratings


// Get product ratings
// app.get("/api/product/ratings", (req, res) => {
//   const productId = req.query.productId;

//   if (!productId || !productRatings[productId]) {
//     return res.status(404).json({ error: "Product not found" });
//   }

//   const { totalRatings, averageRating } = productRatings[productId];
//   res.json({ totalRatings, averageRating });
// });


// POST /api/product/rate - Submit a user rating
// app.post("/api/product/rate", (req, res) => {
//   const { productId, rating, review } = req.body;


// });
app.post("/api/product/rate", async (req, res) => {
  try {
    const { productId, rating, review, name, email, } = req.body;
    console.log(productId, rating, review, name, email,)
    // Validate request body
    if (!productId || !rating || !review || !name || !email) {
      return res.status(400).json({ message: "All fields are required: productId, rating, review, userId" });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Find the product by productId
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add the new rating and review
    product.ratings.push(rating);
    product.reviews.push({
      review,
      rating,
      name,
      email,
      createdAt: new Date(),
    });

    // Save the updated product
    await product.save();

    return res.status(200).json({ message: "Review and rating added successfully", product });
  } catch (error) {
    console.error("Error in /api/product/rate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});





app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'server Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/api/preview/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'server Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Create product


// Update product
// app.put('/api/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     Object.assign(product, req.body);
//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log('Deleting product with ID:', req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
const razorpay = new Razorpay({
  key_id: "rzp_live_D6CyBokqgdaa8c",
  key_secret: "45b1JA0OiI4aMC1WOMzMALM6",

});
// const razorpay = new Razorpay({
//   key_id: "rzp_test_qUmhUFElBiSNIs",
//   key_secret: "wsBV1ts8yJPld9JktATIdOiS",

// });
app.post("/api/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount, // Amount in paise
    currency: "INR",
    receipt: "receipt#1",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ order_id: order.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});



const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  ShipmentId: {
    type: String,
  },
  AWBcode: {
    type: String,
  },
  shiporderId: { type: String, },
  orderDate: {
    type: Date,
    default: Date.now
  },
  customerId: {
    type: String,
    required: true
  },
  customerDetails: {
    shippingAddress: {
      fullName: String,
      email: String,
      phoneNumber: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pinCode: String,
      country: String
    },
    billingAddress: {
      fullName: String,
      email: String,
      phoneNumber: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pinCode: String,
      country: String
    }
  },
  products: [{
    productId: {
      type: String,
      required: true
    },
    sizeId: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    size: String,
    image: String
  }],
  paymentDetails: {
  productPrice: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String,
    required: true
  },
  paymentSignature: {
    type: String,
    required: true
  },
  gstNumber: {
    type: String,
    default: null
  }
},

  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryStatus: { type: String, default: "pending" },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Keep only essential indexes
orderSchema.index({ customerId: 1, createdAt: -1 });

// Pre-save middleware to update timestamps
orderSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Useful virtual for total items
orderSchema.virtual('totalItems').get(function () {
  return this.products.reduce((sum, product) => sum + product.quantity, 0);
});



const Order = mongoose.model('Order', orderSchema);
// app.post('/api/orders/create', async (req, res) => {
//   try {
//     // Validate the Razorpay payment signature
//     const {
//       orderId,
//       orderDate,
//       customerId,
//       customerDetails,
//       products,
//       paymentDetails,
//       orderStatus
//     } = req.body;

//     // Create new order in database
//     const newOrder = new Order({
//       orderId,
//       orderDate,
//       customerId,
//       customerDetails: {
//         shippingAddress: customerDetails.shippingAddress,
//         billingAddress: customerDetails.billingAddress
//       },
//       products: products.map(product => ({
//         productId: product.productId,
//         sizeId: product.sizeId,
//         productName: product.productName,
//         price: product.price,
//         quantity: product.quantity,
//         size: product.size,
//         image: product.image
//       })),
//       paymentDetails: {
//         productPrice: paymentDetails.productPrice,
//         totalAmount: paymentDetails.totalAmount,
//         status: paymentDetails.status,
//         paymentId: paymentDetails.paymentId,
//         paymentSignature: paymentDetails.paymentSignature
//       },
//       orderStatus,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     });

//     const savedOrder = await newOrder.save();

//     // Send email confirmation
//     // await sendOrderConfirmationEmail(savedOrder);

//     res.status(201).json({
//       success: true,
//       orderId: savedOrder.orderId,
//       message: 'Order created successfully'
//     });

//   } catch (error) {
//     console.error('Order creation failed:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create order',
//       error: error.message
//     });
//   }
// });







app.post('/api/orders/create', async (req, res) => {
  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Extract order details from request body
    const {
      orderId,
      orderDate,
      customerId,
      customerDetails,
      products,
      paymentDetails,
      orderStatus
    } = req.body;

    console.log('Starting order creation with products:', JSON.stringify(products, null, 2));

    // Create new order in database
    const newOrder = new Order({
      orderId,
      orderDate,
      customerId,
      customerDetails: {
        shippingAddress: customerDetails.shippingAddress,
        billingAddress: customerDetails.billingAddress
      },
      products: products.map(product => ({
        productId: product.productId,
        sizeId: product.sizeId,
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        size: product.size,
        image: product.image
      })),
      paymentDetails: {
        productPrice: paymentDetails.productPrice,
        totalAmount: paymentDetails.totalAmount,
        status: paymentDetails.status,
        paymentId: paymentDetails.paymentId,
        paymentSignature: paymentDetails.paymentSignature,
        gstNumber:paymentDetails.gstNumber,
      },
      orderStatus,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Save the order with session
    const savedOrder = await newOrder.save({ session });
    console.log('Order saved successfully:', savedOrder.orderId);

    // Update product quantities
    console.log('Starting quantity updates for products...');

    for (const product of products) {
      console.log(`Processing product: ${product.productId}, size: ${product.sizeId}, quantity: ${product.quantity}`);

      // Find the product
      const productDoc = await Product.findOne({
        productId: product.productId
      }).session(session);
      console.log("findproducts", productDoc);
      if (!productDoc) {
        console.error(`Product not found: ${product.productId}`);
        throw new Error(`Product not found: ${product.productId}`);
      }

      // Find the size index
      // const sizeIndex = productDoc.sizes.findIndex(s => s.sizeId === product.sizeId);
      const aromaContainingSize = productDoc.aromas?.find(aroma =>
        aroma.sizes?.some(size => size.sizeId === product.sizeId)
      );

      // Find the size index within that aroma
      const sizeIndex = aromaContainingSize
        ? aromaContainingSize.sizes.findIndex(s => s.sizeId === product.sizeId)
        : -1;
      if (sizeIndex === -1) {
        console.error(`Size not found for product: ${product.productId}, size: ${product.sizeId}`);
        console.log('Available sizes:', JSON.stringify(productDoc.sizes, null, 2));
        throw new Error(`Size ${product.sizeId} not found for product ${product.productId}`);
      }

      // const currentQuantity = productDoc.sizes[sizeIndex].quantity;
      // const newQuantity = currentQuantity - product.quantity;

      // console.log(`Updating quantity for product ${product.productId}:`);
      // console.log(`- Current quantity: ${currentQuantity}`);
      // console.log(`- Reducing by: ${product.quantity}`);
      // console.log(`- New quantity will be: ${newQuantity}`);

      // if (newQuantity < 0) {
      //   throw new Error(
      //     `Insufficient quantity for product ${product.productName} size ${product.size}. ` +
      //     `Available: ${currentQuantity}, Requested: ${product.quantity}`
      //   );
      // }

      // // Update the quantity
      // productDoc.sizes[sizeIndex].quantity = newQuantity;

      // // Save the updated product
      // await productDoc.save({ session });
      // console.log(`Successfully updated quantity for product ${product.productId}`);
      if (sizeIndex === -1) {
        console.error(`Size not found for product: ${product.productId}, size: ${product.sizeId}`);
        console.log('Available sizes:', JSON.stringify(aromaContainingSize.sizes, null, 2));
        throw new Error(`Size ${product.sizeId} not found for product ${product.productId}`);
      }

      // Now you can update the quantity as before
      const currentQuantity = aromaContainingSize.sizes[sizeIndex].quantity;
      const newQuantity = currentQuantity - product.quantity;

      console.log(`Updating quantity for product ${product.productId}:`);
      console.log(`- Current quantity: ${currentQuantity}`);
      console.log(`- Reducing by: ${product.quantity}`);
      console.log(`- New quantity will be: ${newQuantity}`);

      if (newQuantity < 0) {
        throw new Error(
          `Insufficient quantity for product ${product.productName} size ${product.size}. ` +
          `Available: ${currentQuantity}, Requested: ${product.quantity}`
        );
      }

      // Update the quantity
      aromaContainingSize.sizes[sizeIndex].quantity = newQuantity;

      // Save the updated product
      await productDoc.save({ session });
      console.log(`Successfully updated quantity for product ${product.productId}`);
    }

    // Commit the transaction
    await session.commitTransaction();
    console.log('Transaction committed successfully');

    // Send email confirmation (commented out as in original code)
    // await sendOrderConfirmationEmail(savedOrder);
    const customerEmail = savedOrder.customerDetails.billingAddress.email;
    if (customerEmail) {
      await sendOrderConfirmationEmail(savedOrder, customerEmail);
    }
    res.status(201).json({
      success: true,
      orderId: savedOrder.orderId,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('=== Order Creation Failed ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    // Rollback the transaction
    await session.abortTransaction();
    console.log('Transaction rolled back due to error');

    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });

  } finally {
    // End the session
    await session.endSession();
    console.log('Session ended');
  }
});


async function sendOrderConfirmationEmail(order, customerEmail) {
  // Create a transporter for sending the email
  // Fetch product details for each ordered item
  console.log("mailorder:",order)
  const products = await Promise.all(
    order.products.map(async (item) => {
      const product = await Product.findOne({productId:item.productId});


      return {
        name: product.productName,

        quantity: item.quantity,
        price: item.price,
        // image: `http://localhost:5000/uploads/${product.images[0].fileName}`,
        image: `https://terraclenz.com/uploads/${product.image}`,
      };
    })
  );

  // Email content
  // Calculate the total price for each item (Price + Refundable Price) and total refundable amount
  let totalAmount = 0;

  let orderTotal = 0; // Total for all products in the order


  // Check delivery type and add delivery charge accordingly

  

  
  products.forEach((item) => {
    const productTotal = (item.price ) * item.quantity; // Correct total for each product
    orderTotal += productTotal; // Add to the overall order total
    totalAmount += item.price * item.quantity; // Total without refundable price
  });




  const mailOptions = {
    from: '',
    to: customerEmail,
    subject: `Order Confirmation - ${order.orderId}`,
    html: `
      <table width="60%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: none;">
        <tr>
          <td style="background-color:rgb(29, 78, 37); padding: 20px;">
            <h1 style="color:rgb(255, 255, 255); margin: 0;">Thank you for your order, ${order.customerDetails.billingAddress.fullName}!</h1>
          </td>
        </tr>

        <p>Hello ${order.customerDetails.billingAddress.fullName} ,</p>
        <p>Thank you for booking with us. For any query WhatsApp us on  7022519222.</p>



        <tr>
          <td style="padding: 20px;">
            <p>Your order has been successfully placed with the following details:</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #0D3B66;">
              <tr style="background-color: #0D3B66; color: white;">
                <th style="padding: 10px; text-align: left;">Order ID</th>
                <th style="padding: 10px; text-align: left;">Order Date</th>
                <th style="padding: 10px; text-align: left;">Payment Status</th>

              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #0D3B66;">${order.orderId}</td>
                <td style="padding: 10px; border-bottom: 1px solid #0D3B66;">${new Date(order.orderDate).toLocaleDateString()}</td>
                <td style="padding: 10px; border-bottom: 1px solid #0D3B66;">${order.paymentDetails.status}</td>


                
              </tr>
            </table>
            <h2 style="color: #0D3B66;">Ordered Products:</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #0D3B66;">
              <tr style="background-color: #0D3B66; color: white;">
                <th style="padding: 10px; text-align: left;">Image</th>
                <th style="padding: 10px; text-align: left;">Product</th>
                
                <th style="padding: 10px; text-align: right;">Quantity</th>
                <th style="padding: 10px; text-align: right;">Price</th>
              </tr>
              ${products
                .map(
                  (item) => `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #0D3B66;"><img src="${item.image}" alt="${item.name}" style="max-width: 100px;"></td>
                      <td style="padding: 10px; border-bottom: 1px solid #0D3B66;">${item.name}</td>
                     
                      <td style="padding: 10px; border-bottom: 1px solid #0D3B66; text-align: right;">${item.quantity}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #0D3B66; text-align: right;">₹${item.price} <br> <span style="font-size: 12px;">(Refundable) ₹${item.refundablePrice}</span></td>
                    </tr>
                  `)
                .join('')}





                
            </table>
            
            <h2 style="color: #0D3B66;">Order Summary:</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #0D3B66;">
              <tr style="background-color: #0D3B66; color: white;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: right;">Price</th>
            
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
             
                ${products
                  .map(
                    (item) => `
                      <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #0D3B66;">${item.productName}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #0D3B66; text-align: right;">₹${item.price}</td>

                        <td style="padding: 10px; border-bottom: 1px solid #0D3B66; text-align: right;">₹${item.price  * item.quantity}</td>
                      </tr>
                    `)
                  .join('')}
               
                
                <tr>
                  <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total Amount:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold;">₹${orderTotal}</td>
                </tr>
                
            </table>
            <p>We will notify you once your order is dispatched.</p>
            <p>Thank you for shopping with us!</p>
          </td>
        </tr>
      </table>
    `,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
});
app.get('/api/order/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(orderId)

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
    console.log("order", order)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

async function statusupdatemail(orderdata, cemail,current_status) {
  const { orderId, orderDate, deliveryStatus, customerDetails, products = [] } = orderdata;
  const customerName = customerDetails?.billingAddress?.fullName || "Customer";

  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findOne({ productId: item.productId });
      return {
        name: product?.productName || "Product",
        image: `https://terraclenz.com/uploads/${product?.image}`,
        quantity: item.quantity,
        price: item.price
      };
    })
  );

  const mailOptions = {
    from: '', // Add your verified sender email here
    to: cemail,
    subject: `Order Status Update - ${orderId}`,
    html: `
      <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <tr>
                <td style="background-color: #1d4e25; padding: 30px;">
                  <h1 style="color: #ffffff; margin: 0;">Hi ${customerName},</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px;">
                  <p style="font-size: 16px; color: #333;">We’re writing to let you know that the status of your order <strong>#${orderId}</strong> has been updated.</p>
                  <p style="font-size: 16px;"><strong>Current Status:</strong> <span style="color: #0D3B66; background-color: #d4edda; padding: 5px 10px; border-radius: 5px;">${current_status}</span></p>

                  <table width="100%" style="border-collapse: collapse; margin-top: 20px; border: 1px solid #0D3B66;">
                    <tr style="background-color: #0D3B66; color: white;">
                      <th style="padding: 12px; text-align: left;">Order ID</th>
                      <th style="padding: 12px; text-align: left;">Order Date</th>
                      <th style="padding: 12px; text-align: left;">Delivery Status</th>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                      <td style="padding: 12px; border-top: 1px solid #ddd;">${orderId}</td>
                      <td style="padding: 12px; border-top: 1px solid #ddd;">${new Date(orderDate).toLocaleDateString()}</td>
                      <td style="padding: 12px; border-top: 1px solid #ddd;">${current_status}</td>
                    </tr>
                  </table>

                  <h3 style="margin-top: 30px; color: #0D3B66;">Product Summary:</h3>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #0D3B66;">
                    <tr style="background-color: #0D3B66; color: white;">
                      <th style="padding: 12px; text-align: left;">Image</th>
                      <th style="padding: 12px; text-align: left;">Product</th>
                      <th style="padding: 12px; text-align: right;">Qty</th>
                      <th style="padding: 12px; text-align: right;">Price</th>
                    </tr>
                    ${productDetails.map(item => `
                      <tr style="background-color: #fdfdfd;">
                        <td style="padding: 12px; border-top: 1px solid #ddd;"><img src="${item.image}" style="max-width: 60px; border-radius: 5px;" /></td>
                        <td style="padding: 12px; border-top: 1px solid #ddd;">${item.name}</td>
                        <td style="padding: 12px; border-top: 1px solid #ddd; text-align: right;">${item.quantity}</td>
                        <td style="padding: 12px; border-top: 1px solid #ddd; text-align: right;">₹${item.price}</td>
                      </tr>
                    `).join('')}
                  </table>

                  <p style="margin-top: 25px; font-size: 15px; color: #444;">We will continue to update you as your order progresses.</p>
                  <p style="font-size: 15px;">If you have any questions, feel free to reach out to us on WhatsApp at <strong>7022519222</strong>.</p>

                  <div style="margin-top: 30px;">
                    <a href="https://wa.me/917022519222" target="_blank" style="background-color: #25D366; color: white; text-decoration: none; padding: 12px 20px; border-radius: 6px; display: inline-block; font-weight: bold;">Chat on WhatsApp</a>
                  </div>

                  <p style="margin-top: 40px; color: #555;">Thank you for choosing us!</p>
                  <p style="font-weight: bold;">— Team Terraclenz</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Status update email sent successfully');
  } catch (error) {
    console.error('❌ Error sending status update email:', error);
  }
}

app.post("/api/webhook", async (req, res) => {
  try {
      const { order_id, current_status } = req.body;

      // Update order status in MongoDB
      await Order.findOneAndUpdate(
          { orderId: order_id },
          { deliveryStatus: current_status },
          { new: true, upsert: true }
      );
 const orderdata = await Order.findOne({ orderId: order_id });
 const cemail = orderdata?.customerDetails?.billingAddress?.email;
 statusupdatemail(orderdata,cemail,current_status);

      res.status(200).json({ success: true, message: "Order updated" });
  } catch (error) {
      console.error("Webhook Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// app.put("/api/orders/:orderId/delivery-status", async (req, res) => {
//   const { deliveryStatus } = req.body;
//   try {
//     const updatedOrder = await Order.findOneAndUpdate(
//       { orderId: req.params.orderId },
//       { deliveryStatus, updatedAt: Date.now() },
//       { new: true }
//     );
//     if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating delivery status", error });
//   }
// });

// app.put("/api/orders/:orderId/delivery-status", async (req, res) => {
//   const { deliveryStatus } = req.body;
//   console.log("orderid1",req.params.orderId)
// console.log("del",deliveryStatus);
//   try {
//     // Fetch the order from your DB to get the Shiprocket order ID
//     const order = await Order.findOne({ orderId: req.params.orderId });
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     if (!stoken) {
//       await authenticate(); // Re-authenticate if the token is missing
//     }
//     // If status is "cancelled", cancel order in Shiprocket
//     if (deliveryStatus.toLowerCase() === "cancelled") {
//       const shiprocketOrderId = [order.shiporderId,order.ShipmentId]; // Ensure you have this ID stored in your DB

//       // Make API call to Shiprocket to cancel the order
//       const shiprocketResponse = await axios.post(
//         "https://apiv2.shiprocket.in/v1/external/orders/cancel",
//         { ids: shiprocketOrderId },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: ` Bearer ${stoken}`,
//           },
//         }
//       );
//       console.log(shiprocketResponse);
//       if (!shiprocketResponse.data || shiprocketResponse.data.status !== 200) {
//         console.log(shiprocketResponse.data.status);
//         return res.status(500).json({ message: "Failed to cancel order in Shiprocket" });
//       }
//     }
// console.log("orderid",req.params.orderId)
//     // Update order in DB after handling Shiprocket
//     const updatedOrder = await Order.findOneAndUpdate(
//       { orderId: req.params.orderId },
//       { deliveryStatus, updatedAt: Date.now() },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: "Error updating delivery status", error: error.message });
//   }
// });

app.put("/api/orders/:orderId/delivery-status", async (req, res) => {
  const { deliveryStatus } = req.body;
  console.log("Received Delivery Status:", deliveryStatus);

  try {
    // Fetch the order from the database
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure authentication token exists
    if (!stoken) {
      await authenticate(); // Authenticate if token is missing
      console.log("Authenticated, New Token:", stoken);
    }

    // If delivery status is "cancelled", cancel the order in Shiprocket first
    if (deliveryStatus.toLowerCase() === "cancelled") {
      const shiprocketOrderId = [order.shiporderId, order.ShipmentId];

      try {
        // Make API call to Shiprocket to cancel the order
        const shiprocketResponse = await axios.post(
          "https://apiv2.shiprocket.in/v1/external/orders/cancel",
          { ids: shiprocketOrderId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${stoken}`,
            },
          }
        );

        console.log("Shiprocket API Response:", shiprocketResponse.data);

        // Validate response from Shiprocket before updating DB
        if (!shiprocketResponse.data || shiprocketResponse.data.status_code !== 200) {
          return res.status(500).json({ message: "Failed to cancel order in Shiprocket" });
        }

      } catch (shiprocketError) {
        console.error("Error cancelling order in Shiprocket:", shiprocketError.response?.data || shiprocketError.message);
        return res.status(500).json({ message: "Shiprocket API call failed", error: shiprocketError.message });
      }
    }

    // Now update the order in the database
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { $set: { deliveryStatus, updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found after update attempt" });
    }

    console.log("Updated Order in DB:", updatedOrder);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating delivery status:", error);
    res.status(500).json({ message: "Error updating delivery status", error: error.message });
  }
});


app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});


const addressSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  email: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  pinCode: String,
  country: String,
});

const Address = mongoose.model("Address", addressSchema);
app.get("/api/profile", async (req, res) => {
  try {
    const user = await User.findOne(); // Assuming only one user exists for simplicity
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

// Get all addresses
app.get("/api/addresses", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses" });
  }
});

// Add a new address
app.post("/api/addresses", async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();
    res.json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
});
app.put("/api/addresses/:id", async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: "Error updating address" });
  }
});
// Assuming you're using Express for your backend

// DELETE endpoint to delete address by id
app.delete("/api/addresses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the address from the database
    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address", error);
    res.status(500).json({ message: "Failed to delete address" });
  }
});



const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your-jwt-secret');  // Replace with your JWT secret
    req.phoneNumber = decoded.phoneNumber; // Extract phone number from token
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get address by phone number from token
app.get('/api/address/:phoneNumber', async (req, res) => {
  try {
    const { phoneNumber } = req.params; // Get phone number from URL parameter

    // Fetch the address based on phone number
    const address = await Address.find({ phoneNumber });
    if (!address) {
      return res.status(404).json({ message: 'Address not found for this phone number' });
    }

    res.status(200).json(address); // Return the found address
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'API is working' });
});

// Orders route - Make sure this exact path matches your frontend request
app.get('/api/orders/:phoneNumber', async (req, res) => {
  const { phoneNumber } = req.params;
  console.log('Received request for orders with phone number:', phoneNumber);

  try {
    const orders = await Order.find({ customerId: phoneNumber });
    console.log('Found orders:', orders);

    if (!orders || orders.length === 0) {
      console.log('No orders found for phone number:', phoneNumber);
      return res.status(404).json({
        message: 'No orders found',
        searchedNumber: phoneNumber
      });
    }

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// app.get("/api/dashboard", async (req, res) => {
//   try {
//     // Fetch basic stats
//     const totalProducts = await Product.countDocuments();

//     // Fetch total inventory and check stock status for each product
//     const totalInventory = await Product.aggregate([
//       { $unwind: "$sizes" },
//       { $group: { _id: null, totalQuantity: { $sum: "$sizes.quantity" } } }
//     ]);
//     const totalInventoryCount = totalInventory.length ? totalInventory[0].totalQuantity : 0;

//     // Get count of In Stock and Out of Stock products
//     const stockStatus = await Product.aggregate([
//       { $unwind: "$sizes" },
//       {
//         $group: {
//           _id: "$productId",
//           totalQuantity: { $sum: "$sizes.quantity" },
//           isOutOfStock: { $sum: { $cond: [{ $eq: ["$sizes.quantity", 0] }, 1, 0] } }
//         }
//       },
//       { $project: { productId: 1, isOutOfStock: 1, isInStock: { $cond: [{ $eq: ["$totalQuantity", 0] }, false, true] } } }
//     ]);

//     // Count In Stock and Out of Stock products
//     const inStockCount = stockStatus.filter(item => item.isInStock).length;
//     const outOfStockCount = stockStatus.filter(item => !item.isInStock).length;

//     const totalOrders = await Order.countDocuments();
//     const totalRevenue = await Order.aggregate([
//       { $match: { "paymentDetails.status": "completed" } },
//       { $group: { _id: null, totalAmount: { $sum: "$paymentDetails.totalAmount" } } }
//     ]);
//     const revenue = totalRevenue.length ? totalRevenue[0].totalAmount : 0;

//     // Return the stats as JSON, including stock counts
//     res.json({
//       totalProducts,
//       totalInventoryCount,
//       inStockCount,
//       outOfStockCount,
//       totalOrders,
//       revenue,
//     });
//   } catch (error) {
//     console.error("Error fetching dashboard stats:", error);
//     res.status(500).json({ message: "Error fetching dashboard stats" });
//   }
// });


app.get('/api/edit/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// API to edit a category
app.put('/api/category/:id', async (req, res) => {
  const { id } = req.params;
  const { categoryName, categoryCode } = req.body;

  try {
    await Category.findByIdAndUpdate(id, { categoryName, categoryCode });
    res.json({ message: 'Category updated successfully!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// API to delete a category
app.delete('/api/category/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted successfully!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// API to update a product within a category
app.put('/api/category/:categoryId/product/:productId', async (req, res) => {
  const { categoryId, productId } = req.params;
  const { productName, productCode } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).send('Category not found');

    const product = category.Products.id(productId);
    if (!product) return res.status(404).send('Product not found');

    product.productName = productName;
    product.productCode = productCode;

    await category.save();
    res.json({ message: 'Product updated successfully!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Add a new product to a category
app.post('/api/category/:categoryId/product', async (req, res) => {
  const { categoryId } = req.params;
  const { productName, productCode } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).send('Category not found');

    category.Products.push({ productName, productCode });
    await category.save();

    res.json({ message: 'Product added successfully!', category });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Backend route for removing a product from a category
app.delete('/api/category/:categoryId/product/:productId', async (req, res) => {
  const { categoryId, productId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Remove the product from the array
    category.Products = category.Products.filter(
      (product) => product._id.toString() !== productId
    );

    await category.save();
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product', error });
  }
});
// // app.post('/api/products/:id/images', upload.array('images', 5), async (req, res) => {
// //   try {
// //     const productId = req.params.id;
// //     const product = await Product.findById(productId);

// //     if (!product) {
// //       return res.status(404).json({ message: 'Product not found' });
// //     }

// //     const newImagePaths = req.files.map(file => `/uploads/${file.filename}`);

// //     // Add new images to existing ones
// //     product.images = [...(product.images || []), ...newImagePaths];
// //     await product.save();

// //     res.status(200).json({
// //       message: 'Images added successfully',
// //       images: newImagePaths
// //     });
// //   } catch (error) {
// //     console.error('Error adding images:', error);
// //     res.status(500).json({ 
// //       message: 'Failed to add images', 
// //       error: error.message 
// //     });
// //   }
// // });
// app.delete('/api/products/:productId/images/:imagePath', async (req, res) => {
//   try {
//     const { productId, imagePath } = req.params;
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Decode the URL-encoded path
//     const decodedImagePath = decodeURIComponent(imagePath);

//     // Remove image from database
//     product.images = product.images.filter(img => img !== decodedImagePath);
//     await product.save();

//     // Delete physical file
//     try {
//       // Construct the full physical path correctly
//       const physicalPath = path.join(__dirname, decodedImagePath);
//       await unlink(physicalPath);
//       console.log('Physical file deleted:', physicalPath);
//     } catch (unlinkError) {
//       console.warn('Physical file deletion failed:', unlinkError.message);
//       // Continue execution even if physical file deletion fails
//     }

//     res.status(200).json({
//       message: 'Image deleted successfully',
//       updatedImages: product.images
//     });
//   } catch (error) {
//     console.error('Error deleting image:', error);
//     res.status(500).json({ 
//       message: 'Failed to delete image', 
//       error: error.message 
//     });
//   }
// });


// const transporter = nodemailer.createTransport({
//   service: "gmail", // Use your email service (e.g., Gmail, Outlook)
//   auth: {
//     user: "terrainternational16@gmail.com", // Replace with your email
//     pass: "koct kytc gmyj awkf", // Replace with your app password
//   },
// });


const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: "Support@terraclenz.com",
    pass: "czhrjxhfdvymnftg",
  },
  tls: {
    ciphers: "SSLv3",
  },
});


app.post('/api/cancel-order', async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ message: 'Order ID is required' });
  }

  try {
    // Find the order in the database
    const order = await Order.findOne({ orderId: orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the deliveryStatus to 'cancelled'
    // order.deliveryStatus = 'cancelled';
    await order.save(); // Save the updated order

    // Send an email to the admin
    const mailOptions = {
      from: 'your@gmail.com',
      to: 'Support@terraclenz.com',
      // to:'yashwanthsk20@gmail.com',
      subject: 'Order Cancellation Request',
      text: `The order with ID ${orderId} has been requested by the customer to cancel.`,
    };

    await transporter.sendMail(mailOptions);

    // Respond with success
    return res.status(200).json({ message: 'Order cancelled and email sent to admin' });
  } catch (error) {
    console.error('Error handling cancellation:', error);
    return res.status(500).json({ message: 'Error cancelling the order' });
  }
});



// const FLASK_URL = 'http://127.0.0.1:5000/api/chat';

// Chat endpoint
app.post('/api/react/chat', async (req, res) => {
  console.log('Received request:', req.body);

  try {
    const message = req.body.message;

    console.log('Sending request to Flask server:', {
      url: FLASK_URL,
      message: message
    });

    // Forward the request to Flask server with no timeout
    const flaskResponse = await axios.post(FLASK_URL, {
      message: message
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('Received response from Flask:', flaskResponse.data);

    // Return the Flask server's response
    res.json({
      response: flaskResponse.data.response,
      confidence: flaskResponse.data.confidence
    });

  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data
    });

    let errorMessage = 'Sorry, I encountered an error. Please try again.';
    let statusCode = 500;

    if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Cannot connect to the chatbot server. Please make sure the Flask server is running.';
    }

    res.status(statusCode).json({
      response: errorMessage,
      confidence: 0
    });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, msg_subject, message } = req.body;

  const mailOptions = {
    from: "Support@terraclenz.com", // MUST match transporter.auth.user
    to:"Support@terraclenz.com", // can be same or admin email
    // to: "yashwanthsk20@gmail.com",
    subject: `New Contact Request: ${msg_subject}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending contact form email:", error);
    res.status(500).json({ 
      message: "Error sending message. Try again later.",
      error: error.message // so we see real error in frontend
    });
  }
});


app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update basic fields
    const basicFields = [
  'productName',
  'productCode',
  'description',
  'uses',
  'caption',
  'categoryId',
  'categoryCode',
  'categoryName',
  'keyFeatures',
  'ingredients',
  'howToUse',
  'customerReviews'
];


    basicFields.forEach(field => {
      if (updatedData[field] !== undefined) {
        product[field] = updatedData[field];
      }
    });

    // Update aromas with proper handling of temporary IDs
    if (updatedData.aromas) {
      product.aromas = updatedData.aromas.map(aroma => {
        // Handle temporary IDs
        if (aroma._id && aroma._id.startsWith('temp-')) {
          const { _id, ...aromaWithoutId } = aroma;
          return {
            ...aromaWithoutId,
            images: aroma.images || [],
            sizes: aroma.sizes || []
          };
        }

        // Preserve existing aroma data
        return {
          ...aroma,
          images: aroma.images || [],
          sizes: aroma.sizes || []
        };
      });
    }

    // Validate sizes and calculate selling prices
    product.aromas.forEach(aroma => {
      if (aroma.sizes) {
        aroma.sizes.forEach(size => {
          const price = parseFloat(size.price || 0);
          const offer = parseFloat(size.offer || 0);
          size.sellingPrice = Math.floor(price - (price * (offer / 100)));

          // Generate sizeId if needed
          if (!size.sizeId && size.size && size.unit) {
            const aromaCode = aroma.name
              .split(' ')
              .map(word => word.charAt(0).toUpperCase())
              .join('');
            size.sizeId = `${product.categoryCode}-${product.productCode}-${aromaCode}-${size.size}${size.unit.toUpperCase()}`;
          }
        });
      }
    });

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      error: 'Error updating product',
      details: error.message
    });
  }
});

// POST endpoint to handle image uploads
app.post('/api/products/:id/images', upload.array('images'), async (req, res) => {
  const uploadedFiles = req.files || [];

  try {
    const productId = req.params.id;
    const aromaIndex = parseInt(req.body.aromaIndex);

    // Validate inputs
    if (isNaN(aromaIndex)) {
      await cleanupFiles(uploadedFiles);
      return res.status(400).json({ error: 'Invalid aroma index' });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      await cleanupFiles(uploadedFiles);
      return res.status(404).json({ error: 'Product not found' });
    }

    // Ensure aromas array exists
    if (!product.aromas) {
      product.aromas = [];
    }

    // Ensure the specific aroma exists
    if (!product.aromas[aromaIndex]) {
      product.aromas[aromaIndex] = {
        name: '',
        images: [],
        sizes: []
      };
    }

    // Ensure images array exists
    if (!product.aromas[aromaIndex].images) {
      product.aromas[aromaIndex].images = [];
    }

    // Process uploaded files
    const imageUrls = uploadedFiles.map(file => {
      // Convert Windows path separators to forward slashes
      const relativePath = path.join('uploads', file.filename).replace(/\\/g, '/');
      return '/' + relativePath;
    });

    // Add new images to the aroma
    product.aromas[aromaIndex].images.push(...imageUrls);

    await product.save();
    res.json({
      success: true,
      imageUrls
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    // Clean up uploaded files on error
    await cleanupFiles(uploadedFiles);
    res.status(500).json({
      error: 'Error uploading images',
      details: error.message
    });
  }
});






app.delete('/api/products/:id/images', async (req, res) => {
  try {
    const productId = req.params.id;
    const { aromaIndex, imageIndex } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the aroma and image index are valid
    if (!product.aromas[aromaIndex] || !product.aromas[aromaIndex].images[imageIndex]) {
      return res.status(400).json({ error: 'Invalid aroma or image index' });
    }

    // Get image path before removing from array
    const imagePath = product.aromas[aromaIndex].images[imageIndex];

    // Remove image from database
    product.aromas[aromaIndex].images.splice(imageIndex, 1);

    // Save the updated product with a retry mechanism for version errors
    let saved = false;
    let attempts = 0;
    while (!saved && attempts < 3) {
      try {
        await product.save();
        saved = true;
      } catch (error) {
        if (error.name === 'VersionError') {
          attempts++;
          console.log(`Retrying save attempt ${attempts}...`);
        } else {
          throw error;
        }
      }
    }

    // Delete file from local storage
    try {
      await fs.unlink(imagePath);
      console.log('Image file deleted successfully:', imagePath);
    } catch (err) {
      console.error('Error deleting file:', err);
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Error deleting image' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});


// Get dashboard summary stats
app.get('/api/dashboard', async (req, res) => {
  try {
    // Get total products
    const totalProducts = await Product.countDocuments();
    
    // Calculate inventory counts
    const products = await Product.find();
    let totalInventoryCount = 0;
    let inStockCount = 0;
    let outOfStockCount = 0;
    
    products.forEach(product => {
      product.aromas.forEach(aroma => {
        aroma.sizes.forEach(size => {
          totalInventoryCount += size.quantity || 0;
          if (size.quantity > 0) {
            inStockCount++;
          } else {
            outOfStockCount++;
          }
        });
      });
    });
    
    // Get total orders
    const totalOrders = await Order.countDocuments();
    
    // Calculate total revenue
    const orders = await Order.find();
    let revenue = 0;
    
    orders.forEach(order => {
      if (order.paymentDetails && order.paymentDetails.totalAmount) {
        revenue += order.paymentDetails.totalAmount;
      }
    });
    
    res.json({
      totalProducts,
      totalInventoryCount,
      inStockCount,
      outOfStockCount,
      totalOrders,
      revenue
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get available years for orders
app.get('/api/orders/years', async (req, res) => {
  try {
    const orders = await Order.find({}, { orderDate: 1 });
    
    // Extract years from order dates
    const years = [...new Set(orders.map(order => {
      if (order.orderDate) {
        return new Date(order.orderDate).getFullYear();
      }
      return null;
    }).filter(year => year !== null))].sort();
    
    res.json({ years });
  } catch (error) {
    console.error('Error fetching order years:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get analytics data for different periods
// app.get('/api/analytics/:period/:year?/:month?', async (req, res) => {
//   try {
//     const { period, year, month } = req.params;
    
//     // Set date range based on the period
//     let startDate, endDate;
//     let groupBy;
    
//     if (period === 'week') {
//       // Last 7 days
//       endDate = new Date();
//       startDate = new Date();
//       startDate.setDate(startDate.getDate() - 7);
//       groupBy = { $dayOfMonth: '$orderDate' };
//     } else if (period === 'month' && year && month) {
//       // Specific month of specific year
//       startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
//       endDate = new Date(parseInt(year), parseInt(month), 0);
//       groupBy = { $dayOfMonth: '$orderDate' };
//     } else if (period === 'year' && year) {
//       // Specific year
//       startDate = new Date(parseInt(year), 0, 1);
//       endDate = new Date(parseInt(year), 11, 31);
//       groupBy = { $month: '$orderDate' };
//     } else {
//       return res.status(400).json({ error: 'Invalid period parameters' });
//     }
    
//     // Get orders within the date range
//     const orders = await Order.find({
//       orderDate: { $gte: startDate, $lte: endDate }
//     });
    
//     // Process orders data for charts
//     const ordersByDate = {};
//     const revenueByDate = {};
//     const productsByDate = {};
    
//     // Define labels based on the period
//     let labels = [];
//     if (period === 'week' || (period === 'month' && year && month)) {
//       // Days of month or week
//       const daysInMonth = period === 'month' ? new Date(parseInt(year), parseInt(month), 0).getDate() : 7;
//       labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
//     } else if (period === 'year' && year) {
//       // Months of year
//       labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     }
    
//     // Initialize data structures with zeros
//     labels.forEach((label, i) => {
//       const index = period === 'year' ? i + 1 : label;
//       ordersByDate[index] = 0;
//       revenueByDate[index] = 0;
//       productsByDate[index] = 0;
//     });
    
//     // Process orders
//     orders.forEach(order => {
//       const orderDate = new Date(order.orderDate);
//       let dateKey;
      
//       if (period === 'week' || (period === 'month' && year && month)) {
//         dateKey = orderDate.getDate();
//       } else if (period === 'year' && year) {
//         dateKey = orderDate.getMonth() + 1; // 1-12 for months
//       }
      
//       // Count orders
//       ordersByDate[dateKey] = (ordersByDate[dateKey] || 0) + 1;
      
//       // Sum revenue
//       if (order.paymentDetails && order.paymentDetails.totalAmount) {
//         revenueByDate[dateKey] = (revenueByDate[dateKey] || 0) + order.paymentDetails.totalAmount;
//       }
      
//       // Count products sold
//       if (order.products && Array.isArray(order.products)) {
//         order.products.forEach(product => {
//           productsByDate[dateKey] = (productsByDate[dateKey] || 0) + product.quantity;
//         });
//       }
//     });
    
//     // Convert to arrays for the frontend
//     const ordersData = Object.keys(ordersByDate).map(key => ({
//       label: period === 'year' ? labels[parseInt(key) - 1] : key.toString(),
//       count: ordersByDate[key]
//     }));
    
//     const revenueData = Object.keys(revenueByDate).map(key => ({
//       label: period === 'year' ? labels[parseInt(key) - 1] : key.toString(),
//       amount: revenueByDate[key]
//     }));
    
//     const productsData = Object.keys(productsByDate).map(key => ({
//       label: period === 'year' ? labels[parseInt(key) - 1] : key.toString(),
//       count: productsByDate[key]
//     }));
    
//     // Sort by label if necessary
//     const sortFn = (a, b) => {
//       if (period === 'year') {
//         return labels.indexOf(a.label) - labels.indexOf(b.label);
//       }
//       return parseInt(a.label) - parseInt(b.label);
//     };
    
//     res.json({
//       orders: ordersData.sort(sortFn),
//       revenue: revenueData.sort(sortFn),
//       products: productsData.sort(sortFn)
//     });
    
//   } catch (error) {
//     console.error('Error fetching analytics data:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// Assuming you're using Express.js for your backend



/**
 * GET /api/products/categories/distribution
 * Returns the distribution of products by category
 */
app.get('/api/products/categories/distribution', async (req, res) => {
  try {
    // Aggregate products by category and count them
    const categoryDistribution = await Product.aggregate([
      // Group by categoryName and count
      {
        $group: {
          _id: "$categoryName",
          count: { $sum: 1 },
          categoryCode: { $first: "$categoryCode" }
        }
      },
      // Project to format the output
      {
        $project: {
          _id: 0,
          categoryName: "$_id",
          categoryCode: 1,
          count: 1
        }
      },
      // Sort by count in descending order
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({ categories: categoryDistribution });
  } catch (error) {
    console.error('Error fetching category distribution:', error);
    res.status(500).json({ error: 'Failed to fetch category distribution' });
  }
});

// If you want to include more details about each category
app.get('/api/products/categories/detailed', async (req, res) => {
  try {
    // Aggregate products by category with additional metrics
    const categoryDetails = await Product.aggregate([
      // Group by categoryName
      {
        $group: {
          _id: "$categoryName",
          count: { $sum: 1 },
          categoryCode: { $first: "$categoryCode" },
          totalInventory: {
            $sum: {
              $reduce: {
                input: {
                  $reduce: {
                    input: "$aromas",
                    initialValue: [],
                    in: { $concatArrays: ["$$value", "$$this.sizes"] }
                  }
                },
                initialValue: 0,
                in: { $add: ["$$value", "$$this.quantity"] }
              }
            }
          },
          outOfStock: {
            $sum: {
              $cond: [{
                $eq: [{
                  $size: {
                    $filter: {
                      input: {
                        $reduce: {
                          input: "$aromas",
                          initialValue: [],
                          in: { $concatArrays: ["$$value", "$$this.sizes"] }
                        }
                      },
                      as: "size",
                      cond: { $gt: ["$$size.quantity", 0] }
                    }
                  }
                }, 0]
              }, 1, 0]
            }
          }
        }
      },
      // Project to format the output
      {
        $project: {
          _id: 0,
          categoryName: "$_id",
          categoryCode: 1,
          count: 1,
          totalInventory: 1,
          outOfStock: 1,
          inStock: { $subtract: ["$count", "$outOfStock"] }
        }
      },
      // Sort by count in descending order
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({ categories: categoryDetails });
  } catch (error) {
    console.error('Error fetching detailed category data:', error);
    res.status(500).json({ error: 'Failed to fetch detailed category data' });
  }
});

//stock

app.get("/api/products/:productId/stock", async (req, res) => {
  const { productId } = req.params;
  const { sizeId } = req.query;

  console.log("Received stock request:", { productId, sizeId });

  try {
    if (!sizeId) {
      console.log("Missing sizeId");
      return res.status(400).json({ error: "sizeId is required" });
    }

    const product = await Product.findOne({ productId });
    if (!product) {
      console.log("Product not found");
      return res.status(404).json({ error: "Product not found" });
    }

    let foundSize = null;

    for (const aroma of product.aromas) {
      const match = aroma.sizes.find((s) => s.sizeId === sizeId);
      if (match) {
        foundSize = match;
        break;
      }
    }

    if (!foundSize) {
      console.log("Size not found");
      return res.status(404).json({ error: "Size not found for this product" });
    }

    console.log("Returning stock:", foundSize.quantity);
    return res.status(200).json({ stock: foundSize.quantity });
  } catch (err) {
    console.error("Stock fetch error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
});

app.use('/uploads', express.static('uploads'));



app.use(express.static(path.join(__dirname, "/public")));
// Catch-all route to serve the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
