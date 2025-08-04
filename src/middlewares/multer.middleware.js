// Multer Middleware for File Uploads
// ===================================
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. 
// It is written on top of busboy for maximum efficiency.
// 
// Multer adds a body object and a file or files object to the request object. 
// - The body object contains the values of the text fields of the form
// - The file or files object contains the files uploaded via the form
// 
// NOTE: Multer will not process any form which is not multipart (multipart/form-data)
// 
// Installation: npm install multer
// Usage: This middleware is used in routes that need file upload functionality

import multer from "multer";

// Disk Storage Configuration
// --------------------------
// The disk storage engine gives you full control on storing files to disk.
// This is useful for temporary storage before uploading to cloud services like Cloudinary.
// 
// Configuration options:
// - destination: Function that determines where to store the uploaded files
// - filename: Function that determines what to name the uploaded files

const storage = multer.diskStorage({
  // destination function: Determines the folder where uploaded files will be stored
  // Parameters:
  //   - req: The request object
  //   - file: The uploaded file object
  //   - cb: Callback function to call when done
  destination: function (req, file, cb) {
    // Store files in the ./public/temp directory
    // This is a temporary location before moving to cloud storage
    cb(null, "./public/temp")
    // cb is callback function - first parameter is error (null if no error), second is the destination path
  },
  
  // filename function: Determines the name of the uploaded file
  // Parameters:
  //   - req: The request object  
  //   - file: The uploaded file object (contains originalname, mimetype, etc.)
  //   - cb: Callback function to call when done
  filename: function (req, file, cb) {
    // Use the original filename of the uploaded file
    // You could also generate unique names like: Date.now() + '-' + file.originalname
    cb(null, file.originalname)
    // cb is callback function - first parameter is error (null if no error), second is the filename
  }
})

// Multer Configuration and Export
// -------------------------------
// Create and configure the multer instance with our storage settings
// 
// Available options:
// - storage: Where to store files (disk, memory, etc.)
// - limits: File size limits, file count limits, etc.
// - fileFilter: Function to filter which files to accept
// - dest: Simple destination (alternative to storage)

export const upload = multer({
     storage, // Use our configured disk storage
     // You can add more options here:
     // limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
     // fileFilter: (req, file, cb) => { /* custom filtering logic */ }
     })

// Usage Examples:
// --------------
// Single file upload:
//   router.post('/upload', upload.single('avatar'), (req, res) => {
//     // req.file contains the uploaded file
//     // req.body contains the text fields
//   });
//
// Multiple files upload:
//   router.post('/upload', upload.array('photos', 5), (req, res) => {
//     // req.files contains array of uploaded files
//     // req.body contains the text fields
//   });
//
// Multiple fields with different file counts:
//   router.post('/upload', upload.fields([
//     { name: 'avatar', maxCount: 1 },
//     { name: 'gallery', maxCount: 8 }
//   ]), (req, res) => {
//     // req.files.avatar[0] - single file
//     // req.files.gallery - array of files
//   });
//
// Important Notes:
// ---------------
// 1. Always clean up temporary files after uploading to cloud storage
// 2. The ./public/temp directory should exist or be created
// 3. Consider adding file type validation in fileFilter
// 4. Set appropriate file size limits for your use case
// 5. This middleware should be used before your route handler