import DestinationInfo from "../models/DestinationInfo.js";

export const getDestinationInfo = async (country) => {
    return await DestinationInfo.findOne({ country })
}