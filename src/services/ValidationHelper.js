import GenderEnum from "../constants/GenderEnum";

/**
 * @param {string} value 
 * @returns {boolean} Whether the value is empty or not.
 */
function IsEmpty(value) {
    return (!value || value.length === 0 );
}

/**
 * @param {number} value The gender value from GenderEnum.
 * @returns {boolean} Whether the gender corresponds to one of the GenderEnum values.
 */
function IsGenderValid(value) {
    for(var propertyName in GenderEnum) {
        if (GenderEnum[propertyName] === value) {
            return true;
        }
     }
     return false;
}

export { IsEmpty, IsGenderValid };