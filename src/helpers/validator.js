const { validationResult, ..._ } = require('express-validator');

class ValidationError extends Error {
    constructor(errors) {
        super();
        Object.defineProperties(this, {
            errors: {
                get: () => errors.map(e => ({ ...e, })),
            },
        });
    }
}

const validator = async (req, res, next) => {
    const result = validationResult(req);
    result.isEmpty() ? next() : next(new ValidationError(result.errors));
};

module.exports = {
    ..._,
    validationResult,
    ValidationError,
    validator,
};
