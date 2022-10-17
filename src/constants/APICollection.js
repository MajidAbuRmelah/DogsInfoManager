import API from "../models/API";
import APITypeEnum from "./APITypeEnum";

const AddDog = new API("http://localhost:8080/dog", APITypeEnum.POST);
const UpdateDog = new API("http://localhost:8080/dog", APITypeEnum.PUT);
const GetDogs = new API("http://localhost:8080/dogs", APITypeEnum.GET);
const GetDog = new API("http://localhost:8080/dog", APITypeEnum.GET);
const DeleteDog = new API("http://localhost:8080/dog", APITypeEnum.DELETE);

export { AddDog, UpdateDog, GetDogs, GetDog, DeleteDog }