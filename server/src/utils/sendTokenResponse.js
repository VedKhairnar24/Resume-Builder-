// src/utils/sendTokenResponse.js
export const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // optional
        sameSite: "strict", // optional
    };

    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({ success: true, token });
};
