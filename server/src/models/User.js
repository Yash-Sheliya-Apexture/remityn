// // backend/src/models/User.js
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true, lowercase: true, trim: true }, // Email: unique, lowercase, trimmed
//     password: { type: String, required: true },
//     role: { type: String, enum: ['user', 'admin'], default: 'user' },
//     createdAt: { type: Date, default: Date.now },
//     // Add other user-related fields here
// }, {
//     timestamps: true, // Automatically adds createdAt and updatedAt timestamps
//     toJSON: {
//         transform: function (doc, ret) {
//             delete ret.password; // Exclude password from JSON responses by default
//             delete ret.__v; // Remove version key
//             return ret;
//         }
//     }
// });

// const User = mongoose.model('User', userSchema);

// export default User;


// // backend/src/models/User.js
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['user', 'admin'], default: 'user' },
//     createdAt: { type: Date, default: Date.now },
//     resetPasswordToken: String, // Add reset password token field
//     resetPasswordExpires: Date,  // Add reset password expiry field
// }, {
//     timestamps: true,
//     toJSON: {
//         transform: function (doc, ret) {
//             delete ret.password;
//             delete ret.__v;
//             delete ret.resetPasswordToken; // Optionally hide reset tokens in responses
//             delete ret.resetPasswordExpires;
//             return ret;
//         }
//     }
// });

// const User = mongoose.model('User', userSchema);

// export default User;


// backend/src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: String, // Add reset password token field
    resetPasswordExpires: Date,  // Add reset password expiry field
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.__v;
            delete ret.resetPasswordToken; // Optionally hide reset tokens in responses
            delete ret.resetPasswordExpires;
            return ret;
        }
    }
});

const User = mongoose.model('User', userSchema);

export default User;