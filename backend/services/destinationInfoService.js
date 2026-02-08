import DestinationInfo from "../models/DestinationInfo.js";

export const getDestinationInfo = async (country) => {
    return await DestinationInfo.findOne({ country: { $regex: new RegExp(`^${country}$`, 'i') } });
}

export const updateDestinationInfo = async (countryName, payload) => {
    return await DestinationInfo.findOneAndUpdate(
        { country: { $regex: new RegExp(`^${countryName}$`, 'i') } },
        { $set: { imageUrl: payload.imageUrl, photographer: payload.photographer } },
        { new: true }
    );
}