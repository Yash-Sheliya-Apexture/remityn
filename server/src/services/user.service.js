// import User from '../models/User.js';

// const getAllUsers = async () => {
//     try {
//         return await User.find().select('-password'); // Exclude password field when fetching users
//     } catch (error) {
//         console.error("Error in getAllUsers service:", error);
//         throw new Error("Failed to fetch users.");
//     }
// };

// const getUserById = async (userId) => {
//     try {
//         const user = await User.findById(userId); // Default select (no password, maybe no kyc unless needed)
//         if (!user) {
//             return null; // Or throw a NotFoundError if you have custom errors
//         }
//         return user;
//     } catch (error) {
//         console.error("Error in getUserById service:", error);
//         throw new Error("Failed to fetch user.");
//     }
// };
// // Function to get user including their KYC details
// const getUserByIdWithKyc = async (userId) => {
//     try {
//         // Find by ID and explicitly select all necessary fields, including the kyc object
//         // The model's toJSON will remove password before sending response
//         const user = await User.findById(userId).select('+kyc'); // Select the whole kyc object

//         if (!user) {
//             return null;
//         }
//         return user; // Return the full user document (password removed by toJSON)
//     } catch (error) {
//         console.error(`Error in getUserByIdWithKyc for ${userId}:`, error);
//         throw new Error("Failed to fetch user details.");
//     }
// };
// export default {
//     getAllUsers,
//     getUserById,
//     getUserByIdWithKyc, // Export the new function
// };


// backend/src/services/user.service.js
import User from '../models/User.js';
import mongoose from 'mongoose'; // <--- ADD THIS LINE
/**
 * Fetches user details including KYC information by user ID.
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<object>} The user object including KYC details.
 * @throws {Error} If user not found or invalid ID format.
 */
const getAllUsers = async () => {
    try {
        // Exclude password field by default, include other necessary fields
        // Consider adding pagination for large user bases
        return await User.find().select('-password');
    } catch (error) {
        console.error("Error in getAllUsers service:", error);
        throw new Error("Failed to fetch users.");
    }
};

const getUserById = async (userId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
             throw new Error('Invalid user ID format.');
        }
        // Default select excludes password due to schema toJSON, but explicitly ensure it
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return null; // Consistent return type
        }
        return user;
    } catch (error) {
        console.error(`Error in getUserById service for ${userId}:`, error);
         if (error.message.includes('Invalid user ID format')) {
             throw error; // Re-throw specific errors
         }
        throw new Error("Failed to fetch user.");
    }
};

// // --- Function to get user including their KYC details ---
// // Used by /users/me and potentially admin views
// const getUserByIdWithKyc = async (userId) => {
//     try {
//          if (!mongoose.Types.ObjectId.isValid(userId)) {
//              throw new Error('Invalid user ID format.');
//         }
//         // Find by ID and explicitly select the kyc object.
//         // Password is automatically removed by the schema's toJSON transform.
//         const user = await User.findById(userId).select('+kyc'); // Ensure KYC is populated

//         if (!user) {
//             return null; // Return null if user not found
//         }
//         // No need to manually delete password here due to toJSON in model
//         return user;
//     } catch (error) {
//         console.error(`Error in getUserByIdWithKyc for ${userId}:`, error);
//          if (error.message.includes('Invalid user ID format')) {
//              throw error;
//          }
//         throw new Error("Failed to fetch user details.");
//     }
// };

const getUserByIdWithKyc = async (userId) => {
    console.log(`[User Service] Attempting to fetch user by ID: ${userId}`);

    // --- FIX: Add the mongoose import at the top of the file ---
    // Now this check will work because 'mongoose' is defined.
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.warn(`[User Service] Invalid User ID format received: ${userId}`);
        throw new Error('Invalid user ID format.');
    }

    try {
        // Fetch user, select necessary fields, exclude sensitive ones
        // Ensure 'kyc' is selected (it should be by default unless explicitly excluded in schema)
        const user = await User.findById(userId)
            .select('-password -resetPasswordToken -resetPasswordExpires -__v') // Exclude sensitive info
            .lean(); // Use lean for performance if you only need plain objects

        if (!user) {
            console.warn(`[User Service] User not found for ID: ${userId}`);
            throw new Error('User not found.');
        }

        // Optional: Ensure KYC object exists, even if default (though model pre-save should handle this)
        if (!user.kyc) {
            console.warn(`[User Service] User ${userId} found but missing 'kyc' object. Providing default.`);
            user.kyc = { status: 'not_started', rejectionReason: null };
        }

        console.log(`[User Service] Successfully fetched user details for ID: ${userId}`);
        return user; // Return the user object (including kyc)

    } catch (error) {
        console.error(`[User Service] Error fetching user by ID ${userId}:`, error);
        // Re-throw specific errors or a more generic one for the controller
        if (error.message === 'User not found.' || error.message === 'Invalid user ID format.') {
             // Throw specific known errors
             throw error;
        }
        // Throw a generic error for unexpected database issues
        throw new Error('Failed to fetch user details.'); // This message is caught by the controller
    }
};
// --- End Function ---

export default {
    getAllUsers,
    getUserById,
    getUserByIdWithKyc, // Export the new function
};