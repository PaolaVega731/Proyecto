import has8charUtils from '../utils/has8char.util.js'; 


function has8char(req, res, next) {
  try {
    const { password } = req.body;
    if (has8charUtils(password)){
      const error = new Error("La contraseña debe tener al menos 8 caracteres.")
      error.statusCode = 400;
      throw error;
    };
    return next();
  } catch (error) {
    return next(error);
  }
}

export default has8char;
