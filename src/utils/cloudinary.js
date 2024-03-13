import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localpath) => {
  try {
    let response;
    if (!localpath) return null;
    response = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    console.log("file is upload in cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localpath);
    return null;
  }
};

export { uploadOnCloudinary };
