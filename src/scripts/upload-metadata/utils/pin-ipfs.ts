import env from "@/src/environments";

const FormDataTS = require("form-data");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

export const pinFileToIPFS = async (filePath: string): Promise<{ ipfsHash: string }> => {
    if (!fs.existsSync(path.resolve(__dirname, `../../space-configs/${filePath}`))) {
      throw new Error(`No file found in the specified folder: "${filePath}`);
    }
    const formData = new FormDataTS();
    const src = path.resolve(__dirname, `../../space-config/${filePath}`);
  
    const file = fs.createReadStream(src);
    formData.append("file", file);
  
    const metadata = JSON.stringify({
      name: "Test",
    });
    formData.append("pinataMetadata", metadata);
  
    const options = JSON.stringify({
      cidVersion: 1,
    });
    formData.append("pinataOptions", options);
  
    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${env.pinata.jwtToken}`,
        },
      });
      return { ipfsHash: res.data.IpfsHash };
    } catch (error: any) {
      throw new Error("Error pinning file to IPFS");
    } 
};

export const pinJSONToIPFS = async (json: any): Promise<{ ipfsHash: string }> => {
    let data;
    if (typeof json === "string") {
        data = json;
    } else {
        data = JSON.stringify(json);
    }
  
    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${env.pinata.jwtToken}`
        },
      });
      return { ipfsHash: res.data.IpfsHash };
    } catch (error: any) {
      throw new Error("Error pinning file to IPFS");
    }
};