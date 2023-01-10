export const validate = (form) => {
    let errors = {};
    if (!form.full_name) {
      errors.full_name = 'Debes ingresar un nombre';
    } else if (!form.email) {
      errors.email = 'Debes ingresar un email válido';
    } else if (!form.birth_date) {
      errors.birth_date = 'Debes ingresar tu fecha de nacimiento';
    } else if (!form.country_of_origin) {
      errors.country_of_origin = 'Debes seleccionar tu país de origen';
    } else if (!form.terms_and_conditions) {
      errors.terms_and_conditions = 'Por favor acepta los términos y condiciones';
    }

    return errors;
};