import ApiError from "./ApiError";
import { Model } from "mongoose";

/**
 * Checks if all required fields are present in the input data.
 * @param model - Mongoose model to check required fields
 * @param data - Input data object
 * @throws {ApiError} - Throws error if any required field is missing
 */
export const requiredDataCheck = async <T>(model: Model<T>, data: Partial<T>): Promise<void> => {
    const requiredFields = Object.keys(model.schema.obj).filter(
        (key) => (model.schema.obj as any)[key].required
    );

    for (const field of requiredFields) {
        if (data[field as keyof T] === undefined) {
            throw new ApiError(400, `${field} is required`);
        }
    }
};
