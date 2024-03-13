import { promiseHandler } from "../utils/Promisehandler.js";

const registerUser = promiseHandler(async (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});

export { registerUser };
