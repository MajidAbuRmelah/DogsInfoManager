import Image from "../models/Image";

const GeneralStrings = {
    Male: "Male",
    Female: "Female"
}

const Errors = {
    HttpErrorMessage: "An error has occurred. Please try again later."
};

const AppStrings = {
    Title: "Dogs Info Manager",
    Description: "Welcome to Dogs Info Manager, here you can keep track of your dogs. You can add, edit and delete dogs from the list below. Start by adding a new dog.",
    ActionButton: "Add a Dog"
}

const ModalStrings = {
    Title: "Add a Dog",
    ButtonContent: "Add",
    TitleEdit: "Edit Dog",
    ButtonContentEdit: "Update"
};

const ImagePaths = {
    DogImage: new Image("https://images.unsplash.com/photo-1605244863941-3a3ed921c60d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", "brown-poodle")
}

export { GeneralStrings, Errors, AppStrings, ModalStrings, ImagePaths };