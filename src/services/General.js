import GenderEnum from "../constants/GenderEnum";

/**
 * @param {number} value The gender value from GenderEnum.
 * @returns {string} The gender name. But also returns 'Unknown' if the gender is invalid.
 */
function GetGenderName(value) {
    let result = "";
    switch (Number(value)) {
        case GenderEnum.Male:
            result = "Male";
            break;
        case GenderEnum.Female:
            result = "Female";
            break;
        default:
            result = "Unknown";
            break;
    }
    return result;
}

/**
 * @param {React.ChangeEvent} e
 * @returns {void} Executes 'stopPropagation()' on the passed parameter.
 */
function StopPropagation(e) {
    e.stopPropagation();
}

export { GetGenderName, StopPropagation };